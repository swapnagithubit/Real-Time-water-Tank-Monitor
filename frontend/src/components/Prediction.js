import React from "react";

function Prediction({ level, usageRate, history = [] }) {
  if (usageRate === 0 && history.length < 2) return null;

  // Calculate consumption rate from last 5 readings
  let estimatedRate = usageRate;
  if (history.length >= 5) {
    const recent = history.slice(-5);
    const firstLevel = recent[0];
    const lastLevel = recent[recent.length - 1];
    estimatedRate = Math.max(0, firstLevel - lastLevel) / 5; // per reading
  }

  let minutesEmpty = "N/A";
  let minutesFull = "N/A";
  
  if (estimatedRate > 0) {
    minutesEmpty = Math.floor(level / estimatedRate * 2); // 2 seconds per reading
  }
  
  if (estimatedRate > 0) {
    const spaceLeft = 1000 - level;
    minutesFull = Math.floor(spaceLeft / estimatedRate * 2);
  }

  return (
    <div style={{ margin: "20px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
      <h3>⏳ Predictions</h3>
      {minutesEmpty !== "N/A" ? (
        <p><b>Time to empty:</b> {minutesEmpty} seconds ({Math.floor(minutesEmpty / 60)} min)</p>
      ) : (
        <p><b>Time to empty:</b> Calculating...</p>
      )}
      {minutesFull !== "N/A" ? (
        <p><b>Time to full:</b> {minutesFull} seconds ({Math.floor(minutesFull / 60)} min)</p>
      ) : (
        <p><b>Time to full:</b> Calculating...</p>
      )}
      <p style={{ fontSize: "12px", color: "#666" }}>Based on current consumption rate</p>
    </div>
  );
}

export default Prediction;
