import { Stack } from "expo-router";
import React from "react";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name={"[gardenPlantId]"}
        options={{
          headerShown: false,
        }}></Stack.Screen>
    </Stack>
  );
}
