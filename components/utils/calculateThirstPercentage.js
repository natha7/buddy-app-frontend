export default function calculateThirstPercentage(lastWateredDate, wateringFrequency) {
  const currentDate = new Date();
  const lastWatered = new Date(lastWateredDate);
  const daysElapsed = Math.floor((currentDate - lastWatered) / (1000 * 60 * 60 * 24));
  const thirstPercentage = Math.min((daysElapsed / wateringFrequency) * 100, 100);
  return thirstPercentage;
}
