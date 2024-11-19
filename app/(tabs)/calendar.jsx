import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CalendarPage() {
  return (
    <SafeAreaView>
      <View style={{ backgroundColor: "green", height: 100, width: "auto", margin: "auto" }}>
        <Text>Calendar Page Placeholder</Text>
      </View>
    </SafeAreaView>
  );
}
