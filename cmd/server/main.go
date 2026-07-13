package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"

	_ "modernc.org/sqlite"
)

type Score struct {
	Name  string `json:"name"`
	Score int    `json:"score"`
}

func main() {
	// Initialize structured logger
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Open SQLite database
	db, err := sql.Open("sqlite", "eater.db")
	if err != nil {
		slog.Error("Failed to open SQLite database", "error", err)
		os.Exit(1)
	}

	// Initialize database schema
	schema := `
	CREATE TABLE IF NOT EXISTS highscores (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		score INTEGER NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);`
	if _, err := db.Exec(schema); err != nil {
		slog.Error("Failed to initialize database schema", "error", err)
		db.Close()
		os.Exit(1)
	}

	mux := http.NewServeMux()

	// Health check endpoint
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte(`{"status":"ok"}`))
	})

	// High scores endpoint
	mux.HandleFunc("/api/scores", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			rows, err := db.QueryContext(r.Context(), "SELECT name, score FROM highscores ORDER BY score DESC, created_at ASC LIMIT 10")
			if err != nil {
				slog.Error("Failed to query high scores", "error", err)
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusInternalServerError)
				_, _ = w.Write([]byte(`{"error":"failed to fetch high scores"}`))
				return
			}
			defer rows.Close()

			scores := []Score{}
			for rows.Next() {
				var s Score
				if err := rows.Scan(&s.Name, &s.Score); err != nil {
					slog.Error("Failed to scan row", "error", err)
					w.Header().Set("Content-Type", "application/json")
					w.WriteHeader(http.StatusInternalServerError)
					_, _ = w.Write([]byte(`{"error":"failed to read high scores"}`))
					return
				}
				scores = append(scores, s)
			}

			if err := rows.Err(); err != nil {
				slog.Error("Row loop error", "error", err)
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusInternalServerError)
				_, _ = w.Write([]byte(`{"error":"failed to process high scores"}`))
				return
			}

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			if err := json.NewEncoder(w).Encode(scores); err != nil {
				slog.Error("Failed to encode high scores JSON", "error", err)
			}

		} else if r.Method == http.MethodPost {
			var req Score
			if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusBadRequest)
				_, _ = w.Write([]byte(`{"error":"invalid JSON request"}`))
				return
			}

			if strings.TrimSpace(req.Name) == "" {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusBadRequest)
				_, _ = w.Write([]byte(`{"error":"name cannot be empty"}`))
				return
			}

			if req.Score < 0 {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusBadRequest)
				_, _ = w.Write([]byte(`{"error":"score must be non-negative"}`))
				return
			}

			_, err := db.ExecContext(r.Context(), "INSERT INTO highscores (name, score) VALUES (?, ?)", req.Name, req.Score)
			if err != nil {
				slog.Error("Failed to insert score", "error", err)
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusInternalServerError)
				_, _ = w.Write([]byte(`{"error":"failed to save score"}`))
				return
			}

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusCreated)
			_, _ = w.Write([]byte(`{"message":"score saved successfully"}`))

		} else {
			w.WriteHeader(http.StatusMethodNotAllowed)
		}
	})

	// Serve static files from web directory
	fs := http.FileServer(http.Dir("./web"))
	mux.Handle("/", fs)

	server := &http.Server{
		Addr:         ":" + port,
		Handler:      mux,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Server run context
	serverCtx, serverStopCtx := context.WithCancel(context.Background())

	// Listen for syscall signals for graceful shutdown
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		<-sigChan
		slog.Info("Shutting down server...")

		// Shutdown signal with a 30s timeout grace period
		shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer shutdownCancel()

		if err := server.Shutdown(shutdownCtx); err != nil {
			slog.Error("Graceful shutdown failed", "error", err)
		}
		serverStopCtx()
	}()

	slog.Info("Starting server", "port", port)
	if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		slog.Error("Server start failed", "error", err)
		os.Exit(1)
	}

	<-serverCtx.Done()

	slog.Info("Closing database connection...")
	if err := db.Close(); err != nil {
		slog.Error("Failed to close database connection cleanly", "error", err)
	}

	slog.Info("Server stopped gracefully")
}
