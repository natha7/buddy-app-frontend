import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import { formatDate } from "../utils/dateFormatter";
import { useCustomFonts } from "../../hooks/useCustomFonts";

// Sample user_plants data
const userPlants = [
  {
    _id: "67406a8271fdd5484fabe135",
    garden_plant_id: 1,
    plant_id: 385,
    last_watered: 1732277295224,
    nickname: "Sammy",
    journal_entries: [],
  },
  {
    _id: "67406a8271fdd5484fabe139",
    garden_plant_id: 2,
    plant_id: 125,
    last_watered: 1732277295224,
    nickname: "Johnny",
    journal_entries: [],
  },
];

const CalendarWithPlantWatering = () => {
  const [selectedDate, setSelectedDate] = useState("");

  // Create markedDates object based on userPlants
  const markedDates = userPlants.reduce((acc, plant) => {
    const formattedDate = formatDate(plant.last_watered);
    acc[formattedDate] = { marked: true, dotColor: "green" };
    return acc;
  }, {});

  // Render the event details
  const renderEvent = ({ item }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventText}>🌱 {item.nickname} - Last Watered</Text>
    </View>
  );

  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return <View></View>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Watering Calendar</Text>
      <Calendar
        markedDates={{
          ...markedDates,
          ...(selectedDate && { [selectedDate]: { selected: true, selectedColor: "orange" } }),
        }}
        onDayPress={(day) => {
          console.log("Selected date:", day.dateString);
          setSelectedDate(day.dateString);
        }}
        theme={{
          todayTextColor: "green",
          selectedDayBackgroundColor: "orange",
          dotColor: "blue",
          arrowColor: "green",
        }}
      />
      <View style={styles.eventsContainer}>
        <Text style={styles.subtitle}>
          {selectedDate
            ? `Watering details on ${selectedDate}:`
            : "Select a date to see watering details."}
        </Text>
        <FlatList
          data={userPlants.filter((plant) => formatDate(plant.last_watered) === selectedDate)}
          keyExtractor={(item) => item._id}
          renderItem={renderEvent}
          ListEmptyComponent={
            selectedDate && (
              <Text style={styles.noEventsText}>No plants require watering today.</Text>
            )
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontFamily: "Coustard_900Black",
    fontSize: 26,
    marginTop: 30,
    color: "#78A55A",
    marginLeft: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Coustard_400Regular",
    fontSize: 16,
    color: "#78A55A",
    letterSpacing: 0.3,
    marginVertical: 10,
    textAlign: "center",
  },
  eventsContainer: {
    flex: 1,
    marginTop: 20,
  },
  eventItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  eventText: {
    fontSize: 16,
  },
  noEventsText: {
    textAlign: "center",
    color: "gray",
    marginTop: 20,
  },
});

export default CalendarWithPlantWatering;
