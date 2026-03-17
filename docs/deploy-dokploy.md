# Deploying Kebun Kumara to Dokploy (Production Best Practice)

Target: `dev.kebunkumara.id` (and later `kebunkumara.id` for production)

---

## Prerequisites

- Dokploy installed on your VPS (with Traefik as the built-in reverse proxy)
- Domain DNS A record pointing `dev.kebunkumara.id` → your VPS IP
- Git repository pushed to GitHub/GitLab/Gitea
- SSH access to your VPS

---

## Step 1 — Prepare Environment Secrets

Generate the required secret values before touching Dokploy.

```bash
# Generate a strong PAYLOAD_SECRET (run locally)
openssl rand -base64 48
```

You'll need these env vars ready:

| Variable | Value |
|---|---|
| `POSTGRES_USER` | `kebunkumara` |
| `POSTGRES_PASSWORD` | _(strong random password)_ |
| `POSTGRES_DB` | `kebunkumara` |
| `PAYLOAD_SECRET` | _(output from openssl above)_ |
| `NEXT_PUBLIC_SERVER_URL` | `https://dev.kebunkumara.id` |
| `NODE_ENV` | `production` |

> Never commit these values. They live only in Dokploy's environment panel.

---

## Step 2 — Create Project in Dokploy

1. Open Dokploy dashboard → **Projects** → **New Project**
2. Name: `kebunkumara-dev`
3. Click **Create**

---

## Step 3 — Add a Compose Service

1. Inside the project → **Create Service** → **Docker Compose**
2. Name: `web`
3. Under **Source**, choose **Git** and connect your repository
4. Set **Branch**: `main` (or `dev` if you have a separate branch)
5. Set **Compose File Path**: `docker-compose.yml`
6. Click **Save**

---

## Step 4 — Set Environment Variables

In the Compose service → **Environment** tab, paste all variables:

```env
POSTGRES_PASSWORD=your_strong_password_here
PAYLOAD_SECRET=your_generated_secret_here
NEXT_PUBLIC_SERVER_URL=https://dev.kebunkumara.id

# Optional (defaults are set in compose)
POSTGRES_USER=kebunkumara
POSTGRES_DB=kebunkumara
```

Click **Save**.

---

## Step 5 — Configure Domain & HTTPS

1. In the Compose service → **Domains** tab
2. Click **Add Domain**
3. Fill in:
   - **Host**: `dev.kebunkumara.id`
   - **Port**: `3000` (maps to the app container's exposed port)
   - **HTTPS**: Enable (Dokploy uses Let's Encrypt via Traefik automatically)
   - **Certificate**: `Let's Encrypt`
4. Click **Save**

> Traefik will automatically provision the TLS certificate once DNS is resolving.

---

## Step 6 — First Deploy

1. In the Compose service → **Deployments** tab
2. Click **Deploy**
3. Watch the build logs — first build takes ~3–5 min (Next.js + Payload compile)

**What happens during build:**
1. Docker pulls `node:22-alpine`
2. `npm ci` installs dependencies
3. `npm run build` runs Next.js + Payload build
4. Standalone output is copied to the runner image
5. PostgreSQL container starts and passes healthcheck
6. App container starts

---

## Step 7 — Verify Deployment

```
https://dev.kebunkumara.id          → public site
https://dev.kebunkumara.id/admin    → Payload CMS admin panel
```

First time only — **create the first admin user** by visiting `/admin` and following the setup wizard.

---

## Step 8 — Persistent Volume Check

Confirm volumes are mounted correctly in Dokploy → **Volumes** tab:

| Volume | Purpose |
|---|---|
| `postgres_data` | PostgreSQL database files |
| `media_uploads` | Uploaded images/files from Payload |

> These survive redeploys. Never delete them unless you want to lose data.

---

## Ongoing Deployments (Git Push → Auto Deploy)

1. In Compose service → **Settings** → enable **Auto Deploy**
2. Set the webhook in your GitHub repo:
   - **GitHub** → Repo Settings → Webhooks → Add webhook
   - URL: `https://your-dokploy-domain/api/deploy/webhook` _(get exact URL from Dokploy)_
   - Content type: `application/json`
3. Now every push to `main` triggers a redeploy automatically

---

## Database Migrations

Payload uses Drizzle. Migrations run automatically on app startup via Payload's `migrate` call — no manual step needed.

If you need to run migrations manually via SSH:

```bash
# SSH into VPS
ssh user@your-vps-ip

# Find the running app container
docker ps | grep kebunkumara

# Exec into it
docker exec -it <container_id> sh

# Run migrations
node -e "require('./server.js')" # starts server which triggers migrate
```

---

## Rollback

1. Dokploy → **Deployments** tab
2. Find the last working deployment
3. Click **Rollback** on that entry

---

## Production Checklist Before Going Live

- [ ] DNS A record is pointing to VPS IP
- [ ] HTTPS certificate issued (check padlock in browser)
- [ ] `/admin` accessible and first admin user created
- [ ] Upload a test image in Payload → verify it appears on the site
- [ ] `PAYLOAD_SECRET` is at least 32 chars and stored securely
- [ ] `POSTGRES_PASSWORD` is strong and not reused
- [ ] Auto-deploy webhook configured
- [ ] Volumes confirmed persistent (deploy again → check data survives)
- [ ] `NEXT_PUBLIC_SERVER_URL` matches the actual domain exactly (no trailing slash)

---

## Environment Promotion (dev → prod)

When ready to go to `kebunkumara.id`:

1. Duplicate the Dokploy project → rename to `kebunkumara-prod`
2. Update `NEXT_PUBLIC_SERVER_URL` → `https://kebunkumara.id`
3. Update the Domain entry → `kebunkumara.id`
4. Set a new `PAYLOAD_SECRET` (different from dev)
5. Use a separate `postgres_data` volume (never share prod DB with dev)

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| Build fails: `Cannot find module` | Check `npm ci` ran — `package-lock.json` must be committed |
| App crashes: `PAYLOAD_SECRET is required` | Add env var in Dokploy, redeploy |
| 502 Bad Gateway | App container not healthy — check build logs |
| Images not showing after redeploy | Confirm `media_uploads` volume is mounted |
| DB connection refused | Check `POSTGRES_PASSWORD` matches in both `app` and `db` env vars |
| Let's Encrypt fails | DNS not propagated yet — wait 5 min and retry |
