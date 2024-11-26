export default function thirstLevel(lastWatered, wateringFrequencyDays) {
  const lastWateredMs = new Date(lastWatered).getTime();
  const nowMs = Date.now();
  const timeSinceLastWateredDays = (nowMs - lastWateredMs) / (1000 * 60 * 60 * 24);

  // Determine thirst level based on watering frequency
  if (timeSinceLastWateredDays < wateringFrequencyDays * 0.5) {
    return ""; // Not thirsty at all
  } else if (timeSinceLastWateredDays < wateringFrequencyDays) {
    return "💧"; // Mildly thirsty
  } else if (timeSinceLastWateredDays < wateringFrequencyDays * 2) {
    return "💧💧"; // Thirsty
  } else {
    return "💧💧💧"; // Very thirsty
  }
}
