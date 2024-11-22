import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failMsg, setFailMsg] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    if (email === "martha" && password === "123456") {
      navigation.navigate("(tabs)");
      setFailMsg("");
    } else {
      setFailMsg("Login Failed, Invalid email or password");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#275c42", alignItems: "center" }}>
      <View style={{ marginTop: 100 }}>
        <Text
          style={{ fontSize: 55, fontFamily: "sans-serif", fontWeight: "600", color: "#e1aab0" }}>
          Buddy
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#fbeff5", fontSize: 16, fontWeight: "600", marginTop: 10 }}>
            Log in to your account
          </Text>
        </View>

        <View style={{ marginTop: 30 }}>
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