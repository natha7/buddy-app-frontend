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
        minHeight: 180,
        maxHeight: 300,
        width: 330,
        alignSelf: "center",
        marginTop: 10,
        justifyContent: "space-evenly",
      }}>
      <View
        style={{
          width: "90%",
          justifyContent: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#314C1C",
          marginHorizontal: "auto",
          opacity: 0.7,
        }}>
        <Text
          style={{
            alignSelf: "flex-end",
            marginRight: 10,
            opacity: 0.7,
            opacity: 0.7,
          }}>
          Date: {formatDate(entry.date, "journal")}
        </Text>
      </View>
      <View style={{ marginHorizontal: 25, paddingBottom: 20, marginTop: -20 }}>
        <Text style={{ color: "#314C1C", fontWeight: "400", fontSize: 16 }}>{entry.text}</Text>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#314C1C",
          width: "90%",
          alignSelf: "center",
          opacity: 0.7,
        }}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "flex-end",
            marginRight: 10,
          }}>
          {entry.height_entry_in_cm ? (
            <Text>
              Height: <Text style={{ fontWeight: "600" }}>{entry.height_entry_in_cm}cm</Text>
            </Text>
          ) : (
            <Text style={{ opacity: 0.6, marginRight: 1 }}>Height: ——</Text>
            <Text style={{ opacity: 0.6, marginRight: 1 }}>Height: ——</Text>
          )}
        </View>
      </View>
    </View>
  );
}
