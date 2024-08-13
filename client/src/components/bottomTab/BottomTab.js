import { Dimensions } from "react-native";
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Ionicons } from "@expo/vector-icons";
import { MainScreen, ProfileScreen, SavedData } from "../../screens";

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: "row" }}>
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
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}>
            <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const Tab = createMaterialBottomTabNavigator();

function BottomTab({ navigation }) {
  return (
    <Tab.Navigator
      // initialRouteName="Home"
      activeColor='black'
      inactiveColor='#3e2465'
      barStyle={{
        backgroundColor: "white",
      }}
      tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen
        name='Home'
        component={MainScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <Ionicons name='home' size={24} color='black' />
            ) : (
              <Ionicons name='home-outline' size={24} color='black' />
            );
          },
        }}
      />

      <Tab.Screen
        name='Saved'
        component={SavedData}
        options={{
          tabBarLabel: "Saved",
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <FontAwesome name='bookmark' size={24} color='black' />
            ) : (
              <FontAwesome name='bookmark-o' size={24} color='black' />
            );
          },
        }}
      />

      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <FontAwesome name='user' size={24} color='black' />
            ) : (
              <FontAwesome name='user-o' size={24} color='black' />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
