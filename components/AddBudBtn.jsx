import { Pressable, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function AddBudBtn() {
  return (
    <Pressable style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 15 }}>
      <View style={{ height: "80%", width: 1.5, backgroundColor: "#314C1C", marginRight: 10 }} />
      <View style={{ marginVertical: "auto" }}>
        <AntDesign name="plus" size={24} color="#314C1C" />
        <Text style={{ color: "#314C1C", fontWeight: 600 }}>Add</Text>
      </View>
    </Pressable>
  );
}
