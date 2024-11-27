import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { useRouter } from "expo-router";
import { useCustomFonts } from "../hooks/useCustomFonts";

export default function BackBtn() {
  const router = useRouter();
  function handlePressBack() {
    router.push("(tabs)/garden");
  }
  return (
    <Pressable
      onPress={handlePressBack}
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Ionicons
        name="arrow-back"
        size={24}
        style={{ marginHorizontal: "auto", color: "#78A55A" }}
      />
      <Text style={{ color: "#78A55A", fontFamily: "Coustard_400Regular" }}>Back to Garden</Text>
    </Pressable>
  );
}
