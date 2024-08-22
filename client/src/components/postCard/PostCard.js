import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import React, { memo } from "react";
import { Image, Stack, HStack } from "native-base";

import AntDesign from "react-native-vector-icons/AntDesign";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONT, SIZES } from "../../utils/theme";
const { width, height } = Dimensions.get("window");

const PostCard = ({
  city,
  like,
  comments,
  getPostDetails,
  styles,
  imagewidth,
  image,
  story,
  title,
  user,
  profile_pic,
  state,
  area,
}) => {
  return (
    <Stack
      style={{
        // width: width / 1.09,
        alignSelf: "center",
        margin: 10,
        marginBottom: 4,
      }}>
      <TouchableOpacity style={[styles]} onPress={getPostDetails}>
        <HStack space={2} py={1} alignItems={"center"} mb={2}>
          <Stack
            p={1}
            borderWidth={2}
            borderRadius={50}
            borderColor={COLORS.verbBasePrimaryColor}>
            <Image
              source={{
                uri:
                  profile_pic || "https://wallpaperaccess.com/full/317501.jpg",
              }}
              style={{
                width: 35,
                height: 35,
                borderRadius: 100,
              }}
              alt='user image'
            />
          </Stack>
          <Stack>
            <HStack space={3}>
              <Text
                style={{
                  fontFamily: FONT.PoppinsMedium,
                }}>
                {user?.name}
              </Text>
              <Stack
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                }}>
                <Text
                  style={{
                    fontFamily: FONT.PoppinsRegular,
                    backgroundColor: COLORS.verbBasePrimaryColor,
                    color: "white",
                    padding: 2,
                    paddingHorizontal: 10,
                  }}>
                  Top Planter
                </Text>
              </Stack>
            </HStack>
            <Text
              style={{
                fontFamily: FONT.PoppinsRegular,
                color: COLORS.verbGray,
                marginTop: Platform.OS == "ios" ? -2 : -4,
              }}>
              {city}
            </Text>
          </Stack>
        </HStack>
        <ImageBackground
          source={{
            uri: image,
          }}
          resizeMode='cover'
          style={{
            flex: 1,
            height: 210,
            width: imagewidth,
            borderRadius: 10,
            overflow: "hidden", // clip the border radius
          }}>
          <Stack
            style={{
              paddingHorizontal: 15,
              marginTop: 10,
            }}
            direction={"row"}
            justifyContent={"space-between"}>
            {/* any content */}
          </Stack>
        </ImageBackground>

        <HStack space={3} mt={2}>
          <HStack space={1} alignItems={"center"}>
            <AntDesign
              name='heart'
              size={20}
              color={COLORS.verbBasePrimaryColor}
            />
            <Text
              style={{
                fontFamily: FONT.PoppinsMedium,
                fontSize: 15,
              }}>
              {like > 100 ? `${like / 1000}k` : like}
            </Text>
          </HStack>
          <HStack space={1} alignItems={"center"}>
            <MaterialIcons
              name='mode-comment'
              size={20}
              color={COLORS.verbBasePrimaryColor}
            />
            <Text
              style={{
                fontFamily: FONT.PoppinsMedium,
                fontSize: 15,
              }}>
              {comments > 100 ? `${comments / 1000}k` : comments}
            </Text>
          </HStack>
        </HStack>

        <Stack width={width / 1.2} mt={2}>
          <Text
            style={{
              fontFamily: FONT.PoppinsMedium,
              fontSize: 15,
            }}>
            {title}
          </Text>
          <Text
            style={{
              textAlign: "left",
              color: COLORS.verbGray,
              marginVertical: 5,
            }}
            numberOfLines={2}>
            {story}
          </Text>
        </Stack>
      </TouchableOpacity>
    </Stack>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    // Shadow properties for iOS
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      // Elevation property for Android
      android: {
        elevation: 10,
      },
    }),
  },
  cardTitle: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: FONT.medium,
    width: 200,
  },
  class: {
    fontSize: 13,
    // fontWeight: 500,
    marginTop: 3,
    fontFamily: FONT.medium,
  },
  location: {
    marginTop: 5,
    textAlign: "left",
  },
  cardInside: {
    flexDirection: "row",
    width: width - 70,
    justifyContent: "space-between",
    flexGrow: 1,
    gap: 2,
  },
  cardImage: {
    borderRadius: 8,
    alignItems: "flex-start",
  },
  rating: {
    flexDirection: "row",
    marginTop: 8,
  },
  distance: {
    position: "absolute",

    backgroundColor: "#FFFFFF",
    zIndex: 1,
    padding: 4,
    borderRadius: 50,
    paddingHorizontal: 10,
    right: 30,
    bottom: 110,
  },
});

export default memo(PostCard);
