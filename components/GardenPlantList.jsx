import { ScrollView, Text, Pressable, View } from "react-native";
import GardenPlantCard from "./GardenPlantCard.jsx";
import SearchInputBar from "./SearchInputBar.jsx";

export default function GardenPlantList() {
  return (
    <>
      <Text
        style={{ fontSize: 26, fontWeight: 600, marginTop: 30, color: "#148f77", marginLeft: 30 }}>
        Your Garden:
      </Text>
      <SearchInputBar placeholder_text={"Search Plants..."} />
      <ScrollView style={{ height: "auto", width: "auto", margin: "auto" }}>
        <GardenPlantCard nickName={"Dave"} thirstiness={1} commonName={"Basil"} />
        <GardenPlantCard nickName={"Nathan"} thirstiness={2} commonName={"Sunflower"} />
        <GardenPlantCard nickName={"Sue"} thirstiness={3} commonName={"Rose"} />
      </ScrollView>

      <Pressable
        style={{
          display: "flex",
          backgroundColor: "#f6ddcc",
          width: 100,
          padding: 10,
          alignItems: "center",
          marginLeft: 260,
          borderRadius: 5,
          marginTop: 30,
        }}>
        <Text style={{ fontSize: 16 }}>Find Plants</Text>
      </Pressable>
    </>
  );
}
