import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Dimensions,
} from "react-native";
import React, { memo } from "react";

import { HStack, Stack } from "native-base";

import { Ionicons } from "@expo/vector-icons";
import { FONT } from "../../utils/theme";
const { width, height } = Dimensions.get("window");
const Navheader = ({ title, navigation, onChangeText, searchShow }) => {
  return (
    <Stack style={[searchShow && style.searchContainer]} mx={5} mt={3} mb={2}>
      <HStack direction={"row"} alignItems={"center"} space={5}>
        <Stack>
          <TouchableOpacity onPress={navigation}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
        </Stack>
        <Stack alignSelf={"flex-start"}>
          <Text
            style={{
              fontFamily: FONT.medium,
              fontSize: 18,
              marginTop: 2,
            }}
          >
            {title}
          </Text>
        </Stack>
      </HStack>
    </Stack>
  );
};
const style = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },

  topHeader: {
    height: 80,
  },
  inHead: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 25,
    left: 20,
  },
  textInput: {
    borderRadius: 8,
    // padding: 10,
    backgroundColor: "#eafcf7",
    // marginBottom: 10,
    borderWidth: 0,
    width: width,
  },
  textInputContainer: {
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  searchContainer: {
    paddingLeft: 20,
    padding: 10,
  },
});
export default memo(Navheader);
