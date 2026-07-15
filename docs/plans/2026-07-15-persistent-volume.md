# Persistent Database Volume for High Scores Plan

This plan implements database persistence for the high scores SQLite file across container redeployments.

## 🏛️ Architecture & Code Changes

### 1. Go Backend Database Path (`eaterplatform-0zu`)
- In `cmd/server/main.go`:
  - Import `"path/filepath"`.
  - Retrieve the database path from `os.Getenv("DATABASE_PATH")`, defaulting to `"eater.db"`.
  - Check if the parent directory path exists, and create it using `os.MkdirAll(dir, 0755)` if necessary.

### 2. Dockerfile Configuration (`eaterplatform-0zu`)
- In `Dockerfile`:
  - Ensure the `/app/data` directory is created and owned by `appuser` so the runtime user has write access.

### 3. Docker Compose Volumes (`eaterplatform-0zu`)
- In `docker-compose.yml`:
  - Define a named volume `eater_data`.
  - Map `eater_data:/app/data` inside the `app` service `volumes` section.
  - Inject environment variable `DATABASE_PATH: /app/data/eater.db`.

---

## 🛠️ File Edits Detail

### 1. `cmd/server/main.go`
- Add dynamic database path resolution and directory creation.

### 2. `Dockerfile`
- Add `mkdir -p /app/data` to the non-root setup.

### 3. `docker-compose.yml`
- Add volume and environment config.
