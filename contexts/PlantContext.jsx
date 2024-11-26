import { createContext, useState, useContext, useCallback } from "react";
import { getUserGardenPlantByUserIdAndPlantId } from "../app/utils/api";

const PlantContext = createContext();

export const PlantContextProvider = ({ children }) => {
  const [gardenPlant, setGardenPlant] = useState(null);
  const [garden_plant_id, setGardenPlantId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPlantData = useCallback(
    async (user) => {
      if (!garden_plant_id) return;

      try {
        setLoading(true);
        const response = await getUserGardenPlantByUserIdAndPlantId(user, garden_plant_id);
        setGardenPlant(response);
      } catch (err) {
        setError(err.message || "Failed to fetch plant data");
      } finally {
        setLoading(false);
      }
    },
    [garden_plant_id]
  );

  return (
    <PlantContext.Provider
      value={{
        gardenPlant,
        garden_plant_id,
        setGardenPlantId,
        error,
        loading,
        fetchPlantData,
      }}>
      {children}
    </PlantContext.Provider>
  );
};

export const usePlantContext = () => {
  const context = useContext(PlantContext);
  if (!context) {
    throw new Error("usePlantContext must be used within a PlantContextProvider");
  }
  return context;
};
