import { Text, View, StyleSheet } from "react-native";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import { useEffect, useState } from "react";
import { useSearchParams } from "expo-router/build/hooks";
import { getUserGardenPlantByUserIdAndPlantId } from "../utils/api";

export default function SingleGardenPlantById() {
  const { plantId } = useSearchParams();
  const [plant, setPlant] = useState(null);

  // useEffect(() => {
  //   const fetchPlantDetails = async () => {
  //     const fetchedPlant = {
  //       id: plantId,
  //       commonName: "Basil",
  //       nickName: "Dave",
  //       thirstiness: 1,
  //       lastWatered: "2024-11-24",
  //     };
  //     setPlant(fetchedPlant);
  //   };

  //   fetchPlantDetails();
  // }, [plantId]);

  useEffect(() => {
    return getUserGardenPlantByUserIdAndPlantId.then((plantData) => {
      setPlant(plantData);
    });
  }, [plantId]);

  const fontsLoaded = useCustomFonts();

  if (!plant || !fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading Fonts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {console.log(plant.nickName)}
      <Text style={styles.title}>{plant.nickname}'s Details</Text>
      <View style={styles.detailsCard}>
        <Text style={styles.text}>Nickname: {plant.nickname}</Text>
        <Text style={styles.text}>Thirstiness: {"💧".repeat(plant.thirstiness)}</Text>
        <Text style={styles.text}>Last Watered: {plant.last_watered}</Text>
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
