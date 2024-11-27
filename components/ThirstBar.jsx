import React from "react";
import { View, Text } from "react-native";

const ThirstBar = ({ thirstPercentage }) => {
  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <View
        style={{
          height: 10,
          width: "70%",
          backgroundColor: "#D3D3D3",
          borderRadius: 5,
          overflow: "hidden",
        }}>
        <View
          style={{
            height: "100%",
            width: `${thirstPercentage}%`,
            backgroundColor: thirstPercentage > 75 ? "#FF6347" : "#78A55A",
          }}
        />
      </View>
      <Text style={{ fontSize: 10, marginTop: 4 }}>{Math.round(thirstPercentage)}% Thirsty</Text>
    </View>
  );
};

export default ThirstBar;
