import { Text, Pressable } from "react-native";

export default function DeletePlantBtn() {
  return (
    <Pressable style={{ height: 60, width: 120, borderRadius: 20, backgroundColor: "red" }}>
      <Text style={{ margin: "auto" }}>Delete Plant</Text>
    </Pressable>
  );
}
