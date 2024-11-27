import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import formatDate from "../utils/dateFormatter";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import { getUserGardenByUserId } from "../utils/api";
import useUser from "../../hooks/useUser";

const CalendarWithPlantWatering = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [userPlants, setUserPlants] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  const user = useUser();

  useEffect(() => {
    getUserGardenByUserId(user)
      .then((fetchedPlants) => {
        setUserPlants(fetchedPlants);
        const dates = fetchedPlants.reduce((acc, plant) => {
          const formattedDate = formatDate(plant.last_watered);
          acc[formattedDate] = { marked: true, dotColor: "#314C1C" };
          return acc;
        }, {});

        setMarkedDates(dates);
      })
      .catch((error) => {
        console.error("Error fetching user plants:", error.message);
      });
  }, []);

  const renderEvent = ({ item }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventText}>🌱 {item.nickname}</Text>
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
          ...(selectedDate && { [selectedDate]: { selected: true, selectedColor: "#314C1C" } }),
        }}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
        }}
        theme={{
          textMonthFontFamily: "Coustard_400Regular",
          monthTextColor: "#78A55A",
          todayTextColor: "#314C1C",
          dayTextColor: "#78A55A",
          selectedDayBackgroundColor: "#314C1C",
          dotColor: "blue",
          arrowColor: "#314C1C",
        }}
      />
      <View style={styles.eventsContainer}>
        <Text style={styles.subtitle}>
          {selectedDate
            ? `Last watered on ${selectedDate}:`
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
    fontFamily: "Coustard_400Regular",
    color: "#314C1C",
    fontSize: 16,
  },
  noEventsText: {
    textAlign: "center",
    color: "gray",
    marginTop: 20,
  },
});

export default CalendarWithPlantWatering;
