import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { memo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Stack, HStack, Image, VStack } from "native-base";
import { useSelector } from "react-redux";
import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import { COLORS, FONT } from "../../utils/theme";

const { width, height } = Dimensions.get("window");
const Header = ({
  nearbyNavigation,
  toratedNavigation,
  featuredNavigation,
  viewAllNavigation,
}) => {
  const navigation = useNavigation();
  const cityData = useSelector((state) => state.utilityReducer.slectedCity);
  const geoAddress = useSelector(
    (state) => state.utilityReducer.userGeoAddress
  );

  return (
    <>
      <Stack
        mt={4}
        pb={2}
        px={4}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <HStack>
          <Text
            style={{
              color: COLORS.gray,
              fontSize: 30,
              fontFamily: FONT.PoppinsBold,
            }}
          >
            iPlant
          </Text>
          <Image
            source={require("../../assets/leaf.png")}
            alt="Alternate Text"
            style={{
              width: 25,
              height: 25,
            }}
          />
        </HStack>
        <TouchableOpacity onPressIn={() => navigation.navigate("MapView")}>
          <AntDesign
            name="earth"
            size={24}
            color={COLORS.verbBasePrimaryColor}
          />
        </TouchableOpacity>
      </Stack>

      <HStack space={2} ml={5} mt={1} mb={2} width={width / 1.1}>
        <TouchableOpacity
          style={[
            style.categoryButton,
            {
              backgroundColor: COLORS.verbBasePrimaryColor,
              shadowColor: COLORS.verbGray2,
              shadowOffset: {
                width: 3,
                height: 5,
              },
              shadowOpacity: 0.3,
              shadowRadius: 12,
              elevation: 5,
            },
          ]}
          onPress={nearbyNavigation}
        >
          <HStack space={2} alignItems={"center"}>
            <FontAwesome5 name="location-arrow" size={14} color="white" />
            <Text
              style={[
                style.categoryText,
                {
                  color: "white",
                },
              ]}
            >
              Nearby
            </Text>
          </HStack>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.categoryButton]}
          onPress={toratedNavigation}
        >
          <Text style={style.categoryText}>Top planters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.categoryButton}
          onPress={featuredNavigation}
        >
          <Text style={style.categoryText}>Recent</Text>
        </TouchableOpacity>
      </HStack>
    </>
  );
};

const style = StyleSheet.create({
  categoryButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
    borderRadius: 20,
    paddingHorizontal: 13,
    backgroundColor: "white",
    shadowColor: COLORS.verbGray2,
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 10,
  },
  categoryText: {
    color: "#ADADAD",
    fontFamily: FONT.medium,
  },
  searchBarText: {
    color: COLORS.gray,
    fontFamily: FONT.PoppinsRegular,
  },
  searchContainer: {
    borderColor: COLORS.verbGray3,
    backgroundColor: COLORS.verbGray3,
    padding: 10,
    borderRadius: 15,
    gap: 4,
    paddingLeft: 20,
    alignItems: "center",
  },
});

export default memo(Header);
