import React from "react";
import { View, Text } from "react-native";

const ThirstBar = ({ thirstPercentage }) => {
  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <View
        style={{
          height: 10,
          width: "70%",
          backgroundColor: "#78A55A",
          borderRadius: 5,
          overflow: "hidden",
        }}>
        <View
          style={{
            height: "100%",
            width: `${thirstPercentage}%`,
            backgroundColor: "#FF6347",
          }}
        />
      </View>
      <Text style={{ fontSize: 10, marginTop: 4 }}>{Math.round(thirstPercentage)}% Thirsty</Text>
    </View>
  );
};

export default ThirstBar;
