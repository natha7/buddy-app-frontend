import React, { useState } from "react";
import { ScrollView, Text, Pressable, View } from "react-native";
import GardenPLantCard from "./GardenPlantCard.jsx";
import { TextInput } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
export default function GardenPlantList() {
  const [text, setText] = useState("");

  return (
    <>
      <Text
        style={{ fontSize: 26, fontWeight: 600, marginTop: 30, color: "#148f77", marginLeft: 30 }}>
        Your Garden:
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          height: 40,
          backgroundColor: "#d5dbdb",
          width: 300,
          marginLeft: 30,
          marginTop: 10,
          paddingLeft: 10,
          color: "#839192",
          fontWeight: 600,
          borderRadius: 5,
          alignItems: "center",
        }}>
        <FontAwesome5 name="search" size={22} color="#839192" />
        <TextInput
          style={{ marginLeft: 20 }}
          placeholderTextColor="#5d6d7e"
          placeholder="Search Plants"
          onChangeText={(newText) => setText(newText)}
          defaultValue={text}
        />
      </View>
      <ScrollView style={{ height: "auto", width: "auto", margin: "auto" }}>
        <GardenPLantCard nickName={"Dave"} thirstiness={1} commonName={"Basil"} />
        <GardenPLantCard nickName={"Nathan"} thirstiness={2} commonName={"Sunflower"} />
        <GardenPLantCard nickName={"Sue"} thirstiness={3} commonName={"Rose"} />
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
