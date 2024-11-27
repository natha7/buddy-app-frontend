export default function sortPlantsByThirst(userPlants) {
  return userPlants
    .map((plant) => {
      const thirstPercentage = calculateThirstPercentage(
        plant.last_watered,
        plant.watering_frequency_in_days || 7
      );
      return { ...plant, thirstPercentage };
    })
    .sort((a, b) => b.thirstPercentage - a.thirstPercentage);
}
