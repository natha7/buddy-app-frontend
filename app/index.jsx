import React from "react";
import { Redirect } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const index = () => {
  // return <Redirect href="/login" options={{ headerShown: false }} />;
  return <Redirect href="/(tabs)" options={{ headerShown: false }} />;
};

export default index;

const styles = StyleSheet.create({});
