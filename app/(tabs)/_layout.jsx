import { Tabs } from "expo-router";
import React from "react";
import TabBar from "../../components/TabBar";

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="garden"
        options={{
          title: "My Garden",
          headerShown: false

        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="finder"
        options={{
          title: "Find a Bud",
          headerShown: false
        }}
      />
    </Tabs>
  );
}
