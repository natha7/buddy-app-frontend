import { Pressable, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function AddYourOwnBtn() {
  return (
    <Pressable
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

        position: "relative",
        bottom: 8,
      }}>
      <View style={{ margin: "auto", display: "flex" }}>
        <AntDesign name="plus" size={24} color="black" style={{ marginHorizontal: "auto" }} />
        <Text>Add your own plant...</Text>
      </View>
    </Pressable>
  );
}
