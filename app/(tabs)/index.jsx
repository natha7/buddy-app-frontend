import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { IdentifyPlant } from "../../app/utils/api.js";
import * as ImagePicker from "expo-image-picker";
import { convertImageToBase64 } from "../utils/imageConvertor.js";

export default function Homepage() {
  const [results, setResults] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = "0Gkz1cXnFXKCGskvhVyGxRc8sK8zNzHh8NZBVvL0TAiQBP1xM5";

  const pickImageAndIdentifyPlant = async () => {
    try {
      setIsLoading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        const uri = result.assets[0].uri;
        setSelectedImage(uri);

        const base64Image = await convertImageToBase64(uri);

        const plantDetailsResult = await IdentifyPlant(base64Image, apiKey);

        setResults(plantDetailsResult);
        console.log(plantDetailsResult, "<<<<line33 index plant detail");
      }
    } catch (error) {
      console.error("Error processing image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTopSuggestions = () => {
    if (!results?.result?.classification?.suggestions) return [];

    const sortedSuggestions = results.result.classification.suggestions.sort(
      (a, b) => b.probability - a.probability
    );

    return sortedSuggestions.slice(0, 3);
  };

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <Text
        style={{
          fontFamily: "Coustard_900Black",
          fontSize: 26,
          fontWeight: 600,
          marginTop: 30,
          color: "#78A55A",
          textAlign: "center",
          marginBottom: 20,
        }}>
        Identify Bud
      </Text>
      <ScrollView style={{ height: 200, width: "auto", marginVertical: 8, padding: 16 }}>
        <Pressable style={styles.button} onPress={pickImageAndIdentifyPlant}>
          <Text style={{ fontSize: 16, color: "#314C1C", fontWeight: 600 }}>Pick an image </Text>
        </Pressable>
        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
        {isLoading && (
          <View style={{ margin: "auto" }}>
            <ActivityIndicator size="large" color="#78A55A" />
            <Text>Identifying plants...</Text>
          </View>
        )}
        {results && (
          <View style={styles.results}>
            <Text style={styles.title}>Found your Buddy:</Text>
            <View>
              {getTopSuggestions().length > 0 ? (
                getTopSuggestions().map((suggestion, index) => (
                  <View
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      backgroundColor: "#78A55A33",
                      borderRadius: 20,
                      height: 120,
                      width: 330,
                      margin: "auto",
                      marginTop: 10,
                    }}>
                    <View
                      style={{
                        marginLeft: 8,
                        alignSelf: "center",
                      }}>
                      {suggestion.similar_images?.length > 0 ? (
                        <Image
                          source={{ uri: suggestion.similar_images[0].url }}
                          style={{ width: 100, height: 100, borderRadius: 8 }}
                        />
                      ) : (
                        <Image
                          source={{
                            uri: "https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                          }}
                          style={{ width: 100, height: 100, borderRadius: 8 }}
                        />
                      )}
                    </View>

                    <View style={{ marginVertical: "auto", flex: 1, marginLeft: 12 }}>
                      <Text
                        style={{
                          marginBottom: 1,
                          fontWeight: "600",
                          fontSize: 14,
                        }}>
                        Name: {suggestion.name}
                      </Text>
                      <Text>Confidence: {Math.round(suggestion.probability * 100)}%</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text>No suggestions found.</Text>
              )}
            </View>
            {/* <Text style={styles.details}>{JSON.stringify(results, null, 2)}</Text> */}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    height: 40,
    backgroundColor: "rgba(120, 165, 90, 0.5)",
    width: 330,
    marginHorizontal: "auto",
    marginTop: 10,
    justifyContent: "center",
    color: "#314C1C",
    borderRadius: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 16,
  },
  loading: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
  },
  results: {
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 15,
    color: "#314C1C",
  },
  details: {
    fontSize: 16,
  },
});
