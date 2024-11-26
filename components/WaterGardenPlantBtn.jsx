import { Modal, Pressable, StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { waterGardenPlant } from "../app/utils/api";
import { useState } from "react";

export default function WaterGardenPlantBtn(props) {
  const { plantDetails } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  function waterGardenPlant() {
    setIsPosting(() => {
      return true;
    });
    waterGardenPlant(1, plantDetails.garden_plant_id) // update userId with useContext and check
      .then(() => {
        setIsPosting(() => {
          return false;
        });
        hideModal();
      })
      .catch((err) => {
        setIsPosting(() => {
          return false;
        });
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
        <Pressable style={styles.modalBg} onPress={hideModal}>
          {isPosting ? (
            <View style={styles.modalLoader}>
              <ActivityIndicator size="large" color="#78A55A" />
              <Text>Watering your plant...</Text>
            </View>
          ) : null}
        </Pressable>
        <View style={styles.modalBox}>
          <Image
            src={plantDetails.img_url}
            style={{
              height: "35%",
              width: "35%",
              borderRadius: 10,
              borderColor: "#314C1C",
              borderWidth: 1,
            }}
          />
          <Text
            style={
              styles.modalText
            }>{`Would you like to water ${plantDetails.common_name} in your garden?`}</Text>
          <View style={styles.modalBtnContainer}>
            <Pressable style={styles.modalBtn} onPress={waterGardenPlant} disabled={isPosting}>
              <Text style={styles.modalBtnText}>Yes</Text>
            </Pressable>
            <Pressable style={styles.modalBtn} onPress={hideModal} disabled={isPosting}>
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
    backgroundColor: "green",
    backgroundColor: "#78A55A33",
    width: "30%",
    border: "2px",
    borderColor: "#314C1C",
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
    marginHorizontal: 12,
  },
  modalLoader: { position: "relative", top: "80%" },
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
    justifyContent: "space-evenly",
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
