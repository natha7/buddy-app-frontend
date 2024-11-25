import axios from "axios";

const api = axios.create({
  baseURL: "https://buddy-app-backend.onrender.com/api",
});

const getUserGardenByUserId = (user_id) => {
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

export default getUserGardenByUserId;
