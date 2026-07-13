# Eater Platformer 🟡

A blocky green monster's chomp-tastic HTML5 canvas platformer adventure where you play as Eater, eating dots, avoiding ghost blocks, and finding the exit portal.

This project is built with a minimal Go backend for serving the static web files and exposing health checks, structured for automated deployment using GitOps.

## Project Structure

```
eaterplatform/
├── cmd/
│   └── server/
│       └── main.go       # Go web server (serves static files, healthcheck)
├── web/                  # HTML5 Game Frontend
│   ├── index.html        # Main game interface
│   ├── css/
│   │   └── style.css     # Dark-theme HSL styling
│   └── js/
│       └── game.js       # Game loop and physics engine
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions CI/CD workflow
├── Dockerfile            # Multi-stage security-hardened Dockerfile
├── docker-compose.yml    # Docker compose configuration (Traefik-ready)
├── .env.example          # Environment variable template
├── AGENTS.md             # Developer instructions for AI agents
├── CLAUDE.md             # Project guidelines for coding agents
└── LICENSE               # MIT License
```

## Local Development

### Prerequisites
- Go 1.24+

### Run Server Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/korjavin/eaterplatform.git
   cd eaterplatform
   ```
2. Build and run the Go server:
   ```bash
   go mod tidy
   go run ./cmd/server
   ```
3. Open your browser and navigate to `http://localhost:8080`.

---

## Deployment & CI/CD (GitOps)

This project is configured for automated deployment via GitHub Actions, GitHub Container Registry (GHCR), and Portainer webhooks.

### How it works
1. You push changes to the `master` branch.
2. GitHub Actions builds the Docker image and pushes it to GHCR tagged with the commit SHA and `:latest`.
3. The CI workflow switches to the `deploy` branch, updates the image tag in `docker-compose.yml` to the specific commit SHA, commits, and force-pushes.
4. The CI triggers your Portainer stack webhook.
5. Portainer pulls the updated `docker-compose.yml` from the `deploy` branch, pulls the SHA-tagged image, and recreates the container.

### Setup Instructions
1. **Create GitHub Secret**:
   - Go to `Settings -> Secrets and variables -> Actions` on your GitHub repository.
   - Add a repository secret named `PORTAINER_REDEPLOY_HOOK`.
   - Set the value to your Portainer stack webhook URL.

2. **Configure Portainer Stack**:
   - Create a stack in Portainer.
   - Select **Repository** as the build method.
   - Repository URL: `https://github.com/korjavin/eaterplatform`
   - Reference/Branch: `deploy` (⚠️ **CRITICAL**: Use the `deploy` branch, not `master`).
   - Compose path: `docker-compose.yml`
   - Enable webhook on the stack, and copy its URL to the GitHub Secret.
   - Configure stack environment variables (see `.env.example`).

---

## Task Management (Beads)

This repository uses **bd (beads)** for task tracking.

### Quick Reference
* Find ready tasks: `bd ready`
* View task details: `bd show <id>`
* Claim task: `bd update <id> --claim`
* Complete task: `bd close <id>`
* Push/pull task state: `bd dolt push` / `bd dolt pull`

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
