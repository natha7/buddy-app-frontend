import axios from "axios";

const instance = axios.create({
  baseURL: "https://buddy-app-backend.onrender.com/api",
});

export function getUserGardenByUserId(user_id) {
  return instance
    .get(`/user_gardens/${user_id}`)
    .then(({data}) => {
      return data.userGarden.user_plants;
    })
    .catch((error) => {
      throw error;
    });
}

export function getAllPlants(searchTerm) {
  return instance.get(`/plants?search=${searchTerm}`).then(({ data }) => {
    return data.plants;
  });
}

export function postBudToUserGarden(user_id, plantToSend) {
  return instance.post(`user_garden/${user_id}/plants`, plantToSend);
}

export function waterGardenPlant(user_id, garden_plant_id) {
  return instance.patch(`/user_garden/${user_id}/plants/${garden_plant_id}`, {
    water_plant: true,
  });
}

export function getUserGardenPlantByUserIdAndPlantId(user_id, garden_plant_id) {
  return instance
    .get(`/user_gardens/${user_id}/plants/${garden_plant_id}`)
    .then(({data}) => {
      return data.plant; 
    })
    .catch((error) => {
      throw error;
    });
}

export function getPlantByPlantId(plantId) {
  return instance.get(`/plants/${plantId}`).then(({ data }) => {
    return data;
  });
}

export function deletePlantByUserIdAndPlantId(userId, plantId) {
  return instance.delete(`/user_garden/${userId}/plants/${plantId}`);
}
