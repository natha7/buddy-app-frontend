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

      <View style={{ marginVertical: "auto", flex: 1, marginLeft: 12 }}>
        <Text style={{ marginBottom: 1 }}>
          <Text style={{ fontWeight: 600 }}>{common_name}</Text>
        </Text>
        <Text style={{ fontSize: 10, fontStyle: "italic", textAlign: "left" }}>{latin_name}</Text>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 12,
            alignItems: "center",
          }}>
          <View style={{ alignItems: "center", flex: 1 }}>
            {getSunlightIcon(sunlight)}
            <Text style={{ fontSize: 10 }}>Sunlight</Text>
          </View>

          <View style={{ alignItems: "center", flex: 1 }}>
            {getCycleIcon(cycle)}
            <Text style={{ fontSize: 10 }}>Cycle</Text>
          </View>

          <View style={{ alignItems: "center", flex: 1 }}>
            {getWaterFrequencyIcon(watering_frequency)}
            <Text style={{ fontSize: 10 }}>Watering</Text>
          </View>
        </View>
      </View>
      <AddBudBtn />
    </View>
  );
}
