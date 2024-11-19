import { View, StyleSheet } from "react-native";
import { useLinkBuilder } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

function TabBar({ state, descriptors, navigation }) {
  const { buildHref } = useLinkBuilder();

  const icons = {
    index: (props) => <Ionicons name="home" size={28} color={props.color} />,
    calendar: (props) => (
      <Ionicons size={28} name="calendar" color={props.color} />
    ),
    garden: (props) => <Ionicons size={28} name="leaf" color={props.color} />,
    finder: (props) => <Ionicons name="search" size={28} color={props.color} />,
  };

  const primaryColour = "#02590F";
  const greyColour = "#808080";

  return (
    <View style={styles.bar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.name}
            style={styles.barItem}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {icons[route.name]({
              color: isFocused ? primaryColour : greyColour,
            })}
            <Text style={{ color: isFocused ? primaryColour : greyColour }}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    position: "absolute",
    bottom: 25,
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingVertical: 15,
    borderRadius: 5,
    borderCurve: "circular",
    width: "auto",
  },
  barItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabBar;
