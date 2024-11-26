export default function thirstLevel(lastWatered, wateringFrequencyDays) {
  const lastWateredMs = new Date(lastWatered).getTime();
  const nowMs = Date.now();
  const timeSinceLastWateredDays = (nowMs - lastWateredMs) / (1000 * 60 * 60 * 24);

  if (wateringFrequencyDays == null) {
    return ""; // If wateringFrequencyDays is null
  } else if (timeSinceLastWateredDays < wateringFrequencyDays) {
    return ""; // Not thirsty
  } else if (timeSinceLastWateredDays < wateringFrequencyDays * 1.5) {
    return "💧"; // Slightly thirsty
  } else if (timeSinceLastWateredDays < wateringFrequencyDays * 2) {
    return "💧💧"; // Thirsty
  } else {
    return "💧💧💧"; // Very thirsty
  }
}
