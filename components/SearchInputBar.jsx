import { View, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function SearchInputBar(props) {
  const { placeholder_text } = props;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        height: 40,
        backgroundColor: "#d5dbdb",
        width: 330,
        marginHorizontal: "auto",
        marginTop: 10,

        color: "#839192",
        fontWeight: 600,
        borderRadius: 5,
        alignItems: "center",
      }}>
      <FontAwesome5
        name="search"
        size={22}
        color="#839192"
        style={{ position: "absolute", left: 10 }}
      />
      <TextInput
        style={{ height: "100%", width: "100%", paddingLeft: 40 }}
        placeholderTextColor="#5d6d7e"
        placeholder={placeholder_text}
      />
    </View>
  );
}
