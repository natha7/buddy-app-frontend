import { Text, View, Image, Pressable, TextInput } from "react-native";
import WaterGardenPlantBtn from "./WaterGardenPlantBtn.jsx";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import capitaliseWords from "./utils/capitaliseWords";
import ThirstBar from "./ThirstBar";
import { useState, useEffect } from "react";
import { changeGardenPlantNickname } from "@/app/utils/api.js";
import useUser from "@/hooks/useUser.jsx";

export default function GardenPlantCard(props) {
  const router = useRouter();
  const { userGarden, plantDetails, isEditMode } = props;
  const userId = useUser();
  const [isNicknameEditable, setIsNicknameEditable] = useState(false);
  const [nicknameInput, setNicknameInput] = useState(capitaliseWords(userGarden.nickname));

  const validWateringFrequency = plantDetails.watering_frequency_in_days || 7;

  const [thirstPercentage, setThirstPercentage] = useState(() => {
    const currentDate = new Date();
    const lastWateredDate = userGarden.last_watered ? new Date(userGarden.last_watered) : null;

    const elapsedDays = lastWateredDate
      ? Math.round((currentDate - lastWateredDate) / (1000 * 60 * 60 * 24))
      : validWateringFrequency;

    return Math.min((elapsedDays / validWateringFrequency) * 100, 100);
  });

  const handleWateringComplete = () => {
    setThirstPercentage(0);
  };

  const handlePress = () => {
    if (!isEditMode) {
      const gardenPlantId = userGarden.garden_plant_id;
      router.push(`/(tabs)/(plants)/${gardenPlantId}`);
    }
  };

  const toggleEditNickName = () => {
    setIsNicknameEditable((curr) => {
      return !curr;
    });
  };

  const submitNewName = () => {
    toggleEditNickName();
    changeGardenPlantNickname(userId, userGarden.garden_plant_id, nicknameInput).then(
      (newPlant) => {
        setNicknameInput(() => {
          return newPlant.nickname;
        });
      }
    );
  };

  useEffect(() => {
    if (!isEditMode)
      setIsNicknameEditable(() => {
        return false;
      });
  }, [isEditMode]);

  return (
    <Pressable onPress={handlePress}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#78A55A33",
          borderRadius: 20,
          height: 120,
          width: 330,
          margin: "auto",
          marginTop: 8,
        }}>
        {/* Plant Image Section */}
        <View
          style={{
            height: 75,
            width: 75,
            alignSelf: "center",
            marginLeft: 16,
            borderRadius: 10,
            backgroundColor: "grey",
          }}>
          <Image
            source={{ uri: plantDetails.default_image }}
            style={{
              height: "100%",
              width: "100%",
              alignSelf: "center",
              borderRadius: 10,
              borderColor: "#314C1C",
              borderWidth: 1,
            }}
          />
        </View>

        {/* Plant Details Section */}
        <View style={{ marginVertical: "auto", flex: 1, marginLeft: 12 }}>
          {isNicknameEditable && isEditMode ? (
            <TextInput
              onChangeText={(currText) => setNicknameInput(currText)}
              onSubmitEditing={submitNewName}
              value={nicknameInput}
              style={{
                marginBottom: 1,
                fontWeight: "600",
                fontSize: 14,
                backgroundColor: "white",
                width: "auto",
                borderWidth: 1,
                borderColor: "#D3D3D3",
              }}></TextInput>
          ) : (
            <Text
              onPress={toggleEditNickName}
              style={{
                marginBottom: 1,
                fontWeight: "600",
                fontSize: 14,
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {nicknameInput !== capitaliseWords(userGarden.nickname)
                ? nicknameInput
                : capitaliseWords(userGarden.nickname)}
              {isEditMode ? (
                <FontAwesome5 name="pencil-alt" size={14} color="black" style={{ marginLeft: 5 }} />
              ) : null}
            </Text>
          )}
          <Text
            style={{
              fontSize: 10,
              fontStyle: "italic",
              textAlign: "left",
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {capitaliseWords(plantDetails.common_name)}
          </Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12,
              alignItems: "center",
            }}>
            <ThirstBar thirstPercentage={thirstPercentage} />
          </View>
        </View>
        <WaterGardenPlantBtn
          plantDetails={plantDetails}
          gardenPlantId={userGarden.garden_plant_id}
          nickname={userGarden.nickname}
          onWaterComplete={handleWateringComplete}
        />
      </View>
    </Pressable>
  );
}
