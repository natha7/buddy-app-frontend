import { Tabs } from "expo-router";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import TabBar from "../../components/TabBar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="garden"
        options={{
          title: "My Garden",
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
        }}
      />
      <Tabs.Screen
        name="finder"
        options={{
          title: "Find a Bud",
        }}
      />
    </Tabs>
  );
}
