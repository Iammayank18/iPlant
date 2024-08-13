import React, { memo } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Text } from "react-native";
import { HStack, VStack } from "native-base";
import { COLORS, FONT } from "../../../utils/theme";
import _ from "lodash";

export const BasicDetailsBoxs = memo(
  ({ navigation, POST_DATA, BASIC_DATA, storeCoordinat }) => {
    return (
      <VStack bgColor={"white"} borderRadius={10} mb={4} space={4}>
        <HStack
          justifyContent={"space-between"}
          alignItems={"center"}
          space={1}>
          <Text
            style={{
              color: COLORS.verbGray,
              fontFamily: FONT.PoppinsMedium,
              width: 320,
              fontSize: 16,
            }}>
            {POST_DATA?.title}
          </Text>
          <HStack space={1} alignItems={"center"}>
            {BASIC_DATA?.avgRating && (
              <>
                <Text>{BASIC_DATA?.avgRating?.toFixed(1)}</Text>
                <AntDesign name='star' size={15} color='gold' />
              </>
            )}
          </HStack>
        </HStack>

        <VStack space={3}>
          <Text
            style={{
              color: COLORS.verbGray,
              fontFamily: FONT.PoppinsBold,
              fontSize: 16,
            }}>
            Story
          </Text>
          <Text
            style={{
              color: COLORS.verbGray,
              fontFamily: FONT.PoppinsRegular,
              fontSize: 13,
            }}>
            {POST_DATA?.story}
          </Text>
        </VStack>
      </VStack>
    );
  },
);
