export default function thirstBarCalculator(lastWatered, wateringFreq) {
  if (!wateringFreq) return null;
  const timeOfWatered = Date.parse(lastWatered);
  const currentTime = Date.now();
  const timeDifferenceInDays = (currentTime - timeOfWatered) / (1000 * 60 * 60 * 24);

  if (Math.floor(timeDifferenceInDays) >= wateringFreq) return 100;
  else return (timeDifferenceInDays / wateringFreq) * 100;
}
