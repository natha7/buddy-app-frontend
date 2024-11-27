import { useState } from "react";
import { Text, Pressable, Modal, StyleSheet, View, ActivityIndicator } from "react-native";
import capitaliseWords from "./utils/capitaliseWords";
import { deletePlantByUserIdAndPlantId } from "../app/utils/api";
import { useRouter } from "expo-router";

export default function DeletePlantBtn(props) {
  const { userAndPlantId, plantInfo } = props;
  const { userId, gardenPlantId } = userAndPlantId;
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  function removePlantFromGarden() {
    deletePlantByUserIdAndPlantId(userId, gardenPlantId).then(() => {
      hideModal();
      router.push("garden");
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
      style={{
        backgroundColor: "#FAA0A0",
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
      }}
      onPress={showModal}>
      <Text style={{ fontSize: 16, color: "#FFFFFF", fontWeight: 600 }}>Delete Plant</Text>
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <Pressable style={styles.modalBg} onPress={hideModal}>
          <View style={styles.modalLoader}>
            <ActivityIndicator size="large" color="#78A55A" />
          </View>
        </Pressable>
        <View style={styles.modalBox}>
          <Text
            style={
              styles.modalText
            }>{`Are you sure you'd like to remove ${plantInfo.nickname} from your garden?`}</Text>
          <View style={styles.modalBtnContainer}>
            <Pressable style={styles.modalBtn} onPress={removePlantFromGarden}>
              <Text style={styles.modalBtnText}>Yes</Text>
            </Pressable>
            <Pressable style={styles.modalBtn} onPress={hideModal}>
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
    paddingVertical: 15,
    marginHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  modalLoader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -12.5 }, { translateY: -12.5 }],
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
    color: "#314C1C",
    textAlign: "center",
  },
  modalImage: {
    height: 150,
    width: 150,
    borderRadius: 10,
    borderColor: "#314C1C",
    borderWidth: 1,
  },
});
