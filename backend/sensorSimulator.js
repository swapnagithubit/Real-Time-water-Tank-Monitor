let level = 0;

const generateSensorData = () => {
  // Generate smaller, more gradual changes for realistic water level progression
  const change = Math.floor(Math.random() * 15) - 5;
  level = Math.max(0, Math.min(1000, level + change));
  return level;
};

module.exports = generateSensorData;
