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
};


export function getAllPlants(searchTerm) {
  return instance.get(`/plants?search=${searchTerm}`).then(({ data }) => {
    return data.plants;
  });
}
export function postBudToUserGarden(user_id, plantToSend) {
  return instance.post(`user_garden/${user_id}/plants`, plantToSend);
}
