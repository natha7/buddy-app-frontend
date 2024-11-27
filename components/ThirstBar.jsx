import React from "react";
import { View, Text } from "react-native";

const ThirstBar = ({ currentThirst }) => {
  const barWidth = currentThirst ? `${currentThirst}%` : "0%";

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
            width: `${barWidth}`,
            backgroundColor: "#FF6347",
          }}
        />
      </View>
      <Text style={{ fontSize: 10, marginTop: 4 }}>
        {currentThirst || currentThirst === 0
          ? `${Math.round(currentThirst)}% Thirst`
          : "No watering needed"}
      </Text>
    </View>
  );
};

export default ThirstBar;
