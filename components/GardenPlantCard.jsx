import { ScrollView, Text, View } from "react-native";

export default function GardenPlantCard(props) {
  const { nickName, thirstiness, commonName } = props;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#78A55A33",
        borderRadius: 20,
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
      <View style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
        <Text style={{ fontSize: 12, marginTop: 10, alignSelf: "auto", fontStyle: "italic" }}>
          {commonName}
        </Text>
        <Text style={{ fontWeight: 500, marginRight: 10 }}>Nickname: {nickName}</Text>
        <View>
          <Text style={{ fontWeight: 500, marginRight: 10, marginBottom: 10 }}>
            Thirstiness: {"💧".repeat(thirstiness)}
          </Text>
        </View>
      </View>
    </View>
  );
}
