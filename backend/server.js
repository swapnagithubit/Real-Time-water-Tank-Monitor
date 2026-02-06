const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const generateSensorData = require("./sensorSimulator");
const getStatus = require("./utils/statusCalculator");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

setInterval(() => {
  const level = generateSensorData();
  const status = getStatus(level);

  io.emit("waterLevel", {
    level,
    status,
    timestamp: Date.now()
  });
}, 2000);

server.listen(4000, () =>
  console.log("Backend running on port 4000")
);
