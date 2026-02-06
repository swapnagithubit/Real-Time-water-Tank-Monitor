const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const generateSensorData = require("./sensorSimulator");
const getStatus = require("./utils/statusCalculator");

const app = express();
app.use(cors());
app.use(express.json());

// HTTP endpoint to reset the simulator
app.post("/reset", (req, res) => {
  const { initial = 0 } = req.body || {};
  const reset = require("./sensorSimulator").reset;
  if (typeof reset === "function") {
    const newLevel = reset(initial);
    const status = getStatus(newLevel);
    io.emit("waterLevel", { level: newLevel, status, timestamp: Date.now() });
    res.json({ ok: true, level: newLevel, status });
  } else {
    res.status(500).json({ ok: false, reason: "reset not available" });
  }
});

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Emit updates every 2 seconds
setInterval(() => {
  const level = generateSensorData();
  const status = getStatus(level);

  io.emit("waterLevel", {
    level,
    status,
    timestamp: Date.now()
  });
}, 2000);

// When a client connects, emit current level immediately and allow reset
io.on("connection", (socket) => {
  const current = generateSensorData(); // advance once and get
  socket.emit("waterLevel", { level: current, status: getStatus(current), timestamp: Date.now() });

  socket.on("resetSimulator", (initial = 0) => {
    if (typeof generateSensorData.reset === "function") {
      // prefer exported reset if available
      const reset = require("./sensorSimulator").reset;
      const newLevel = reset(initial);
      socket.emit("waterLevel", { level: newLevel, status: getStatus(newLevel), timestamp: Date.now() });
    }
  });
});

server.listen(4000, () =>
  console.log("Backend running on port 4000")
);
