import { ScrollView, Text, View } from "react-native";

export default function GardenPlantCard(props) {
  const { nickName, thirstiness, commonName } = props;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#a3e4d7",
        borderRadius: 8,
        height: 100,
        width: 330,
        margin: "auto",
        marginTop: 30,
      }}>
      <View
        style={{
          borderRadius: 5,
          marginLeft: 8,
          backgroundColor: "#bfc9ca",
          height: 80,
          width: 80,
          alignSelf: "center",
        }}></View>
      <View style={{ display: "flex" }}>
        <Text style={{ fontSize: 12, marginTop: 10, alignSelf: "auto" }}>{commonName}</Text>
        <Text style={{ fontSize: 16, fontWeight: 500, marginRight: 8 }}>Nickname: {nickName}</Text>
        <View>
          <Text style={{ fontSize: 16, fontWeight: 500, marginRight: 8 }}>
            Thirstiness: {"💧".repeat(thirstiness)}
          </Text>
        </View>
      </View>
    </View>
  );
}
