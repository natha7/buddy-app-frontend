import { Pressable, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function AddBudBtn() {
  return (
    <Pressable style={{ height: "100%", paddingHorizontal: 15 }}>
      <View style={{ marginVertical: "auto" }}>
        <AntDesign name="plus" size={24} color="black" />
        <Text>Add</Text>
      </View>
    </Pressable>
  );
}
