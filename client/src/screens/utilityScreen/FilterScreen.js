import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Pressable,
  StatusBar,
} from "react-native";
import React, { useState, useCallback } from "react";
import Navheader from "../../components/navHeader/Navheader";
import { Center, HStack, Stack, VStack } from "native-base";
import { StyleSheet } from "react-native";
import { COLORS, FONT } from "../../utils/theme";
import { AntDesign } from "@expo/vector-icons";
import CommonButton from "../../components/common/button/CommonButton";
import {
  BOARD_CONSTANT,
  DISTANCE_CONSTANT,
  GENDER_CONSTANT,
  MEDIUM_CONSTANT,
  RATING_CONSTANT,
  POST_TYPE_CONSTANT,
} from "../../utils/filterConstant";
import { useDispatch, useSelector } from "react-redux";
import { UtilityAction } from "./redux/action";
const { width } = Dimensions.get("window");

const DISTANCE = [
  { id: "1234_xyz", name: "All", value: DISTANCE_CONSTANT.ALL },
  { id: "123544_xyz", name: "5 km to 10 km", value: DISTANCE_CONSTANT.TEN },
  { id: "23544_xyz", name: "10 km to 20 km", value: DISTANCE_CONSTANT.TWNENTY },
  { id: "12349_xyz", name: "20 km to 40 km", value: DISTANCE_CONSTANT.FOURTY },
  { id: "12345_xyz", name: "40 km +", value: DISTANCE_CONSTANT.FOURTY_PLUS },
];

const BOARD = [
  { id: "125_kkaa", name: "All", value: BOARD_CONSTANT.ALL },
  { id: "19925_kkaa", name: "STATE", value: BOARD_CONSTANT.STATE },
  { id: "12354_kkaa", name: "CBSE", value: BOARD_CONSTANT.CBSE },
  { id: "127_kkaa", name: "ICSE", value: BOARD_CONSTANT.ICSE },
];

const RATING = [
  {
    id: "4324_aal",
    name: "All",
    value: RATING_CONSTANT.ALL,
  },
  {
    id: "4394_aal",
    name: "1",
    value: RATING_CONSTANT.ONE,
    icon: <AntDesign name='star' size={18} />,
  },
  {
    id: "4624_aal",
    name: "2",
    value: RATING_CONSTANT.TWO,
    icon: <AntDesign name='star' size={18} />,
  },
  {
    id: "46P4_aal",
    name: "3",
    value: RATING_CONSTANT.THREE,
    icon: <AntDesign name='star' size={18} />,
  },
  {
    id: "46H4_aal",
    name: "4",
    value: RATING_CONSTANT.FOUR,
    icon: <AntDesign name='star' size={18} />,
  },
  {
    id: "46J4_aal",
    name: "5",
    value: RATING_CONSTANT.FIVE,
    icon: <AntDesign name='star' size={18} />,
  },
];

const POST_TYPE = [
  { id: "41234_asdf", name: "All", value: POST_TYPE_CONSTANT.ALL },
  {
    id: "4234_asdf",
    name: "Day Boarding",
    value: POST_TYPE_CONSTANT.DAY_BOARDING,
  },
  {
    id: "1234_asdf",
    name: "Boarding post",
    value: POST_TYPE_CONSTANT.BOARDING,
  },
];
const POST_MEDUIM = [
  { id: "323_asdf", name: "All", value: MEDIUM_CONSTANT.ALL },
  { id: "322_asdf", name: "English", value: MEDIUM_CONSTANT.ENGLISH },
  { id: "112314_asdf", name: "Hindi", value: MEDIUM_CONSTANT.HINDI },
];

const GENDER_STATUS = [
  { id: "12312_as", name: "All", value: GENDER_CONSTANT.ALL },
  { id: "12234232_as", name: "Female", value: GENDER_CONSTANT.FEMALE },
  { id: "12265232_as", name: "Male", value: GENDER_CONSTANT.MALE },
];

const FilterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedDist, setSelectedDist] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedRating, setSelectedrating] = useState("");
  const [selectedScType, setSelectedScType] = useState("");
  const [selectedMedium, setSelectedMedium] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const FILTER_DATA = {
    distance: selectedDist?.value === "ALL" ? undefined : selectedDist?.value,
    board: selectedBoard?.value === "ALL" ? undefined : selectedBoard?.value,
    rating: selectedRating?.value === "ALL" ? undefined : selectedRating?.value,
    type: selectedScType?.value === "ALL" ? undefined : selectedScType?.value,
    medium: selectedMedium?.value === "ALL" ? undefined : selectedMedium?.value,
    coedu: selectedGender?.value === "ALL" ? undefined : selectedGender?.value,
  };

  // Remove properties with undefined values
  const filteredData = Object.fromEntries(
    Object.entries(FILTER_DATA).filter(([_, value]) => value !== undefined),
  );

  const storeFilter = () => {
    dispatch(UtilityAction.storeFilterData(filteredData));
    navigation.navigate("Posts");
  };

  const resetFilter = () => {
    setSelectedDist("");
    setSelectedBoard("");
    setSelectedrating("");
    setSelectedScType("");
    setSelectedMedium("");
    setSelectedGender("");
  };

  const FilterComponents = React.memo(
    ({ title, data, selectedItem, setSelectedItem, filter }) => {
      const getDistance = useCallback(
        (item) => {
          setSelectedItem(item);
        },
        [setSelectedItem],
      );

      return (
        <Stack
          mt={5}
          style={{
            flex: 1,
            alignSelf: "stretch",
          }}>
          <Text
            style={{
              fontFamily: FONT.medium,
              fontSize: 18,
            }}>
            {title}
          </Text>
          <HStack flexWrap={"wrap"}>
            {data?.map((item) => {
              return (
                <Pressable
                  key={item.id}
                  style={[
                    style.buttons,
                    {
                      borderWidth: 1,
                      borderColor:
                        item.id === selectedItem.id
                          ? COLORS.verbBasePrimaryColor
                          : "white",
                      backgroundColor:
                        item.id === selectedItem.id
                          ? COLORS.verbBaseLighterColor
                          : "#F9F9F9",
                    },
                  ]}
                  onPress={() => getDistance(item)}>
                  <HStack
                    justifyContent={"center"}
                    alignItems={"center"}
                    space={1}>
                    <Text
                      style={{
                        fontSize: 15,
                        color:
                          item.id === selectedItem.id
                            ? COLORS.verbBasePrimaryColor
                            : "black",
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color:
                          item.id === selectedItem.id
                            ? COLORS.verbBasePrimaryColor
                            : "black",
                      }}>
                      {item?.icon}
                    </Text>
                  </HStack>
                </Pressable>
              );
            })}
          </HStack>
        </Stack>
      );
    },
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgoundAndStatusbar,
        alignSelf: "stretch",
      }}>
      <StatusBar
        networkActivityIndicatorVisible={true}
        animated={true}
        backgroundColor={COLORS.backgoundAndStatusbar}
        barStyle={"default"}
        showHideTransition={"fade"}
        hidden={false}
      />
      <Navheader title={"Filter"} navigation={() => navigation.goBack()} />

      <ScrollView
        style={[
          style.constainer,
          {
            flex: 1,
            alignSelf: "stretch",
          },
        ]}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            alignSelf: "stretch",
            marginBottom: 100,
          }}>
          <FilterComponents
            title={"Distance"}
            data={DISTANCE}
            selectedItem={selectedDist}
            setSelectedItem={setSelectedDist}
            filter={filteredData}
          />
          <FilterComponents
            title={"Board"}
            data={BOARD}
            selectedItem={selectedBoard}
            setSelectedItem={setSelectedBoard}
            filter={filteredData}
          />
          <FilterComponents
            title={"Rating"}
            data={RATING}
            selectedItem={selectedRating}
            setSelectedItem={setSelectedrating}
            filter={filteredData}
          />
          <FilterComponents
            title={"Post Type"}
            data={POST_TYPE}
            selectedItem={selectedScType}
            setSelectedItem={setSelectedScType}
            filter={filteredData}
          />
          <FilterComponents
            title={"Medium"}
            data={POST_MEDUIM}
            selectedItem={selectedMedium}
            setSelectedItem={setSelectedMedium}
            filter={filteredData}
          />
          <FilterComponents
            title={"Co-education status"}
            data={GENDER_STATUS}
            selectedItem={selectedGender}
            setSelectedItem={setSelectedGender}
            filter={filteredData}
          />
        </View>
      </ScrollView>
      <Center
        style={{
          ...(Platform.OS === "android"
            ? {
                alignSelf: "center",
                position: "absolute",
                bottom: 20,
              }
            : { position: "absolute", bottom: 10, alignSelf: "center" }),
        }}>
        <HStack space={5}>
          <CommonButton
            title={"Apply"}
            style={{
              width: width / 2.5,
              marginTop: 10,
              borderRadius: 10,
              backgroundColor: COLORS.verbBasePrimaryColor,
              height: 50,
            }}
            onPress={storeFilter}
          />
          <CommonButton
            title={"Reset"}
            style={{
              backgroundColor: COLORS.verbBaseLightColor,
              width: width / 2.5,
              marginTop: 10,
              borderRadius: 10,
              height: 50,
            }}
            onPress={resetFilter}
          />
        </HStack>
      </Center>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  constainer: {
    padding: 5,
    marginHorizontal: 15,
    flex: 1,
  },
  buttons: {
    backgroundColor: "#ECF8F9",
    padding: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default FilterScreen;
