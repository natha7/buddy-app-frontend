import { View, Text } from "react-native";
import formatDate from "../app/utils/dateFormatter";

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
        justifyContent: "space-evenly",
      }}>
      <Text style={{ alignSelf: "flex-end" }}>{formatDate(entry.date, "journal")}</Text>
      <View style={{ marginHorizontal: 10 }}>
        <Text>{entry.text}</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "flex-end",
          marginRight: 10,
        }}>
        {entry.height_entry_in_cm ? <Text>Height: {entry.height_entry_in_cm}cm</Text> : null}
      </View>
    </View>
  );
}
