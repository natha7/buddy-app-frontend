import { Text, Pressable } from "react-native";

export default function AddEntryBtn() {
  return (
    <Pressable style={{ height: 60, width: 120, borderRadius: 20, backgroundColor: "yellow" }}>
      <Text style={{ margin: "auto" }}>Add Entry</Text>
    </Pressable>
  );
}
