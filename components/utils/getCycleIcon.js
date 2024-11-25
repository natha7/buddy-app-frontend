import { FontAwesome } from "@expo/vector-icons";
import { View, Text } from "react-native";

export function getCycleIcon(plantCycle) {
  if (plantCycle === "Herbaceous Perennial") plantCycle = "Perennial";

  const icons = {
    Perennial: <FontAwesome name="star" size={16} color="black" />,
    Biennial: <FontAwesome name="star-half-full" size={16} color="black" />,
    Annual: <FontAwesome name="star-o" size={16} color="black" />,
  };

  return (
    <View style={{ alignItems: "center" }}>
      {icons[plantCycle]}
      <Text style={{ fontSize: 10 }}>{plantCycle}</Text>
    </View>
  );
}
