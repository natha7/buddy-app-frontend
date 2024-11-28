import { Text, View, ScrollView, Image, ActivityIndicator } from "react-native";
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
  const [isLoading, setIsLoading] = useState(true);
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
          <ScrollView>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "#78A55A33",
                borderRadius: 20,
                height: 200,
                width: 330,
                margin: "auto",
                marginTop: 8,
              }}>
              <View
                style={{
                  height: 90,
                  width: 90,
                  alignSelf: "center",
                  marginLeft: 16,
                  borderRadius: 10,
                  backgroundColor: "grey",
                  marginTop: 10,
                  marginBottom: 10,
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
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 10,
                  flex: 1,
                  marginLeft: 12,
                }}>
                <View style={{ paddingBottom: 10 }}>
                  <Text
                    style={{
                      marginBottom: 5,
                      fontSize: 14,
                    }}
                    ellipsizeMode="tail">
                    Nickname: <Text style={{ fontWeight: "600" }}>{gardenPlant.nickname}</Text>
                  </Text>
                  <Text style={{ fontSize: 10 }}>Common name: {generalInfo.common_name}</Text>
                  <Text style={{ fontSize: 10 }}>
                    Indoor: {!generalInfo.extra_info.indoor ? "No" : "Yes"}
                  </Text>
                  <Text style={{ fontSize: 10 }}>
                    Max height: {generalInfo.extra_info.max_height} feet
                  </Text>
                  <Text style={{ fontSize: 10 }}>Sunlight: {generalInfo.sunlight}</Text>
                  <Text style={{ fontSize: 10 }}>
                    Maintenance: {generalInfo.extra_info.maintenance}
                  </Text>
                </View>
              </View>
            </View>

            {Object.keys(gardenPlant).length > 0 && (
              <View style={{ flex: 1 }}>
                <JournalSection gardenPlant={gardenPlant} />
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
