import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { useRouter } from "expo-router";

export default function BackBtn() {
  const router = useRouter();
  function handlePressBack() {
    router.push("(tabs)/garden");
  }
  return (
    <Pressable onPress={handlePressBack}>
      <Ionicons name="arrow-back" size={24} style={{ marginHorizontal: "auto" }} />
      <Text>Back to Garden</Text>
    </Pressable>
  );
}
