# Real-Time Water Tank Monitor

This repository contains a small real-time water tank monitoring application:

- `backend/` — Node.js Express server with Socket.io that simulates sensor data and emits water-level events
- `frontend/` — React application that visualizes the tank level, charts history, shows alerts, and provides CSV reports

This project is intended as an IoT dashboard demo for monitoring a water tank in real time.

## Features

- Real-time water level streamed from backend via WebSockets
- Live chart with timestamps and axis labels
- Visual tank component with animated fill and threshold markers
- Dynamic status (LOW / MEDIUM / FULL) based on configurable thresholds
- Safety alerts (overflow / dry-run) that detect flow direction
- Prediction estimates for time-to-empty / time-to-full
- CSV report download (min / max / avg + history)
- GitHub Actions workflow to build and deploy the frontend to GitHub Pages

## Quickstart (development)

Prerequisites: Node.js 18+, npm, and Git installed.

1. Start the backend (simulator)

```bash
cd backend
npm install
node server.js
```

The backend will run a small simulator and emit `waterLevel` events on port `4000`.

2. Start the frontend

```bash
cd frontend
npm install
npm start
```

The React dev server will open (default `http://localhost:3000` or another port if taken). The app connects to `http://localhost:4000` for data.

## Project structure

- `backend/`
	- `server.js` — Express + Socket.io server emitting `waterLevel` events
	- `sensorSimulator.js` — simple simulator that generates level readings
	- `utils/statusCalculator.js` — dynamic status thresholds and helpers

- `frontend/`
	- `src/` — React source files
	- `src/components/` — UI components (Tank, VisualTank, Alert, WaterChart, Prediction)
	- `public/` — static assets
	- `package.json` — scripts and dependencies

## Configuration

- Tank capacity and thresholds are set in the backend `utils/statusCalculator.js` as percentages (default: LOW 30%, MEDIUM 70%). The frontend uses the same percentage logic for alerts and visual markers.

If you want to change thresholds at runtime, the backend exports `updateThresholds()`.

## Deployment to GitHub Pages

This repository includes a GitHub Actions workflow (`.github/workflows/deploy-frontend.yml`) that builds the `frontend` and publishes `frontend/build` to GitHub Pages on push to `main`.

If you prefer local deployment with `gh-pages`, you can add `gh-pages` and use `npm run build` then `gh-pages -d build` from the `frontend` folder.

## Scripts

Frontend (inside `frontend/`):

- `npm start` — run development server
- `npm run build` — build production bundle

Backend (inside `backend/`):

- `node server.js` — start the simulator server

## How to push updates

If you haven't already pushed to GitHub: create a repository, add a remote, and push:

```bash
git remote add origin git@github.com:<username>/real-time-water-tank-monitor.git
git branch -M main
git push -u origin main
```

## Notes & next steps

- The repository currently includes a GitHub Actions workflow that will build and deploy the frontend on pushes to `main`. Watch the Actions tab after pushing to confirm the site publishes.
- If you want the backend deployed publicly, consider a small VPS, Railway, Heroku, or Azure app and point the frontend to that socket endpoint.

## License

MIT
