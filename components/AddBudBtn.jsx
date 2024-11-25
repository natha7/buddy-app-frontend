import { Modal, Pressable, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { postBudToUserGarden } from "../app/utils/api";
import { useState } from "react";

export default function AddBudBtn(props) {
  const { plantNameAndId } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  function addPlantToUserGarden() {
    postBudToUserGarden(1, {
      common_name: plantNameAndId.common_name,
      plant_id: plantNameAndId.plant_id,
    }).then(() => {
      console.log("Plant successfully added to user garden");
      hideModal();
    });
  }

  function hideModal() {
    setIsModalVisible(() => {
      return false;
    });
  }

  function showModal() {
    setIsModalVisible(() => {
      return true;
    });
  }
  return (
    <Pressable
      style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 15 }}
      onPress={showModal}>
      <View style={{ height: "80%", width: 1.5, backgroundColor: "#314C1C", marginRight: 10 }} />
      <View style={{ marginVertical: "auto" }}>
        <AntDesign name="plus" size={24} color="#314C1C" />
        <Text style={{ color: "#314C1C", fontWeight: 600 }}>Add</Text>
      </View>
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            borderRadius: 20,
            height: 120,
            width: 330,
            margin: "auto",
          }}>
          <Text>{`Are you sure you'd like to add ${plantNameAndId.common_name} to your garden?`}</Text>
          <Pressable onPress={addPlantToUserGarden}>
            <View style={{ backgroundColor: "green" }}>
              <Text>Yes!</Text>
            </View>
          </Pressable>
          <Pressable onPress={hideModal}>
            <View style={{ backgroundColor: "red" }}>
              <Text>No!</Text>
            </View>
          </Pressable>
        </View>
      </Modal>
    </Pressable>
  );
}
