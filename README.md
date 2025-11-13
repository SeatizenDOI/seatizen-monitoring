<p align="center">
  <a href="https://github.com/SeatizenDOI/seatizen-monitoring/graphs/contributors"><img src="https://img.shields.io/github/contributors/SeatizenDOI/seatizen-monitoring" alt="GitHub contributors"></a>
  <a href="https://github.com/SeatizenDOI/seatizen-monitoring/network/members"><img src="https://img.shields.io/github/forks/SeatizenDOI/seatizen-monitoring" alt="GitHub forks"></a>
  <a href="https://github.com/SeatizenDOI/seatizen-monitoring/issues"><img src="https://img.shields.io/github/issues/SeatizenDOI/seatizen-monitoring" alt="GitHub issues"></a>
  <a href="https://github.com/SeatizenDOI/seatizen-monitoring/blob/master/LICENSE"><img src="https://img.shields.io/github/license/SeatizenDOI/seatizen-monitoring" alt="License"></a>
  <a href="https://github.com/SeatizenDOI/seatizen-monitoring/pulls"><img src="https://img.shields.io/github/issues-pr/SeatizenDOI/seatizen-monitoring" alt="GitHub pull requests"></a>
  <a href="https://github.com/SeatizenDOI/seatizen-monitoring/stargazers"><img src="https://img.shields.io/github/stars/SeatizenDOI/seatizen-monitoring" alt="GitHub stars"></a>
  <a href="https://github.com/SeatizenDOI/seatizen-monitoring/watchers"><img src="https://img.shields.io/github/watchers/SeatizenDOI/seatizen-monitoring" alt="GitHub watchers"></a>
</p>


<div align="center">

# Seatizen monitoring

</div>

This repository provides a web interface to monitore the Seatizen Atlas Database

---

## 🚀 Development Setup

### 1. Database Configuration

Create a `.env` file at the project root with:

```bash
DATABASE_URL=postgresql+asyncpg://bioeos:pwd@db:5432/seatizenmonitoring

DB_NAME="seatizenmonitoring"
DB_USER="bioeos"
DB_PASS=pwd
DB_HOST="db"
DB_PORT="5432"

GPKG_PATH_DEV="./data/seatizen_atlas_db.gpkg"
PG_SUPERUSER_DEV="postgres"
```

### 2. Launch Backend Server

In the `backend/` folder:

Create a `.env` file inside `backend/`

```bash
DATABASE_URL=postgresql+asyncpg://bioeos:pwd@localhost:5432/seatizenmonitoring
ENV_TYPE=DEV
```

then run

```bash
# Create and activate conda environment
conda create --name seatizen_monitoring_env python=3.13
conda activate seatizen_monitoring_env

# Install dependencies
pip install -r requirements.txt

# Start development server
uvicorn app.main:app --reload --port 3001

```

### 3. Launch Frontend



In the `frontend/` folder:

```bash
pnpm install
pnpm dev
```

Create a `.env.development.local` file inside `frontend/`
```env
NEXT_PUBLIC_URL_COG_SERVER=http://localhost:8000
NEXT_PUBLIC_URL_BACKEND_SERVER=http://localhost:3001
```

Access the app at http://localhost:3000

## 📦 Production Setup

### 1. Environment Variables

Create a `.env` file at the project root:

```bash
DATABASE_URL=postgresql+asyncpg://bioeos:pwd@db:5432/seatizenmonitoring

DB_NAME="seatizenmonitoring"
DB_USER="bioeos"
DB_PASS=pwd
DB_HOST="db"
DB_PORT="5432"

GPKG_PATH="/tmp/data/seatizen_atlas_db.gpkg"

PG_SUPERUSER=myuser
POSTGRES_PASSWORD=mypassword

ENV_TYPE=PROD

PROD_UID=1000
PROD_GID=1000
```

### 2. Frontend Production Config

```bash
NEXT_PUBLIC_URL_COG_SERVER=https://tmsserver.ifremer.re
NEXT_PUBLIC_URL_BACKEND_SERVER=http://localhost:3801
```

### 3. Launch with Docker

Start services:


```bash
docker compose up -d --build
```

Stop and remove containers and volumes:

```bash
docker compose down -v
```

