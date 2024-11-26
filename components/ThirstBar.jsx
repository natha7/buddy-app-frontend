import React from "react";
import { View, Text } from "react-native";

const ThirstBar = ({ lastWatered, wateringFrequency }) => {

  const validWateringFrequency = wateringFrequency || 7;

  const currentDate = new Date();
  const lastWateredDate = lastWatered ? new Date(lastWatered) : null;

  const elapsedDays = lastWateredDate
    ? Math.round((currentDate - lastWateredDate) / (1000 * 60 * 60 * 24))
    : validWateringFrequency;

  const thirstPercentage = Math.min((elapsedDays / validWateringFrequency) * 100, 100);

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
