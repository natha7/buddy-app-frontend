import axios from "axios";

const instance = axios.create({
  baseURL: "https://buddy-app-backend.onrender.com/api",
});

export function getUserGardenByUserId(user_id) {
  return instance
    .get(`/user_gardens/${user_id}`)
    .then((response) => {
      console.log(response.data.userGarden.user_plants);
      return response.data.userGarden.user_plants;
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
  if (!user_id || !garden_plant_id) {
    return Promise.reject(new Error("Invalid user_id or garden_plant_id provided"));
  }

  return instance
    .get(`/user_gardens/${user_id}/plants/${garden_plant_id}`)
    .then((response) => {
      return response.data.plant; // Return the 'plant' object directly
    })
    .catch((error) => {
      console.error("Error fetching plant data:", error.response?.data || error.message);
      // Re-throw the error to handle it in the caller
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

export function postJournalEntryByUserAndPlantId(userId, plantId, journalEntry) {
  return instance
    .post(`/user_garden/${userId}/plants/${plantId}/journal`, journalEntry)
    .then((res) => {
      return res.data.new_entry;
    });
}
