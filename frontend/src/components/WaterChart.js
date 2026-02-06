import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function WaterChart({ data, timestamps = [] }) {
  return (
    <div style={{ width: "90%", maxWidth: "900px", margin: "30px auto" }}>
      <Line
        data={{
          labels: timestamps.length > 0 ? timestamps : data.map((_, i) => i + 1),
          datasets: [
            {
              label: "Water Level (Liters)",
              data: data,
              borderColor: "#2196F3",
              backgroundColor: "rgba(33, 150, 243, 0.1)",
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: "#2196F3"
            }
          ]
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: true,
              text: "Water Level Over Time",
              font: { size: 16 }
            },
            legend: {
              display: true,
              position: "top"
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Time (seconds)",
                font: { size: 14, weight: "bold" }
              },
              ticks: {
                maxRotation: 45,
                minRotation: 0
              }
            },
            y: {
              title: {
                display: true,
                text: "Water Level (Liters)",
                font: { size: 14, weight: "bold" }
              },
              min: 0,
              max: 1000,
              ticks: {
                stepSize: 100
              }
            }
          }
        }}
      />
    </div>
  );
}

export default WaterChart;
