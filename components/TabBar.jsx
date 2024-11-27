import { View, StyleSheet } from "react-native";
import { useLinkBuilder } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import { Ionicons } from "@expo/vector-icons";

<Ionicons name="flower-sharp" size={24} color="black" />;
<Ionicons name="camera-sharp" size={24} color="black" />;

function TabBar({ state, descriptors, navigation }) {
  const { buildHref } = useLinkBuilder();

  const icons = {
    // index: (props) => <Ionicons name="flower-sharp" size={28} color={props.color} />,
    index: (props) => <Ionicons name="camera-sharp" size={28} color={props.color} />,
    calendar: (props) => <Ionicons size={28} name="calendar" color={props.color} />,
    garden: (props) => <Ionicons size={28} name="leaf" color={props.color} />,
    finder: (props) => <Ionicons name="search" size={28} color={props.color} />,
  };

  const primaryColour = "#314C1C";
  const lightGreenColour = "#78A55A";

  return (
    <View style={styles.bar}>
      {state.routes.map((route, index) => {
        if (route.name === "(plants)") return;

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
            onLongPress={onLongPress}>
            {icons[route.name]({
              color: isFocused ? primaryColour : lightGreenColour,
            })}
            <Text style={{ color: isFocused ? primaryColour : lightGreenColour }}>{label}</Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    position: "relative",
    bottom: 0,
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingVertical: 15,
    borderRadius: 5,
    borderCurve: "circular",
    width: "auto",
    paddingLeft: 10,
    paddingRight: 10,
  },
  barItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabBar;
