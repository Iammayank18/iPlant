import React, { useState, useEffect, useCallback } from "react";
import { Text, Spinner, HStack, Center, Stack } from "native-base";
import {
  StatusBar,
  RefreshControl,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import Header from "../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { MainScreenAction } from "./redux/action";
import { COLORS, FONT } from "../../utils/theme";
import { FindSchoolScreenAction } from "../postDetails/redux/action";
import SchoolCard from "../../components/postCard/PostCard";
import * as Location from "expo-location";
import { UtilityAction } from "../utilityScreen/redux/action";
const { width, height } = Dimensions.get("window");

const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  let homepageschool = useSelector(
    (state) => state.MainScreenReducer.homepageschool
  );
  let homepageschoolLoader = useSelector(
    (state) => state.MainScreenReducer.homepageschoolloader
  );
  const cityData = useSelector((state) => state.utilityReducer?.slectedCity);

  const selectUser = useSelector((state) => state?.mainreducer?.Login);
  let coordinate = useSelector(
    (state) => state?.utilityReducer?.userGeoAddress
  );

  useEffect(() => {
    dispatch(
      MainScreenAction.fetchHomePageSchools({
        city: cityData,
        ...(Object.keys(coordinate).length > 0
          ? { latitude: coordinate.latitude, longitude: coordinate.longitude }
          : {}),
      })
    );
  }, [cityData]);

  function getSchools(dest, name, id) {
    const destination = {
      latitude: dest?.coordinates[0],
      longitude: dest?.coordinates[1],
    };

    console.log({
      location: id,
      lat: coordinate?.latitude,
      lng: coordinate?.longitude,
      user: selectUser?.data?.data?._id,
    });

    navigation.navigate("postDetails", {
      id: Math.random() * 100,
      destination: destination,
    });

    dispatch(
      FindSchoolScreenAction.FetchSchoolById({
        location: id,
        lat: coordinate?.latitude,
        lng: coordinate?.longitude,
        user: selectUser?.data?.data?._id,
      })
    );
  }

  const onRefresh = () => {
    dispatch(
      MainScreenAction.fetchHomePageSchools({
        city: cityData,
        ...(coordinate
          ? { latitude: coordinate.latitude, longitude: coordinate.longitude }
          : {}),
      })
    );
    // dispatch(MainScreenAction.fetchHomePageSchools({}));
  };

  const detectLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    try {
      if (status === "granted") {
        const { coords } = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = coords;
        const geoAdd = await Location.reverseGeocodeAsync({
          longitude,
          latitude,
        });
        const CITY = geoAdd[0].city;
        const userGeoAddress = { ...geoAdd[0], latitude, longitude };
        const jsonValue = JSON.stringify(userGeoAddress);
        dispatch(UtilityAction.storeUserGeoAddress(userGeoAddress));
        dispatch(UtilityAction.selectUserCity(CITY));
        await AsyncStorage.setItem("@coordinates", jsonValue);
      }
    } catch (e) {}
  };

  useEffect(() => {
    detectLocation();
  }, []);

  if (homepageschoolLoader) {
    return (
      <HStack
        space={3}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.backgoundAndStatusbar,
        }}
      >
        <StatusBar
          networkActivityIndicatorVisible={true}
          animated={true}
          backgroundColor={COLORS.backgoundAndStatusbar}
          barStyle={"dark-content"}
          showHideTransition={"fade"}
          hidden={false}
        />
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Loading
        </Text>
        <Spinner size="lg" />
      </HStack>
    );
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.verbScreenBG,
        flex: 1,
      }}
    >
      <StatusBar
        networkActivityIndicatorVisible={true}
        animated={true}
        backgroundColor={COLORS.backgoundAndStatusbar}
        barStyle={"dark-content"}
        showHideTransition={"fade"}
        hidden={false}
      />

      <Header
        nearbyNavigation={() => {
          dispatch(
            MainScreenAction.fetchSchoolsByRouteQuery({
              key: "nearby",
              city: cityData,
              lat: coordinate?.latitude,
              lng: coordinate?.longitude,
            })
          );
          navigation.navigate("ViewAllScreen", {
            name: "Nearby",
            key: "nearby",
          });
        }}
        toratedNavigation={() => {
          dispatch(
            MainScreenAction.fetchSchoolsByRouteQuery({
              key: "toprated",
              city: cityData,
            })
          );
          navigation.navigate("ViewAllScreen", {
            name: "Top planters",
            key: "toprated",
          });
        }}
        featuredNavigation={() => {
          dispatch(
            MainScreenAction.fetchSchoolsByRouteQuery({
              key: "recent",
              city: cityData,
            })
          );
          navigation.navigate("ViewAllScreen", {
            name: "Recent",
            key: "recent",
          });
        }}
        viewAllNavigation={() => navigation.navigate("Schools")}
      />

      {homepageschool?.length <= 0 && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={homepageschoolLoader}
              onRefresh={onRefresh}
            />
          }
        >
          <Center>
            <Image
              source={require("../../assets/notfound34.png")}
              style={{
                width: 300,
                height: 300,
              }}
            />

            <Text
              style={{
                fontSize: 20,
                color: COLORS.verbGray,
                fontFamily: FONT.PoppinsMedium,
              }}
            >
              No data found
            </Text>
            <Stack mt={2}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SelectCity");
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    padding: 4,
                    paddingHorizontal: 10,
                    fontFamily: FONT.medium,
                    color: COLORS.primaryColor,
                  }}
                >
                  Change preferences
                </Text>
              </TouchableOpacity>
            </Stack>
          </Center>
        </ScrollView>
      )}

      {homepageschool?.length > 0 && (
        <Center
          mb={5}
          style={{
            flex: 1,
          }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                onRefresh={onRefresh}
                refreshing={homepageschoolLoader}
              />
            }
            onRefresh={onRefresh}
            contentContainerStyle={{ paddingBottom: 50 }}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                marginHorizontal: 10,
              }}
            >
              <HStack
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: Platform.OS === "ios" ? width / 1.1 : width / 1.1,
                  height: 120,
                  backgroundColor: "#EFFDEB",
                  alignSelf: "center",
                  borderRadius: 20,
                }}
                space={Platform.OS === "ios" ? 5 : 3}
                my={3}
                mr={3}
              >
                <Stack
                  style={{
                    backgroundColor: "white",
                    borderRadius: 15,
                    padding: 5,
                  }}
                >
                  <Image
                    source={require("../../assets/wateringp.png")}
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  />
                </Stack>
                <Stack width={250} space={1}>
                  <Text
                    style={{
                      fontFamily: FONT.PoppinsBold,
                      fontSize: 15,
                    }}
                  >
                    Initiative for better future
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONT.PoppinsMedium,
                      fontSize: 12,
                      color: COLORS.verbGray,
                    }}
                  >
                    Help us to make future green and full with happiness
                  </Text>
                </Stack>
              </HStack>
              <HStack
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: Platform.OS === "ios" ? width / 1.1 : width / 1.1,
                  height: 120,
                  backgroundColor: "#FAF0D7",
                  alignSelf: "center",
                  borderRadius: 20,
                }}
                space={Platform.OS === "ios" ? 5 : 3}
                my={3}
              >
                <Stack
                  style={{
                    backgroundColor: "white",
                    borderRadius: 15,
                    padding: 5,
                  }}
                >
                  <Image
                    source={require("../../assets/growth.png")}
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  />
                </Stack>
                <Stack width={250} space={1}>
                  <Text
                    style={{
                      fontFamily: FONT.PoppinsBold,
                      fontSize: 15,
                    }}
                  >
                    Initiative for better future
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONT.PoppinsMedium,
                      fontSize: 12,
                      color: COLORS.verbGray,
                    }}
                  >
                    Nurturing Today for a Greener Tomorrow
                  </Text>
                </Stack>
              </HStack>
            </ScrollView>
            {homepageschool.map((item, i) => {
              const SCHOOL_DATA = item.school;

              return (
                <Stack
                  key={item._id}
                  style={{ flex: 1, alignSelf: "stretch", marginVertical: 10 }}
                >
                  <SchoolCard
                    title={item?.title}
                    city={item?.city}
                    area={item?.area}
                    state={item?.state}
                    getSchoolDetails={() => {
                      getSchools(item?.location, SCHOOL_DATA?.name, item?._id);
                    }}
                    image={item?.feature_image}
                    like={item?.likes}
                    comments={item?.comments}
                    featured={item?.featured}
                    imagewidth={width - 50}
                    story={item?.story}
                    user={item?.user}
                    profile_pic={item?.user?.profile_picture}
                  />
                </Stack>
              );
            })}
          </ScrollView>
        </Center>
      )}
    </SafeAreaView>
  );
};

export default MainScreen;
