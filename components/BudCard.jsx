import { Image, Text, View } from "react-native";

import { getSunlightIcon } from "./utils/getSunlightIcon";
import { getWaterFrequencyIcon } from "./utils/getWaterFrequencyIcon";
import { getCycleIcon } from "./utils/getCycleIcon";
import AddBudBtn from "./AddBudBtn";

export default function BudCard(props) {
  const { img_url, common_name, latin_name, cycle, sunlight, watering_frequency } = props;

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
          src={img_url}
          style={{
            height: "100%",
            width: "100%",
            alignSelf: "center",
            borderRadius: 10,
          }}
        />
      </View>
      <View style={{ marginVertical: "auto" }}>
        <View>
          <Text style={{ marginBottom: 1 }}>
            Common name: <Text style={{ fontWeight: 600 }}>{common_name}</Text>
          </Text>
          <Text style={{ fontSize: 10, fontStyle: "italic", textAlign: "left" }}>
            Latin name: {latin_name}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
          }}>
          {getSunlightIcon(sunlight)}
          {getCycleIcon(cycle)}
          {getWaterFrequencyIcon(watering_frequency)}
        </View>
      </View>
      <AddBudBtn />
    </View>
  );
}
