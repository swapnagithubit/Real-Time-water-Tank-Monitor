import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Tank from "./components/Tank";
import WaterChart from "./components/WaterChart";
import Alerts from "./components/Alert";
import Prediction from "./components/Prediction";
import VisualTank from "./components/VisualTank";
import "./App.css";

const socket = io("http://localhost:4000");
const TANK_CAPACITY = 1000;
const LOW_THRESHOLD = 0.30;
const FULL_THRESHOLD = 0.70;

const getStatus = (level) => {
  const percentage = level / TANK_CAPACITY;
  if (percentage <= LOW_THRESHOLD) return "LOW";
  if (percentage <= FULL_THRESHOLD) return "MEDIUM";
  return "FULL";
};

function App() {
  const [level, setLevel] = useState(0);
  const [history, setHistory] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [prevLevel, setPrevLevel] = useState(0);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    socket.on("waterLevel", (data) => {
      const newLevel = data.level;
      
      // Update history (keep last 20 readings)
      setHistory((prev) => [...prev.slice(-19), newLevel]);
      
      // Add timestamp
      const time = new Date().toLocaleTimeString();
      setTimestamps((prev) => [...prev.slice(-19), time]);
      
      // Update levels first to track flow direction
      setPrevLevel((prev) => {
        const lastLevel = prev || newLevel;
        
        // Only show overflow alert if level is RISING and reaches 900L (indicating water flowing in)
        if (newLevel >= 900 && newLevel > lastLevel && !alertShown) {
          alert("🚨 OVERFLOW RISK! Tank is filling rapidly and approaching maximum capacity!");
          setAlertShown(true);
        }
        
        // Only show dry-run alert if level is FALLING and drops below 100L (indicating pump running dry)
        if (newLevel <= 100 && newLevel < lastLevel && lastLevel > 100 && !alertShown) {
          alert("🚨 DRY RUN DANGER! Pump might run dry - water level too low!");
          setAlertShown(true);
        }
        
        // Reset alert after level normalizes
        if (newLevel > 150 && newLevel < 900) {
          setAlertShown(false);
        }
        
        return newLevel;
      });
      
      setLevel(newLevel);
    });

    return () => socket.off("waterLevel");
  }, [alertShown]);

  const usageRate = prevLevel > level ? prevLevel - level : 0;
  const status = getStatus(level);
  
  // Calculate min, max, average for report
  const minLevel = history.length > 0 ? Math.min(...history) : 0;
  const maxLevel = history.length > 0 ? Math.max(...history) : 0;
  const avgLevel = history.length > 0 ? Math.round(history.reduce((a, b) => a + b, 0) / history.length) : 0;
  
  const downloadReport = () => {
    const csvContent = [
      ["Water Tank Monitoring Report"],
      ["Timestamp", new Date().toLocaleString()],
      [""],
      ["Current Level", level + " L"],
      ["Current Status", status],
      ["Minimum Level", minLevel + " L"],
      ["Maximum Level", maxLevel + " L"],
      ["Average Level", avgLevel + " L"],
      ["Tank Capacity", TANK_CAPACITY + " L"],
      [""],
      ["Reading History"],
      ["Time", "Level (L)"],
      ...timestamps.map((time, idx) => [time, history[idx]])
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `water-tank-report-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app">
      <h1>💧 Real-Time Water Tank Monitor</h1>

      <div style={{ display: "flex", gap: "30px", alignItems: "flex-start", justifyContent: "center", flexWrap: "wrap" }}>
        <div>
          <Tank level={level} status={status} />
          <VisualTank level={level} />
        </div>
        <div>
          <p><b>Status:</b> <span style={{ fontSize: "18px", fontWeight: "bold", color: status === "LOW" ? "red" : status === "MEDIUM" ? "orange" : "green" }}>{status}</span></p>
          <p><b>Current Level:</b> {level} L / {TANK_CAPACITY} L ({((level / TANK_CAPACITY) * 100).toFixed(1)}%)</p>
          <p><b>Minimum:</b> {minLevel} L</p>
          <p><b>Maximum:</b> {maxLevel} L</p>
          <p><b>Average:</b> {avgLevel} L</p>
          <button onClick={downloadReport} style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px"
          }}>📥 Download Report (CSV)</button>
        </div>
      </div>

      <Alerts level={level} />

      <Prediction level={level} usageRate={usageRate} history={history} />

      <WaterChart data={history} timestamps={timestamps} />
    </div>
  );
}

export default App;
