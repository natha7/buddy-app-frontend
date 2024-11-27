import {
  Text,
  Pressable,
  ActivityIndicator,
  Modal,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { postJournalEntryByUserAndPlantId } from "../app/utils/api";
import useUser from "../hooks/useUser";

export default function AddEntryBtn(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputs, setInputs] = useState({ notes: "", height: "" });
  const userId = useUser();
  const { plantId, setEntries } = props;

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

  function handleEntrySubmit() {
    postJournalEntryByUserAndPlantId(userId, plantId, {
      text: inputs.notes,
      height_entry_in_cm: inputs.height,
    }).then((newEntry) => {
      setEntries((currEntries) => {
        return [...currEntries, newEntry];
      });
      hideModal();
    });
  }

  return (
    <Pressable
      style={{
        height: 60,
        width: 120,
        borderRadius: 20,
        backgroundColor: "#ffeb99",
        borderWidth: 2,
        borderColor: "#ffe066",
      }}
      onPress={showModal}>
      <Text style={{ margin: "auto" }}>Add Entry</Text>
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <Pressable style={styles.modalBg} onPress={hideModal}>
          <View style={styles.modalLoader}>
            <ActivityIndicator size="large" color="#78A55A" />
          </View>
        </Pressable>
        <View style={styles.modalBox}>
          <View>
            <View style={{ marginBottom: 10 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <Text>Notes:</Text>
                <Pressable
                  style={{ position: "absolute", padding: 10, bottom: 0, left: 270 }}
                  onPress={hideModal}>
                  <Ionicons name="close" size={24} />
                </Pressable>
              </View>
              <TextInput
                onChangeText={(text) => {
                  setInputs(() => {
                    return { ...inputs, notes: text };
                  });
                }}
                value={inputs.notes}
                numberOfLines={8}
                multiline={true}
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  width: 300,
                  height: 100,
                }}></TextInput>
            </View>
            <View style={{ display: "flex", flexDirection: "row", alignSelf: "flex-end" }}>
              <Text>{"Height (cm)"}</Text>
              <TextInput
                value={inputs.height}
                style={{ width: 60, borderColor: "black", borderWidth: 1 }}
                onChangeText={(text) => {
                  text = text.replaceAll(/[^0-9]/g, "");
                  setInputs(() => {
                    return { ...inputs, height: text };
                  });
                }}></TextInput>
            </View>
          </View>

          <View style={styles.modalBtnContainer}>
            <Pressable style={styles.modalBtn} onPress={handleEntrySubmit}>
              <Text style={styles.modalBtnText}>Submit</Text>
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
    marginHorizontal: "auto",
    marginTop: 50,
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
    alignSelf: "flex-end",
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
