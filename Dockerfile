# Build stage
FROM golang:1.24-alpine AS builder
WORKDIR /app

# Copy go mod files first for better caching
COPY go.mod ./
# Copy go.sum if it exists (it doesn't yet, but will after tidy)
COPY go.sum* ./

# Copy the rest of the application
COPY . .

# Build CGO-disabled binary
RUN CGO_ENABLED=0 GOOS=linux go build -o server ./cmd/server

# Runtime stage
FROM alpine:latest
RUN apk --no-cache add ca-certificates tzdata

WORKDIR /app
COPY --from=builder /app/server .
COPY web/ ./web/

# Create non-root user and switch to it for security
RUN addgroup -g 1000 appuser && \
    adduser -D -u 1000 -G appuser appuser && \
    chown -R appuser:appuser /app

USER appuser

EXPOSE 8080
CMD ["./server"]
