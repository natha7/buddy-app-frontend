import { Text, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { useCustomFonts } from "../../../hooks/useCustomFonts";
import { useEffect, useState } from "react";
import { getPlantByPlantId, getUserGardenPlantByUserIdAndPlantId } from "../../utils/api";
import useUser from "../../../hooks/useUser";
import { useRoute } from "@react-navigation/native";
import JournalSection from "../../../components/JournalSection";
import BackBtn from "../../../components/BackBtn";

export default function SingleGardenPlantById() {
  const route = useRoute();
  const { gardenPlantId } = route.params;
  const [gardenPlant, setGardenPlant] = useState({});
  const [generalInfo, setGeneralInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();

  useEffect(() => {
    setIsLoading(true);
    getUserGardenPlantByUserIdAndPlantId(user, gardenPlantId)
      .then((res) => {
        setGardenPlant(res);
        return getPlantByPlantId(res.plant_id);
      })
      .then((fetchedPlant) => {
        setGeneralInfo(fetchedPlant);
        setIsLoading(false);
      });
  }, [gardenPlantId, route]);

  const fontsLoaded = useCustomFonts();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#78A55A" />
          <Text style={{ marginTop: 10 }}>Loading plant...</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <View style={{ alignSelf: "flex-start" }}>
              <BackBtn />
            </View>
            <Text
              style={{
                fontFamily: "Coustard_900Black",
                fontSize: 26,
                color: "#78A55A",
                marginTop: 10,
                textAlign: "center",
              }}>
              {gardenPlant?.nickname}'s Details
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#78A55A33",
              borderRadius: 20,
              height: 120,
              width: 330,
              alignSelf: "center",
              marginTop: 8,
            }}>
            <View
              style={{
                height: 75,
                width: 75,
                alignSelf: "center",
                marginLeft: 16,
                borderRadius: 10,
                backgroundColor: "grey",
              }}>
              <Image
                source={{ uri: generalInfo.default_image }}
                style={{
                  height: "100%",
                  width: "100%",
                  alignSelf: "center",
                  borderRadius: 10,
                  borderColor: "#314C1C",
                  borderWidth: 1,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                marginLeft: 12,
                marginVertical: 30,
              }}>
              <Text style={{ fontSize: 14, marginBottom: 5 }}>
                Nickname: <Text style={{ fontWeight: "600" }}>{gardenPlant.nickname}</Text>
              </Text>
              <Text style={{ fontSize: 10 }}>
                Thirst: <Text style={{ fontWeight: "600" }}>{gardenPlant.thirst || "Unknown"}</Text>
              </Text>
            </View>
          </View>

          {Object.keys(gardenPlant).length > 0 && (
            <View style={{ flex: 1 }}>
              <JournalSection gardenPlant={gardenPlant} />
            </View>
          )}
        </View>
      )}
    </View>
  );
}
