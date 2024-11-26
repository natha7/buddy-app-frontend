import { Text, View, StyleSheet } from "react-native";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import { useEffect, useState } from "react";
import { useSearchParams } from "expo-router/build/hooks";
import { useRouter } from "expo-router";
import { getUserGardenPlantByUserIdAndPlantId } from "../utils/api";
import useUser from "../../hooks/useUser";
import { usePlantContext } from "../../contexts/PlantContext";
import { useRoute } from "@react-navigation/native";

export default function SingleGardenPlantById() {
  const route = useRoute(); // Access route params here
  const { garden_plant_id } = route.params;
  console.log(garden_plant_id, "<< route.params");
  // const { garden_plant_id } = useSearchParams();
  // const router = useRouter();
  // const { garden_plant_id } = router.query;
  // const [plant, setPlant] = useState(null);
  // const [error, setError] = useState(null);
  const user = useUser();

  const { gardenPlant, error, loading, fetchPlantData } = usePlantContext();

  useEffect(() => {
    fetchPlantData(user);
  }, [garden_plant_id, fetchPlantData]);

  // useEffect(() => {
  //   // if (!user || !plantId) {
  //   //   console.warn("Skipping fetch: Missing user or plantId");
  //   //   return;
  //   // }
  //   console.log(garden_plant_id, "<< garden_plant_id");

  //   getUserGardenPlantByUserIdAndPlantId(user, garden_plant_id)
  //     .then((plantData) => {
  //       console.log(user_id, "<< user_id");
  //       setPlant(plantData);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to fetch plant details:", error.message);
  //       setError(error.message || "An error occurred while fetching plant details.");
  //     });
  // }, [user, garden_plant_id]);

  const fontsLoaded = useCustomFonts();

  // if (!plant || !fontsLoaded) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{gardenPlant?.nickname}'s Details</Text>
      <View style={styles.detailsCard}>
        <Text style={styles.text}>Nickname: {gardenPlant?.nickname}</Text>
        <Text style={styles.text}>Thirstiness: {"💧".repeat(gardenPlant?.thirstiness)}</Text>
        <Text style={styles.text}>Last Watered: {gardenPlant?.last_watered}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Coustard_900Black",
    color: "#78A55A",
  },
  detailsCard: {
    backgroundColor: "#78A55A33",
    padding: 20,
    borderRadius: 20,
    width: 300,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Coustard_400Regular",
  },
});
