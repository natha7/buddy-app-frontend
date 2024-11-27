import { ScrollView, Text, Pressable, View, TextInput, ActivityIndicator } from "react-native";
import GardenPlantCard from "./GardenPlantCard.jsx";
import { FontAwesome5 } from "@expo/vector-icons";
import { getPlantByPlantId, getUserGardenByUserId } from "@/app/utils/api.js";
import { useIsFocused } from "@react-navigation/native";
import filter from "lodash.filter";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import userUser from "../hooks/useUser.jsx";
import thirstBarCalculator from "@/app/utils/thirstBarCalculator.js";

export default function GardenPlantList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userGardenList, setUserGardenList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const user = userUser();

  function toggleEditMode() {
    setIsEditMode((curr) => {
      return !curr;
    });
  }

  const sortPlantsByThirst = (userPlants) => {
    return userPlants.sort((a, b) => {
      if (
        thirstBarCalculator(a.last_watered, a.plantDetails.watering_frequency_in_days) >
        thirstBarCalculator(b.last_watered, b.plantDetails.watering_frequency_in_days)
      ) {
        return -1;
      }
      if (
        thirstBarCalculator(a.last_watered, a.plantDetails.watering_frequency_in_days) <
        thirstBarCalculator(b.last_watered, b.plantDetails.watering_frequency_in_days)
      ) {
        return 1;
      } else return 0;
    });
  };

  const fetchUserGardenList = (user) => {
    getUserGardenByUserId(user)
      .then((userPlants) => {
        const userPlantsExtraPromises = userPlants.map((userPlant) => {
          const userPlantId = userPlant.plant_id;
          return getPlantByPlantId(userPlantId)
            .then((data) => {
              return {
                ...userPlant,
                plantDetails: data,
              };
            })
            .catch((err) => {
              console.error(`Error fetching plant data for plant_id ${userPlantId}:`, err);
              return userPlant;
            });
        });

        return Promise.all(userPlantsExtraPromises);
      })
      .then((userPlantsExtra) => {
        const sortedPlants = sortPlantsByThirst(userPlantsExtra);
        setUserGardenList(sortedPlants);
        setFullData(sortedPlants);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user garden or resolving plant data:", err.message || err);
        setError(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      fetchUserGardenList(user);
    }
  }, [user, isFocused]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, (userPlant) => {
      return contains(userPlant, formattedQuery);
    });
    setUserGardenList(filteredData);
  };

  const contains = ({ nickname, plantDetails }, query) => {
    const common_name = plantDetails.common_name;
    if (
      (nickname && nickname.toLowerCase().includes(query)) ||
      (common_name && common_name.toLowerCase().includes(query))
    ) {
      return true;
    }
    return false;
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 200 }}>
        <ActivityIndicator size={"large"} color="#78A55A" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error in fetching data ... Please check your internet connection!</Text>
      </View>
    );
  }

  return (
    <View style={{ height: "100%", alignItems: "center" }}>
      <Text
        style={{
          fontFamily: "Coustard_900Black",
          fontSize: 26,
          marginTop: 30,
          color: "#78A55A",
          marginBottom: 20,
          textAlign: "center",
        }}>
        Your Garden
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          height: 40,
          backgroundColor: "rgba(120, 165, 90, 0.5)",
          width: 330,
          marginHorizontal: "auto",
          marginTop: 10,
          color: "#314C1C",
          fontWeight: 600,
          borderRadius: 20,
          alignItems: "center",
        }}>
        <FontAwesome5
          name="search"
          size={22}
          color="#314C1C"
          style={{ position: "absolute", left: 10 }}
        />
        <TextInput
          style={{ height: "100%", width: "100%", paddingLeft: 40 }}
          placeholderTextColor="#314C1C"
          placeholder="Search for plants in your garden..."
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(query) => handleSearch(query)}
        />
      </View>
      <View style={{ marginTop: 5, width: 330 }}>
        <Pressable
          style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}
          onPress={toggleEditMode}>
          <Text>{isEditMode ? "Finish editing" : "Edit"}</Text>
          <FontAwesome5 name="pencil-alt" size={16} color="black" style={{ marginLeft: 5 }} />
        </Pressable>
      </View>
      <ScrollView
        style={{
          width: "100%",
          marginHorizontal: "auto",
          marginBottom: 8,
        }}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 120,
        }}>
        {userGardenList.map((userGarden) => (
          <GardenPlantCard
            key={userGarden._id}
            userGarden={userGarden}
            plantDetails={userGarden.plantDetails}
            plantId={userGarden.garden_plant_id}
            isEditMode={isEditMode}
          />
        ))}
      </ScrollView>
      <Pressable
        onPress={() =>
          navigation.navigate("(tabs)", {
            screen: "finder",
          })
        }
        style={{
          backgroundColor: "#78A55A",
          paddingHorizontal: 20,
          paddingVertical: 10,
          alignItems: "center",
          alignSelf: "center",
          borderRadius: 20,
          marginTop: -100,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 5,
        }}>
        <Text style={{ fontSize: 16, color: "#FFFFFF", fontWeight: "bold" }}>Find Plants</Text>
      </Pressable>
    </View>
  );
}
