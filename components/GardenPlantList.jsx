import { ScrollView, Text, Pressable, View, TextInput, ActivityIndicator } from "react-native";
import GardenPlantCard from "./GardenPlantCard.jsx";
import SearchInputBar from "./SearchInputBar.jsx";
import { useFonts, Coustard_400Regular, Coustard_900Black } from "@expo-google-fonts/coustard";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import filter from "lodash.filter";
import { useNavigation } from "@react-navigation/native";
// import {getUserGardenByUserId} from "../app/apiCall.jsx"
// import api from "../app/apiCall.jsx";

export default function GardenPlantList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userGardenList, setUserGardenList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { user_id = 1 } = route.params || {};

  const fetchUserGardenList = async (user_id) => {
    try {
      const response = await axios.get(
        `https://buddy-app-backend.onrender.com/api/user_gardens/${user_id}`
      );
      const data = response.data;

      if (data && data.userGarden && data.userGarden.user_plants) {
        const userPlants = data.userGarden.user_plants;
        const userPlantsExtra = await Promise.all(
          userPlants.map(async (userPlant) => {
            try {
              const plantResponse = await axios.get(
                `https://buddy-app-backend.onrender.com/api/plants/${userPlant.plant_id}`
              );
              const extraPlantData = plantResponse.data;

              return { ...userPlant, plantDetails: extraPlantData };
            } catch (err) {
              console.error(`Error fetching plant data for plant_id ${userPlant.plant_id}:`, err);
              return userPlant;
            }
          })
        );
        setUserGardenList(userPlantsExtra);
        console.log(userPlantsExtra, "<<< Fetched data from both APIs");
        setFullData(userPlantsExtra);
      } else {
        console.error("Unexpected API response format:", data);
      }
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.error("Error fetching user garden:", error.message || error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (user_id) {
      fetchUserGardenList(user_id);
    }
  }, [user_id]);

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
        <ActivityIndicator size={"large"} color="#5500dc" />
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

  // let [fontsLoaded] = useFonts({
  //   Coustard_400Regular,
  //   Coustard_900Black,
  // });

  // if (!fontsLoaded) {
  //   return <View></View>;
  // } else {
  return (
    <>
      <Text
        style={{
          fontFamily: "Coustard_900Black",
          fontSize: 26,
          fontWeight: 600,
          marginTop: 30,
          color: "#78A55A",
          marginLeft: 30,
        }}>
        Your Garden:
      </Text>
      {/* <SearchInputBar placeholder_text={"Search Plants..."} clear/> */}
      <TextInput
        placeholder="Search Plants..."
        clearButtonMode="always"
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderColor: "grey",
          borderWidth: 1,
          borderRadius: 8,
          width: 300,
          marginLeft: 34,
          backgroundColor: "#f6ddcc",
        }}
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
      />
      <ScrollView style={{ height: "auto", width: "auto", margin: "auto" }}>
        {userGardenList.map((userGarden) => (
          <GardenPlantCard
            key={userGarden._id}
            userGarden={userGarden}
            plantDetails={userGarden.plantDetails}
          />
        ))}
      </ScrollView>
      {/* <GardenPlantCard nickName={"Dave"} thirstiness={1} commonName={"Basil"} />
          <GardenPlantCard nickName={"Nathan"} thirstiness={2} commonName={"Sunflower"} />
          <GardenPlantCard nickName={"Sue"} thirstiness={3} commonName={"Rose"} /> */}

      <Pressable
        onPress={() =>
          navigation.navigate("(tabs)", {
            screen: "finder",
          })
        }
        style={{
          display: "flex",
          backgroundColor: "#f6ddcc",
          width: 110,
          padding: 10,
          alignItems: "center",
          marginLeft: 250,
          borderRadius: 10,
          marginTop: 30,
        }}>
        <Text style={{ fontSize: 16, color: "#314C1C" }}>Find Plants</Text>
      </Pressable>
    </>
  );
}
