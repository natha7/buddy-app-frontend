import { ScrollView, Text, ActivityIndicator, View, Pressable } from "react-native";
import BudCard from "./BudCard.jsx";
import SearchInputBar from "./SearchInputBar.jsx";
import AddYourOwnBtn from "./AddYourOwnBtn.jsx";
import { useCustomFonts } from "../hooks/useCustomFonts";
import { getAllPlants } from "../app/utils/api.js";
import { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";

export default function BudList() {
  const fontsLoaded = useCustomFonts();
  const [plants, setPlants] = useState([]);
  const [currBudSearch, setCurrBudSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState(0);
  const [morePlants, setMorePlants] = useState(10);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPlants = () => {
    setIsLoading(true);
    setErrorStatus(0);
    getAllPlants(currBudSearch)
      .then((fetchedPlants) => {
        setPlants(fetchedPlants);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorStatus(err.response.status);
      });
  };

  useEffect(() => {
    fetchPlants();
  }, [currBudSearch]);

  const loadMorePlants = () => {
    if (loadingMore) return;
    setLoadingMore(true);

    getAllPlants(currBudSearch)
      .then((fetchedPlants) => {
        setPlants((prevPlants) => [
          ...prevPlants,
          ...fetchedPlants.slice(prevPlants.length, prevPlants.length + 10),
        ]);
        setMorePlants((prev) => prev + 10);
        setLoadingMore(false);
      })
      .catch(() => {
        setLoadingMore(false);
      });
  };

  if (!fontsLoaded) {
    return <View></View>;
  }
  return (
    <View style={{ height: "100%", alignItems: "center", marginBottom: 42 }}>
      <Text
        style={{
          fontFamily: "Coustard_900Black",
          fontSize: 26,
          marginTop: 30,
          color: "#78A55A",
          marginBottom: 20,
          textAlign: "center",
        }}>
        Find a Bud
      </Text>
      <SearchInputBar
        placeholder_text={"Search for a new bud..."}
        setCurrBudSearch={setCurrBudSearch}
      />
      <ScrollView
        style={{
          width: "100%",
          marginHorizontal: "auto",
          marginVertical: 8,
        }}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 120,
        }}
        onEndReached={loadMorePlants}
        onEndReachedThreshold={0.1}>
        {isLoading ? (
          <View
            style={{
              minHeight: "100%",
              minWidth: "100%",
            }}>
            <View style={{ margin: "auto" }}>
              <ActivityIndicator size="large" color="#78A55A" />
              <Text>Loading plants...</Text>
            </View>
          </View>
        ) : errorStatus === 404 || plants.length === 0 ? (
          <View
            style={{
              minHeight: "100%",
              minWidth: "100%",
            }}>
            <View style={{ margin: "auto", display: "flex", alignItems: "center" }}>
              <FontAwesome6 name="plant-wilt" size={26} color="#314C1C" />
              <Text>No plants found</Text>
            </View>
          </View>
        ) : (
          <View>
            {plants.slice(0, morePlants).map((plant) => {
              return <BudCard key={plant._id} plantData={plant} />;
            })}
          </View>
        )}
      </ScrollView>
      {morePlants < plants.length && (
        <Pressable
          onPress={loadMorePlants}
          style={{
            position: "absolute",
            bottom: 20,
            backgroundColor: "#78A55A",
            paddingHorizontal: 20,
            paddingVertical: 10,
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 20,
            marginTop: -100,
            marginBottom: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
          }}>
          <Text style={{ fontSize: 16, color: "#FFFFFF", fontWeight: "bold" }}>More Plants</Text>
        </Pressable>
      )}
      {/* <AddYourOwnBtn /> */}
    </View>
  );
}
