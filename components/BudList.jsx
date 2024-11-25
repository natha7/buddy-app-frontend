import { ScrollView, Text, Pressable, View } from "react-native";
import BudCard from "./BudCard.jsx";
import SearchInputBar from "./SearchInputBar.jsx";
import AddYourOwnBtn from "./AddYourOwnBtn.jsx";
import { useCustomFonts } from "../hooks/useCustomFonts";
import { getAllPlants } from "../app/utils/api.js";
import { useEffect, useState } from "react";

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
    <View style={{ height: "100%" }}>
      <Text
        style={{
          fontFamily: "Coustard_900Black",
          fontSize: 26,
          fontWeight: 600,
          marginTop: 30,
          color: "#78A55A",
          marginLeft: 30,
        }}>
        Find a Bud
      </Text>
      <SearchInputBar
        placeholder_text={"Search for a new bud..."}
        setCurrBudSearch={setCurrBudSearch}
      />
      <ScrollView style={{ height: 200, width: "auto", marginVertical: 8 }}>
        <View>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : errorStatus === 404 || plants.length === 0 ? (
            <Text>No plants found</Text>
          ) : (
            plants.map((plant) => {
              return <BudCard key={plant._id} plantData={plant} />;
            })
          )}
        </View>
      </ScrollView>
      <AddYourOwnBtn />
    </View>
  );
}
