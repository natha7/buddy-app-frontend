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
  }, [gardenPlantId, route]);

  const fontsLoaded = useCustomFonts();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <ActivityIndicator size="large" color="#78A55A" />
          <Text style={{ marginTop: 10 }}>Loading plant...</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View
            style={{
              alignItems: "center",
              marginVertical: 20,
            }}>
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
              margin: "auto",
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
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                marginVertical: 30,
                flex: 1,
                marginLeft: 12,
              }}>
              <Text
                style={{
                  marginBottom: 5,
                  fontSize: 14,
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                Nickname: <Text style={{ fontWeight: "600" }}>{gardenPlant.nickname}</Text>
              </Text>
              <Text style={{ fontSize: 10 }}>
                Thirst: <Text style={{ fontWeight: "600" }}>{/* Add thirst data here */}</Text>
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
