import axios from "axios";

const api = axios.create({
    baseURL: "https://buddy-app-backend.onrender.com/api",
  });

 const getUserGardenByUserId = async (user_id) => {
    try {
      console.log("<<Making API call to:", `/user_gardens/${user_id}`);
      const { data } = await api.get(`/user_gardens/${user_id}`);
      console.log("<<Response data:", data); 
      console.log("<<Extracted user plants:", data.userGarden.user_plants);
      return data.userGarden.user_plants;
    } catch (error) {
      console.error("Error: Cannot fetch user garden data", error);
      return null;
    }
  };
  

  export { getUserGardenByUserId };