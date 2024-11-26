import { Text, View, Image } from "react-native";
import { getWaterFrequencyIcon } from "./utils/getWaterFrequencyIcon";
import WaterGardenPlantBtn from "./WaterGardenPlantBtn.jsx";
import thirstLevel from "./utils/thirstLevel";

export default function GardenPlantCard(props) {
  const { userGarden, plantDetails } = props;

  return (
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
        marginTop: 30,
      }}>
      <View
        style={{
          marginLeft: 8,
          alignSelf: "center",
        }}>
        <Image
          source={{ uri: plantDetails.default_image }}
          style={{ width: 80, height: 80, borderRadius: 5 }}
        />
      </View>
      <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
        <Text style={{ fontSize: 12, marginTop: 10, alignSelf: "auto", fontStyle: "italic" }}>
          {plantDetails.common_name}
        </Text>
        <Text style={{ fontWeight: 500, marginRight: 10 }}>Nickname: {userGarden.nickname}</Text>
        <View>
          <Text style={{ fontWeight: 500, marginRight: 10, marginBottom: 10 }}>
            {getWaterFrequencyIcon(plantDetails.watering_frequency_in_days)}
            {thirstLevel(userGarden.last_watered, plantDetails.watering_frequency_in_days)}
            <WaterGardenPlantBtn plantDetails={plantDetails} />
          </Text>
        </View>
      </View>
    </View>
  );
}
