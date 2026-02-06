import React from "react";
import "./Tank.css";

function Tank({ level, status }) {
  const percent = (level / 1000) * 100;

  const color =
    status === "LOW" ? "red" :
    status === "MEDIUM" ? "orange" :
    "green";

  return (
    <div className="tank">
      <div
        className="water"
        style={{ height: `${percent}%`, backgroundColor: color }}
      />
    </div>
  );
}

export default Tank;
