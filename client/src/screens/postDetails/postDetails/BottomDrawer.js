import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import BottomDrawer from "react-native-animated-bottom-drawer";
import { HStack, Stack, VStack } from "native-base";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { SIZES, COLORS, FONT } from "../../../utils/theme";
const { width, height } = Dimensions.get("window");

const BottomDrawerComponent = ({ onClose, draweriIsOpen }) => {
  const bottomDrawerRef = useRef(null);
  useEffect(() => {
    if (draweriIsOpen) {
      if (bottomDrawerRef.current) {
        bottomDrawerRef.current.open(600);
      }
    } else {
      bottomDrawerRef.current.close(0);
    }
  }, [draweriIsOpen]);
  const reviewloader = useSelector(
    (state) => state?.FindPostScreenReducer?.reviewloader,
  );
  const reviewdata = useSelector(
    (state) => state?.FindPostScreenReducer?.reviewdata,
  );
  const REVIEWS_DATA = reviewdata?.data?.reviews;

  return (
    <View style={[styles.container]}>
      <BottomDrawer onClose={onClose} ref={bottomDrawerRef} overDrag={true}>
        <View style={styles.contentContainer}>
          <Text
            style={{
              fontFamily: FONT.PoppinsMedium,
              fontSize: 20,
            }}>
            Comments
          </Text>

          {(REVIEWS_DATA?.length <= 0 || !REVIEWS_DATA) && (
            <VStack
              justifyContent={"center"}
              alignItems={"center"}
              height={500}
              space={3}>
              <Entypo
                name='emoji-sad'
                size={54}
                color={COLORS.verbBasePrimaryColor}
              />
              <Text
                style={{
                  fontFamily: FONT.medium,
                  fontSize: 20,
                }}>
                No comments found!
              </Text>
            </VStack>
          )}

          <View style={styles.scrollView}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.dynamicBox}>
              {REVIEWS_DATA?.map((item, i) => {
                return (
                  <HStack key={i} style={styles.reviewContainer} space={2}>
                    <View>
                      <Image
                        source={{
                          uri: "https://wallpaperaccess.com/full/317501.jpg",
                        }}
                        alt='Alternate Text'
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                        }}
                      />
                    </View>
                    <HStack
                      justifyContent={"space-between"}
                      flexGrow={1}
                      alignItems={"center"}>
                      <View>
                        <View
                          style={{
                            fontFamily: FONT.medium,
                            fontSize: 20,
                          }}>
                          <Text>{item?.user?.name}</Text>
                        </View>
                        <Stack
                          flexWrap={"nowrap"}
                          width={Platform.OS === "ios" ? 260 : 250}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: "grey",
                            }}>
                            {item?.comment}
                          </Text>
                        </Stack>
                      </View>
                      <HStack
                        alignItems={"center"}
                        alignSelf={"center"}
                        justifyContent={"center"}
                        justifyItems={"center"}
                        space={1}>
                        <Text>{item?.rating}</Text>
                        <View>
                          <AntDesign
                            key={i}
                            name='star'
                            size={14}
                            color='orange'
                          />
                        </View>
                      </HStack>
                    </HStack>
                  </HStack>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </BottomDrawer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    // flex: 1,
    // alignSelf: "stretch",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  reviewContainer: {
    padding: 6,
    borderRadius: 8,
    alignSelf: "stretch",
    marginVertical: 8,
    alignItems: "center",
  },
  scrollView: {
    marginTop: 10,
    height: Platform.OS === "ios" ? "65%" : "70%",
    alignSelf: "stretch",
  },
  dynamicBox: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

export default BottomDrawerComponent;
