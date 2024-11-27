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
    .catch((err) => {
      return err;
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

export async function IdentifyPlant(base64Image, apiKey, options = {}) {
  const headers = new Headers({
    "Api-Key": apiKey,
    "Content-Type": "application/json",
  });

  const body = {
    images: [base64Image], 
    similar_images: true,  
    classification_level: "all",
    latitude: 49.207,
    longitude: 16.608, 
    ...options, 
  };

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch("https://plant.id/api/v3/identification", requestOptions);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error identifying plant:", error);
    throw error;
  }
}