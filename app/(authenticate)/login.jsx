import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState, useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCustomFonts } from "../../hooks/useCustomFonts";
import { UserContext } from "@/contexts/UserContext.jsx";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failMsg, setFailMsg] = useState("");
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext);

  const handleLogin = () => {
    if (
      email.toLowerCase() === "martha" ||
      (email.toLowerCase() === "martha" && password === "123456")
    ) {
      setUser(() => {
        return 1;
      });
      navigation.navigate("(tabs)");
      setFailMsg("");
    }
    if (email.toLowerCase() === "alan" || (email.toLowerCase() === "alan" && password === "123")) {
      setUser(() => {
        return 2;
      });
      navigation.navigate("(tabs)");
      setFailMsg("");
    } else {
      setFailMsg("Login Failed, Invalid email or password");
    }
  };

  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return <View></View>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#275c42", alignItems: "center" }}>
      <View style={{ marginTop: 100, marginBottom: 50 }}>
        <Text
          style={{
            fontSize: 55,
            fontFamily: "Coustard_900Black",
            color: "#e1aab0",
            textAlign: "center",
          }}>
          Buddy
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text
            style={{
              color: "#fbeff8",
              fontSize: 16,
              fontWeight: "400",
            }}>
            Log in to your account
          </Text>
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#d0eedf",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 10,
            }}>
            <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="gray" />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
              }}
              placeholder="enter your email"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#d0eedf",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}>
            <AntDesign style={{ marginLeft: 8 }} name="lock1" size={24} color="gray" />
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
              }}
              placeholder="enter your password"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 12,
              justifyContent: "space-between",
            }}>
            <Text style={{ color: "#fbeff5" }}>Keep me logged in</Text>
            <Text style={{ color: "#e1aab0", fontWeight: "500" }}>Forgot Password</Text>
          </View>

          <View style={{ marginTop: 60 }} />

          <Pressable
            onPress={handleLogin}
            style={{
              width: 100,
              backgroundColor: "#e1aab0",
              padding: 15,
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
            }}>
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
              }}>
              Login
            </Text>
          </Pressable>
          {failMsg && (
            <Text
              style={{
                color: "#fbeff5",
                marginTop: 10,
                textAlign: "center",
              }}>
              {failMsg}
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({});
