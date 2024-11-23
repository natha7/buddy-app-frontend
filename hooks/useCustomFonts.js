import { useFonts, Coustard_400Regular, Coustard_900Black } from "@expo-google-fonts/coustard";

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    Coustard_400Regular,
    Coustard_900Black,
  });

  return fontsLoaded;
};
