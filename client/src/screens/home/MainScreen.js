import React, { useEffect } from "react";
import { Text, HStack, Center, Stack } from "native-base";
import {
  StatusBar,
  RefreshControl,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import Header from "../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { MainScreenAction } from "./redux/action";
import { COLORS, FONT } from "../../utils/theme";
import { FindPostScreenAction } from "../postDetails/redux/action";
import PostCard from "../../components/postCard/PostCard";
import * as Location from "expo-location";
import { UtilityAction } from "../utilityScreen/redux/action";
const { width } = Dimensions.get("window");

const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  let homepagepost = useSelector(
    (state) => state?.MainScreenReducer?.homepagepost,
  );
  let homepagepostloader = useSelector(
    (state) => state?.MainScreenReducer?.homepagepostloader,
  );

  const selectUser = useSelector((state) => state?.loginreducer?.userdata);

  let coordinate = useSelector(
    (state) => state?.utilityReducer?.userGeoAddress,
  );

  useEffect(() => {
    if (coordinate)
      dispatch(
        MainScreenAction.fetchHomePagePost({
          city: coordinate?.city,
          ...(Object?.keys(coordinate).length > 0
            ? { latitude: coordinate.latitude, longitude: coordinate.longitude }
            : {}),
        }),
      );
  }, [coordinate]);

  function getPosts(dest, name, id) {
    const destination = {
      latitude: dest?.coordinates[0],
      longitude: dest?.coordinates[1],
    };

    navigation.navigate("postDetails", {
      id: Math.random() * 100,
      destination: destination,
    });

    dispatch(
      FindPostScreenAction.FetchPostById({
        location: id,
        lat: coordinate?.latitude,
        lng: coordinate?.longitude,
        user: selectUser?.user?._id,
      }),
    );
  }

  const onRefresh = () => {
    dispatch(
      MainScreenAction.fetchHomePagePost({
        city: coordinate?.city,
        ...(coordinate
          ? { latitude: coordinate.latitude, longitude: coordinate.longitude }
          : {}),
      }),
    );
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

  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.verbScreenBG,
        flex: 1,
      }}>
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
            MainScreenAction.fetchPostByRouteQuery({
              key: "nearby",
              city: coordinate?.city,
              lat: coordinate?.latitude,
              lng: coordinate?.longitude,
            }),
          );
          navigation.navigate("ViewAllScreen", {
            name: "Nearby",
            key: "nearby",
          });
        }}
        toratedNavigation={() => {
          dispatch(
            MainScreenAction.fetchPostByRouteQuery({
              key: "toprated",
              city: coordinate?.city,
            }),
          );
          navigation.navigate("ViewAllScreen", {
            name: "Top planters",
            key: "toprated",
          });
        }}
        featuredNavigation={() => {
          dispatch(
            MainScreenAction.fetchPostByRouteQuery({
              key: "recent",
              city: coordinate?.city,
            }),
          );
          navigation.navigate("ViewAllScreen", {
            name: "Recent",
            key: "recent",
          });
        }}
        viewAllNavigation={() => navigation.navigate("Posts")}
      />

      {homepagepost?.length <= 0 && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={homepagepostloader}
              onRefresh={onRefresh}
            />
          }>
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
              }}>
              No data found
            </Text>
            <Stack mt={2}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SelectCity");
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    padding: 4,
                    paddingHorizontal: 10,
                    fontFamily: FONT.medium,
                    color: COLORS.primaryColor,
                  }}>
                  Change preferences
                </Text>
              </TouchableOpacity>
            </Stack>
          </Center>
        </ScrollView>
      )}

      {homepagepost?.length > 0 && (
        <Center
          mb={5}
          style={{
            flex: 1,
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                onRefresh={onRefresh}
                refreshing={homepagepostloader}
              />
            }
            onRefresh={onRefresh}
            contentContainerStyle={{ paddingBottom: 50 }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                marginHorizontal: 10,
              }}>
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
                mr={3}>
                <Stack
                  style={{
                    backgroundColor: "white",
                    borderRadius: 15,
                    padding: 5,
                  }}>
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
                    }}>
                    Initiative for better future
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONT.PoppinsMedium,
                      fontSize: 12,
                      color: COLORS.verbGray,
                    }}>
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
                my={3}>
                <Stack
                  style={{
                    backgroundColor: "white",
                    borderRadius: 15,
                    padding: 5,
                  }}>
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
                    }}>
                    Initiative for better future
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONT.PoppinsMedium,
                      fontSize: 12,
                      color: COLORS.verbGray,
                    }}>
                    Nurturing Today for a Greener Tomorrow
                  </Text>
                </Stack>
              </HStack>
            </ScrollView>
            {homepagepost.map((item, i) => {
              return (
                <Stack
                  key={item._id}
                  style={{ flex: 1, alignSelf: "stretch", marginVertical: 10 }}>
                  <PostCard
                    title={item?.title}
                    city={item?.city}
                    area={item?.area}
                    state={item?.state}
                    getPostDetails={() => {
                      getPosts(item?.location, item?.name, item?._id);
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
