import { Text, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { useCustomFonts } from "../../../hooks/useCustomFonts";
import { useEffect, useState } from "react";
import { getPlantByPlantId, getUserGardenPlantByUserIdAndPlantId } from "../../utils/api";
import useUser from "../../../hooks/useUser";
import { useRoute } from "@react-navigation/native";
import JournalSection from "../../../components/JournalSection";

export default function SingleGardenPlantById() {
  const route = useRoute();
  const { gardenPlantId } = route.params;
  const [gardenPlant, setGardenPlant] = useState({});
  const [generalInfo, setGeneralInfo] = useState({});
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(() => {
      return true;
    });
    getUserGardenPlantByUserIdAndPlantId(user, gardenPlantId)
      .then((res) => {
        setGardenPlant(() => {
          return res;
        });
        return getPlantByPlantId(res.plant_id);
      })
      .then((fetchedPlant) => {
        setGeneralInfo(() => {
          return fetchedPlant;
        });
        setIsLoading(() => {
          return false;
        });
      });
  }, [gardenPlantId]);

  const fontsLoaded = useCustomFonts();

  return (
    <View>
      {isLoading ? (
        <View
          style={{
            minHeight: "100%",
            minWidth: "100%",
          }}>
          <View style={{ margin: "auto" }}>
            <ActivityIndicator size="large" color="#78A55A" />
            <Text>Loading plants...</Text>
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.title}>{gardenPlant?.nickname}'s Details</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#78A55A33",
              borderRadius: 20,
              height: 100,
              width: 330,
              margin: "auto",
            }}>
            <Image src={generalInfo.default_image} style={{ height: 100, width: 100 }} />
            <Text>Nickname: {gardenPlant.nickname}</Text>
            <Text>Thirst:</Text>
          </View>
          {Object.keys(gardenPlant).length > 0 ? (
            <JournalSection gardenPlant={gardenPlant} />
          ) : null}
        </View>
      )}
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
    marginTop: 30,

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
