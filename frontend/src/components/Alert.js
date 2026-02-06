import React from "react";

function Alerts({ level }) {
  // Dynamic threshold configuration (matching backend)
  const TANK_CAPACITY = 1000;
  const LOW_THRESHOLD = 0.30;      // 30% = 300L
  const FULL_THRESHOLD = 0.70;     // 70% = 700L
  
  const percentage = level / TANK_CAPACITY;

  if (percentage <= LOW_THRESHOLD) {
    return <p style={{ color: "red" }}>⚠ Tank is LOW – Refill needed</p>;
  }
  if (percentage >= FULL_THRESHOLD) {
    return <p style={{ color: "green" }}>⚠ Tank is FULL – Overflow risk</p>;
  }
  return null;
}

export default Alerts;
