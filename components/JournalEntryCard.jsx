import { View, Text } from "react-native";

export default function JournalEntryCard(props) {
  const { entry } = props;

  return (
    <View
      style={{
        display: "flex",
        backgroundColor: "#78A55A33",
        borderRadius: 20,
        height: 100,
        width: 330,
        margin: "auto",
        marginTop: 10,
      }}>
      <View style={{ margin: 20 }}>
        <Text>{entry.text}</Text>
      </View>
      <View style={{ alignSelf: "flex-end", marginRight: 10 }}>
        <Text style={{ alignSelf: "flex-end" }}>Height: {entry.height_entry_in_cm}cm</Text>
        <Text style={{ alignSelf: "flex-end" }}>{entry.date}</Text>
      </View>
    </View>
  );
}
