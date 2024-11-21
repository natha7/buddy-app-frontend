import { ScrollView, Text, Pressable, View } from "react-native";
import BudCard from "./BudCard.jsx";
import SearchInputBar from "./SearchInputBar.jsx";
import AddYourOwnBtn from "./AddYourOwnBtn.jsx";
import { useFonts, Coustard_400Regular, Coustard_900Black } from "@expo-google-fonts/coustard";

export default function BudList() {
  let [fontsLoaded] = useFonts({
    Coustard_400Regular,
    Coustard_900Black,
  });

  if (!fontsLoaded) {
    return <View></View>;
  } else {
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
        <SearchInputBar placeholder_text={"Search for a new bud..."} />
        <ScrollView style={{ height: 200, width: "auto", marginVertical: 8 }}>
          <View>
            <BudCard
              img_url={
                "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
              common_name={"Derek"}
              latin_name={"Derekius Maximus"}
              cycle={"Perennial"}
              sunlight={"full sun"}
              watering_frequency={7}
            />
            <BudCard
              img_url={
                "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
              common_name={"Rose"}
              latin_name={"Rosus"}
              cycle={"Perennial"}
              sunlight={"part shade"}
              watering_frequency={3}
            />
            <BudCard
              img_url={
                "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
              common_name={"Tulip"}
              latin_name={"Tulipeseus"}
              cycle={"Annual"}
              sunlight={"full sun"}
              watering_frequency={2}
            />
            <BudCard
              img_url={
                "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
              common_name={"Phil"}
              latin_name={"Philo"}
              cycle={"Biennial"}
              sunlight={"part shade"}
              watering_frequency={null}
            />
          </View>
        </ScrollView>
        <AddYourOwnBtn />
      </View>
    );
  }
}
