import {
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform,
  Dimensions,
  ActivityIndicator,
  TextInput,
} from "react-native";

import { Slide, Center } from "native-base";
import React, { memo, useState } from "react";
import Navheader from "../../components/navHeader/Navheader";
import { HStack, Stack } from "native-base";
import { Cities } from "../../utils/cities";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, FONT, SIZES } from "../../utils/theme";
import * as Location from "expo-location";
import SearchBar from "../../components/searchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { UtilityAction } from "./redux/action";
import { useRequest } from "ahooks";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}>
    <Text style={[styles.title, { color: textColor }]}>{item.name}</Text>
  </TouchableOpacity>
);

async function getEmail(search) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(search);
    }, 800);
  });
}

const BoardScreen = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState();
  const [loading1, setLoading] = useState(false);
  const [isOpenTop, setIsOpenTop] = useState(false);
  const [locMsg, SetLocMsg] = useState("");
  const [permissionGranted, setPermissionGranted] = useState(false);

  const { data, loading, run } = useRequest(getEmail, {
    debounceWait: 700,
    manual: true,
  });

  const filteredPost = Cities?.filter((item) =>
    item?.name.toLowerCase().includes(data?.toLowerCase()),
  );
  const dispatch = useDispatch();
  const cityData = useSelector((state) => state.utilityReducer);
  const userGeoadd = useSelector(
    (state) => state.utilityReducer.userGeoAddress,
  );

  const renderItem = React.useMemo(
    () =>
      ({ item }) => {
        const backgroundColor = item.id === selectedId ? "white" : "white";
        const color = item.id === selectedId ? "black" : "black";
        const selecItem = (item) => {
          setSelectedId(item.id);
          dispatch(UtilityAction.selectUserCity(item.name));
          navigation.goBack();
        };
        return (
          <Item
            item={item}
            onPress={() => selecItem(item)}
            backgroundColor={backgroundColor}
            textColor={color}
          />
        );
      },
    [selectedId],
  );

  const detectLocation = async () => {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();

    try {
      if (status !== "granted") {
        // Handle permission not granted
        setLoading(false);
        setIsOpenTop(true);
        setPermissionGranted(false);
        SetLocMsg("Unable to detect location");
        setTimeout(() => {
          setIsOpenTop(false);
        }, 1200);
      } else {
        const { coords } = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = coords;
        const geoAdd = await Location.reverseGeocodeAsync({
          longitude,
          latitude,
        });
        const CITY = geoAdd[0].city;
        const userGeoAddress = { ...geoAdd[0], latitude, longitude };

        if (coords && geoAdd.length > 0) {
          setLoading(false);
          setIsOpenTop(true);
          setPermissionGranted(true);
          SetLocMsg("Location detected");
          dispatch(UtilityAction.storeUserGeoAddress(userGeoAddress));
          dispatch(UtilityAction.selectUserCity(CITY));
          const jsonValue = JSON.stringify(userGeoAddress);
          await AsyncStorage.setItem("@coordinates", jsonValue);
          setTimeout(() => {
            setIsOpenTop(false);
            navigation.goBack();
          }, 1200);
        }
      }
    } catch (e) {
      setLoading(false);
      setIsOpenTop(true);
      setPermissionGranted(false);
      SetLocMsg("Unable to detect location");
      setTimeout(() => {
        setIsOpenTop(false);
      }, 1200);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.backgoundAndStatusbar }}>
      <StatusBar
        networkActivityIndicatorVisible={true}
        animated={true}
        backgroundColor={COLORS.backgoundAndStatusbar}
        barStyle={"dark-content"}
        showHideTransition={"fade"}
        hidden={false}
      />
      <Slide in={isOpenTop} placement='top'>
        <Center
          alignItems='center'
          justifyContent='center'
          py={4}
          style={{
            backgroundColor: permissionGranted ? "#a3f7c1" : "#fa4848",
          }}>
          <Text color='error.600' fontWeight='medium'>
            {locMsg}
          </Text>
        </Center>
      </Slide>

      <Navheader
        title={"Find your board"}
        navigation={() => navigation.goBack()}
      />

      <HStack
        justifyContent={"space-between"}
        space={2}
        width={width / 1.1}
        alignSelf={"center"}
        alignItems={"center"}
        mt={4}>
        <HStack style={styles.searchContainer}>
          <AntDesign name='search1' size={24} color={COLORS.gray2} />
          <TextInput
            placeholder={"Find your board"}
            onChangeText={(e) => run(e)}
            placeholderTextColor={COLORS.gray}
          />
        </HStack>
      </HStack>

      <FlatList
        data={filteredPost}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        initialNumToRender={10}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomColor: "#c8cccc",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: FONT.medium,
  },
  searchContainer: {
    borderColor: COLORS.verbGray3,
    backgroundColor: COLORS.verbGray3,
    flex: 1,
    padding: 10,
    borderRadius: 15,
    gap: 4,
    paddingLeft: 20,
    alignItems: "center",
  },
  filterContainer: {
    backgroundColor: COLORS.verbBasePrimaryColor,
    borderRadius: 15,
    padding: 12,
  },
  locationContainer: {
    padding: 10,
    borderRadius: 15,
    elevation: 10,
    shadowColor: "#899191",
    alignItems: "center",
  },
});
export default memo(BoardScreen);
