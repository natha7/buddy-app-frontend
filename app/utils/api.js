import axios from "axios";

const api = axios.create({
  baseURL: "https://buddy-app-backend.onrender.com/api",
});

export function getUserGardenByUserId(user_id) {
  return api
    .get(`/user_gardens/${user_id}`)
    .then((response) => {
      console.log(response.data.userGarden.user_plants);
      return response.data.userGarden.user_plants;
    })
    .catch((error) => {
      throw error;
    });
};

const instance = axios.create({ baseURL: "http://192.168.0.103:9090/api", timeout: 10000 });

export function getAllPlants(searchTerm) {
  return instance.get(`/plants?search=${searchTerm}`).then(({ data }) => {
    return data.plants;
  });
}
export function postBudToUserGarden(user_id, plantToSend) {
  return instance.post(`user_garden/${user_id}/plants`, plantToSend);
}
