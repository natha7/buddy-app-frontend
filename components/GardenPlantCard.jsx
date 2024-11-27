import { Text, View, Image, Pressable } from "react-native";
import WaterGardenPlantBtn from "./WaterGardenPlantBtn.jsx";
import { useRouter } from "expo-router";
import capitaliseWords from "./utils/capitaliseWords";
import ThirstBar from "./ThirstBar";

export default function GardenPlantCard(props) {
  const { userGarden, plantDetails } = props;
  const router = useRouter();

  const handlePress = () => {
    const gardenPlantId = userGarden.garden_plant_id;
    router.push(`/(tabs)/(plants)/${gardenPlantId}`);
  };

  return (
    <Pressable onPress={handlePress}>
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
        {/* Plant Image Section */}
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
            source={{ uri: plantDetails.default_image }}
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

        {/* Plant Details Section */}
        <View style={{ marginVertical: "auto", flex: 1, marginLeft: 12 }}>
          <Text
            style={{
              marginBottom: 1,
              fontWeight: "600",
              fontSize: 14,
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {capitaliseWords(userGarden.nickname)}
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontStyle: "italic",
              textAlign: "left",
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {capitaliseWords(plantDetails.common_name)}
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12,
              alignItems: "center",
            }}>
            <ThirstBar
              lastWatered={userGarden.last_watered}
              wateringFrequency={plantDetails.watering_frequency_in_days}
            />
          </View>
        </View>
        <WaterGardenPlantBtn
          plantDetails={plantDetails}
          gardenPlantId={userGarden.garden_plant_id}
          nickname={userGarden.nickname}
        />
      </View>
    </Pressable>
  );
}
