import React from "react";

function VisualTank({ level }) {
  const TANK_CAPACITY = 1000;
  const percentage = (level / TANK_CAPACITY) * 100;
  
  const getColor = () => {
    if (level <= 300) return "#f44336"; // RED - LOW
    if (level <= 700) return "#ff9800"; // ORANGE - MEDIUM
    return "#4caf50"; // GREEN - FULL
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <div
        style={{
          width: "120px",
          height: "300px",
          border: "3px solid #333",
          borderRadius: "10px",
          overflow: "hidden",
          margin: "0 auto",
          backgroundColor: "#f9f9f9",
          position: "relative"
        }}
      >
        {/* Water fill */}
        <div
          style={{
            height: `${percentage}%`,
            backgroundColor: getColor(),
            transition: "height 0.5s ease-in-out, background-color 0.5s ease-in-out",
            width: "100%",
            position: "absolute",
            bottom: 0
          }}
        />
        
        {/* Level percentage text */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: "bold",
            fontSize: "18px",
            color: "rgba(0,0,0,0.7)",
            textShadow: "0 0 3px white",
            zIndex: 10
          }}
        >
          {percentage.toFixed(0)}%
        </div>

        {/* Threshold markers */}
        <div
          style={{
            position: "absolute",
            top: "70%",
            left: 0,
            right: 0,
            height: "1px",
            backgroundColor: "#999",
            opacity: 0.5,
            display: "flex",
            alignItems: "center"
          }}
        >
          <span style={{ fontSize: "10px", color: "#999", marginLeft: "5px", position: "absolute" }}>
            70% (MEDIUM)
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: 0,
            right: 0,
            height: "1px",
            backgroundColor: "#999",
            opacity: 0.5,
            display: "flex",
            alignItems: "center"
          }}
        >
          <span style={{ fontSize: "10px", color: "#999", marginLeft: "5px", position: "absolute" }}>
            30% (LOW)
          </span>
        </div>
      </div>
      
      <p style={{ marginTop: "10px", fontSize: "14px", fontWeight: "bold" }}>
        {level} L / {TANK_CAPACITY} L
      </p>
    </div>
  );
}

export default VisualTank;
