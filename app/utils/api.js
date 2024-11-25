import axios from "axios";

const instance = axios.create({ baseURL: "http://192.168.0.103:9090/api", timeout: 10000 });

export default function getAllPlants(searchTerm) {
  return instance.get(`/plants?search=${searchTerm}`).then(({ data }) => {
    return data.plants;
  });
}
