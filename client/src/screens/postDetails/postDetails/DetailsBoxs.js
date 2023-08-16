import React, { useState, useRef, useEffect, memo } from "react";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { HStack, Stack, Avatar, VStack } from "native-base";
import { SIZES, COLORS, FONT } from "../../../utils/theme";
import _ from "lodash";

export const BasicDetailsBoxs = memo(
  ({ navigation, SCHOOL_DATA, BASIC_DATA, storeCoordinat }) => {
    return (
      <VStack
        // shadow={2}
        bgColor={"white"}
        borderRadius={10}
        mb={4}
        space={4}
      >
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <Text
            style={{
              fontFamily: FONT.PoppinsMedium,
              fontSize: 20,
            }}
          >
            {SCHOOL_DATA?.title}
          </Text>
          <HStack space={1} alignItems={"center"}>
            {BASIC_DATA?.avgRating && (
              <>
                <Text>{BASIC_DATA?.avgRating?.toFixed(1)}</Text>
                <AntDesign name="star" size={15} color="gold" />
              </>
            )}
          </HStack>
        </HStack>

        <VStack space={3}>
          <Text
            style={{
              color: COLORS.verbGray,
              fontFamily: FONT.PoppinsRegular,
              fontSize: 13,
            }}
          >
            {SCHOOL_DATA?.story}
          </Text>
        </VStack>
      </VStack>
    );
  }
);
