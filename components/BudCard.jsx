import { Image, Text, View } from "react-native";
import { getSunlightIcon } from "./utils/getSunlightIcon";
import { getWaterFrequencyIcon } from "./utils/getWaterFrequencyIcon";
import { getCycleIcon } from "./utils/getCycleIcon";
import AddBudBtn from "./AddBudBtn";
import capitaliseWords from "./utils/capitaliseWords";

export default function BudCard(props) {
  const { plantData } = props;

  return (
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
          src={plantData.default_image}
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

      <View style={{ marginVertical: "auto", flex: 1, marginLeft: 12 }}>
        <Text style={{ marginBottom: 1, fontWeight: "600" }} numberOfLines={1} ellipsizeMode="tail">
          {capitaliseWords(plantData.common_name)}
        </Text>
        <Text
          style={{ fontSize: 10, fontStyle: "italic", textAlign: "left" }}
          numberOfLines={1}
          ellipsizeMode="tail">
          {capitaliseWords(plantData.scientific_name[0])}
        </Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
            alignItems: "center",
          }}>
          <View style={{ alignItems: "center", flex: 1 }}>
            {getSunlightIcon(plantData.sunlight[0])}
          </View>

          <View style={{ alignItems: "center", flex: 1 }}>{getCycleIcon(plantData.cycle)}</View>

          <View style={{ alignItems: "center", flex: 1 }}>
            {getWaterFrequencyIcon(plantData.watering_frequency_in_days)}
          </View>
        </View>
      </View>
      <AddBudBtn
        plantInfo={{
          common_name: plantData.common_name,
          plant_id: plantData.plant_id,
          img_url: plantData.default_image,
        }}
      />
    </View>
  );
}
