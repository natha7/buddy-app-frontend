import { ScrollView, Text, Pressable, View } from "react-native";
import GardenPlantCard from "./GardenPlantCard.jsx";
import SearchInputBar from "./SearchInputBar.jsx";
import { useCustomFonts } from "../hooks/useCustomFonts";

export default function GardenPlantList() {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return <View></View>;
  }

  return (
    <>
      <Text
        style={{
          fontFamily: "Coustard_900Black",
          fontSize: 26,
          fontWeight: 600,
          marginTop: 30,
          color: "#78A55A",
          marginLeft: 30,
        }}>
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
          width: 110,
          padding: 10,
          alignItems: "center",
          marginLeft: 250,
          borderRadius: 10,
          marginTop: 30,
        }}>
        <Text style={{ fontSize: 16, color: "#314C1C" }}>Find Plants</Text>
      </Pressable>
    </>
  );
}
