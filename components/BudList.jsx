import { ScrollView, Text, ActivityIndicator, View } from "react-native";
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

  useEffect(() => {
    setErrorStatus(() => {
      return 0;
    });
    setIsLoading(() => {
      return true;
    });
    getAllPlants(currBudSearch)
      .then((fetchedPlants) => {
        setPlants(() => {
          return fetchedPlants;
        });
        setIsLoading(() => {
          return false;
        });
      })
      .catch((err) => {
        setIsLoading(() => {
          return false;
        });
        setErrorStatus(err.response.status);
      });
  }, [currBudSearch]);

  if (!fontsLoaded) {
    return <View></View>;
  }
  return (
    <View style={{ height: "100%", alignItems: "center", marginBottom: 100 }}>
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
        }}>
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
            {plants.map((plant) => {
              return <BudCard key={plant._id} plantData={plant} />;
            })}
          </View>
        )}
      </ScrollView>
      {/* <AddYourOwnBtn /> */}
    </View>
  );
}
