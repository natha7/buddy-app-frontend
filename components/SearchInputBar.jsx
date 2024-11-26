import { View, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";

export default function SearchInputBar(props) {
  const { placeholder_text, setCurrBudSearch } = props;
  const [currInput, setCurrInput] = useState("");

  function handleSearchEntry() {
    setCurrBudSearch(() => {
      return currInput;
    });
    setCurrInput(() => {
      return "";
    });
  }

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        height: 40,
        backgroundColor: "rgba(120, 165, 90, 0.5)",
        width: 330,
        marginHorizontal: "auto",
        marginTop: 10,
        color: "#314C1C",
        fontWeight: 600,
        borderRadius: 20,
        alignItems: "center",
      }}>
      <FontAwesome5
        name="search"
        size={22}
        color="#314C1C"
        style={{ position: "absolute", left: 10 }}
      />
      <TextInput
        style={{ height: "100%", width: "100%", paddingLeft: 40 }}
        placeholderTextColor="#314C1C"
        placeholder={placeholder_text}
        onChangeText={(text) => setCurrInput(text)}
        onSubmitEditing={handleSearchEntry}
        value={currInput}
      />
    </View>
  );
}
