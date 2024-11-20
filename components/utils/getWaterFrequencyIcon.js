import { View, Text } from "react-native";

export function getWaterFrequencyIcon(waterFrequency) {
  return (
    <View style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Text style={{ fontSize: 12.999 }}>
        {waterFrequency === null
          ? "🌳"
          : waterFrequency < 3
          ? "💧".repeat(3)
          : waterFrequency >= 7
          ? "💧".repeat(2)
          : waterFrequency < 7
          ? "💧".repeat(1)
          : null}
      </Text>
      <Text style={{ fontSize: 10 }}>Thirst</Text>
    </View>
  );
}
