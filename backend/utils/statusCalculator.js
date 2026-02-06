// Configuration for dynamic status thresholds (in percentage of tank capacity)
const TANK_CAPACITY = 1000; // liters
const STATUS_THRESHOLDS = {
  LOW: 0.30,      // 30% - Tank level below this is LOW
  MEDIUM: 0.70,   // 70% - Tank level below this is MEDIUM
  FULL: 1.0       // 100% - Tank level at or above MEDIUM threshold onwards is FULL
};

const getStatus = (level) => {
  const percentage = level / TANK_CAPACITY;
  
  if (percentage <= STATUS_THRESHOLDS.LOW) return "LOW";
  if (percentage <= STATUS_THRESHOLDS.MEDIUM) return "MEDIUM";
  return "FULL";
};

// Allow dynamic threshold updates
const updateThresholds = (newThresholds) => {
  if (newThresholds.LOW !== undefined) STATUS_THRESHOLDS.LOW = newThresholds.LOW;
  if (newThresholds.MEDIUM !== undefined) STATUS_THRESHOLDS.MEDIUM = newThresholds.MEDIUM;
};

module.exports = getStatus;
module.exports.updateThresholds = updateThresholds;
module.exports.getThresholds = () => ({ ...STATUS_THRESHOLDS });
