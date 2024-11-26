import { Text, View, StyleSheet } from "react-native";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import { useEffect, useState } from "react";
import { getUserGardenPlantByUserIdAndPlantId } from "../utils/api";
import useUser from "../../hooks/useUser";
import { useRoute } from "@react-navigation/native";

export default function SingleGardenPlantById() {
  const route = useRoute(); // Access route params here
  const { gardenPlantId } = route.params;
  const [gardenPlant, setGardenPlant] = useState({});
  const user = useUser();

  useEffect(() => {
    getUserGardenPlantByUserIdAndPlantId(user, gardenPlantId).then((res) => {
      setGardenPlant(() => {
        return res;
      });
    });
  }, [gardenPlantId]);

  const fontsLoaded = useCustomFonts();

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
