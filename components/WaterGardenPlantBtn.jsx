import { Modal, Pressable, StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { waterGardenPlant } from "../app/utils/api";
import { useState } from "react";

export default function WaterGardenPlantBtn(props) {
  const { plantDetails, gardenPlantId, nickname } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  function handleWaterGardenPlant() {
    setIsPosting(true);
    waterGardenPlant(1, gardenPlantId)
      .then(() => {
        setIsPosting(false);
        hideModal(); // Close the modal when the action is successful
      })
      .catch((err) => {
        setIsPosting(false);
        hideModal(); // Optionally close the modal on error, or handle the error state
      });
  }

  function hideModal() {
    setIsModalVisible(false); // Close the modal
  }

  function showModal() {
    setIsModalVisible(true); // Show the modal
  }

  return (
    <Pressable
      style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 15 }}
      onPress={showModal}>
      <View style={{ height: "80%", width: 1.5, backgroundColor: "#314C1C", marginRight: 10 }} />
      <View style={{ marginVertical: "auto" }}>
        <AntDesign name="plus" size={24} color="#314C1C" />
        <Text style={{ color: "#314C1C", fontWeight: "600" }}>Water</Text>
      </View>
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <Pressable style={styles.modalBg} onPress={hideModal}>
          {isPosting && (
            <View style={styles.modalLoader}>
              <ActivityIndicator size="large" color="#78A55A" />
              <Text>Watering your plant...</Text>
            </View>
          )}
        </Pressable>
        <View style={styles.modalBox}>
          <Image
            source={{ uri: plantDetails.default_image }}
            style={{
              height: "35%",
              width: "35%",
              borderRadius: 10,
              borderColor: "#314C1C",
              borderWidth: 1,
            }}
          />
          <Text style={styles.modalText}>{`Would you like to water ${nickname}?`}</Text>
          <View style={styles.modalBtnContainer}>
            <Pressable
              style={[styles.modalBtn, { opacity: isPosting ? 0.5 : 1 }]}
              onPress={handleWaterGardenPlant}
              disabled={isPosting}>
              <Text style={styles.modalBtnText}>Yes</Text>
            </Pressable>
            <Pressable
              style={[styles.modalBtn, { opacity: isPosting ? 0.5 : 1 }]}
              onPress={hideModal}
              disabled={isPosting}>
              <Text style={styles.modalBtnText}>No</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  modalBtn: {
    backgroundColor: "#78A55A33",
    width: "30%",
    borderColor: "#314C1C",
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 12,
  },
  modalLoader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    alignItems: "center",
  },
  modalBg: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 5,
    backgroundColor: "black",
    opacity: 0.6,
  },
  modalBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    height: 330,
    width: 330,
    margin: "auto",
    zIndex: 100,
  },
  modalText: {
    marginHorizontal: "20%",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Coustard",
    color: "#314C1C",
  },
  modalBtnContainer: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 10,
    justifyContent: "space-evenly",
  },
  modalBtnText: {
    fontFamily: "Coustard",
    fontSize: 18,
    margin: "auto",
    color: "#314C1C",
  },
});
