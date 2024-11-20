import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function getSunlightIcon(sunlightLevel) {
  return (
    <View style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Ionicons
        name={sunlightLevel === "full sun" ? "sunny-outline" : "partly-sunny-outline"}
        size={16}
        color="#F39C12"
      />
      <Text style={{ fontSize: 10 }}>{sunlightLevel === "full sun" ? "Full" : "Partial"}</Text>
    </View>
  );
}
