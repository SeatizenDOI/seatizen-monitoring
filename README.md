
# How to launch for dev


Launch cog_server

uvicorn main:app --reload

Launch backend server

In backend :

uvicorn app.main:app --reload --port 3001

In frontend

pnpm dev

# TODO

- [] Add footprint of session in ASV explorer
- [] Verify server CORS and end-point

# Launch prod

docker compose build

docker compose up -d


docker compose up -d --build

docker compose down -v