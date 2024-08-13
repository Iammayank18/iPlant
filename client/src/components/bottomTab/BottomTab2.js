import React from "react";
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import { Ionicons, AntDesign, SimpleLineIcons } from "@expo/vector-icons";

import {
  MainScreen,
  ProfileScreen,
  SavedData,
  CityScreen,
} from "../../screens";
import { COLORS } from "../../utils/theme";

export default function BottomTab2({ navigation }) {
  const _renderIcon = (routeName, selectedTab) => {
    let icon = "";

    switch (routeName) {
      case "home":
        return (
          <AntDesign
            name={"home"}
            size={25}
            color={
              routeName === selectedTab ? COLORS.verbBasePrimaryColor : "gray"
            }
          />
        );

      case "saved":
        return (
          <AntDesign
            name={"hearto"}
            size={25}
            color={
              routeName === selectedTab ? COLORS.verbBasePrimaryColor : "gray"
            }
          />
        );
      case "discover":
        return (
          <SimpleLineIcons
            name='location-pin'
            size={25}
            color={
              routeName === selectedTab ? COLORS.verbBasePrimaryColor : "gray"
            }
          />
        );
      case "profile":
        return (
          <AntDesign
            name={"user"}
            size={25}
            color={
              routeName === selectedTab ? COLORS.verbBasePrimaryColor : "gray"
            }
          />
        );
    }

    // return (
    //   <AntDesign
    //     name={icon}
    //     size={25}
    //     color={routeName === selectedTab ? COLORS.verbBasePrimaryColor : "gray"}
    //   />
    // );
  };
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBarExpo.Navigator
      type='DOWN'
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      height={55}
      circleWidth={50}
      bgColor='white'
      initialRouteName='title1'
      borderTopLeftRight
      renderCircle={({ selectedTab, navigate }) => (
        <TouchableOpacity
          // style={styles.button}
          onPress={() => navigate("AddPost")}
          style={styles.btnCircleUp}>
          <Animated.View>
            <Ionicons name={"add"} color='white' size={36} />
          </Animated.View>
        </TouchableOpacity>
      )}
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <CurvedBottomBarExpo.Screen
        name='home'
        position='LEFT'
        component={MainScreen}
      />
      <CurvedBottomBarExpo.Screen
        name='saved'
        component={SavedData}
        position='LEFT'
      />
      <CurvedBottomBarExpo.Screen
        name='discover'
        component={CityScreen}
        position='RIGHT'
      />
      <CurvedBottomBarExpo.Screen
        name='profile'
        component={ProfileScreen}
        position='RIGHT'
      />
    </CurvedBottomBarExpo.Navigator>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: "#DDDDDD",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    backgroundColor: "transparent",
  },
  button: {
    flex: 1,
    justifyContent: "center",
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.verbBasePrimaryColor,
    bottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: "gray",
  },
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 30,
    height: 30,
  },
});
