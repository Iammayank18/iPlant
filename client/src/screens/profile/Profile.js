import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { ScrollView, Stack, VStack, HStack } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navheader from "../../components/navHeader/Navheader";
import { useDispatch, useSelector } from "react-redux";
import MainAction from "../redux/action";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome, Ionicons, Entypo } from "@expo/vector-icons";
import { profileArr } from "./profileHelper";
import { COLORS, FONT } from "../../utils/theme";
import BottomDrawer from "react-native-animated-bottom-drawer";
import { useUpdatePageTitle } from "../../utils/helperFunction";
import ProfileAction from "./redux/action";
const { width, height } = Dimensions.get("window");

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const bottomDrawerRef = useRef(null);

  const [image, setImage] = useState(null);
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);
  const selectUser = useSelector((state) => state?.loginreducer?.userdata);
  let { profileData, ProfleDataLoader } = useSelector(
    (state) => state?.ProfileReducer,
  );

  let { profilePhotoRes, profilePhotoResLoader } = useSelector(
    (state) => state?.ProfileReducer,
  );

  useEffect(() => {
    dispatch(ProfileAction.fetchUserProfileData({ id: selectUser?.user?._id }));
  }, []);
  console.log(profileData?.data?.profile_picture);
  useEffect(() => {
    setImage(profileData?.data?.profile_picture);
    if (profilePhotoRes?.statusCode === 500) {
      toast.show({
        duration: 1400,
        render: () => {
          return (
            <HStack
              bg='amber.500'
              px='2'
              py='1'
              mr={2}
              rounded='sm'
              p={2}
              space={2}
              alignItems={"center"}
              height={"10"}>
              <AntDesign name='warning' size={18} color='black' />
              <Text
                style={{
                  color: "white",
                  fontFamily: FONT.medium,
                }}>
                {profilePhotoRes.msg}
              </Text>
            </HStack>
          );
        },
        placement: "top-right",
      });
      dispatch(ProfileAction.setUserUpdateProfilePhoto(null));
    } else if (profilePhotoRes?.statusCode === 200) {
      toast.show({
        duration: 1400,
        render: () => {
          return (
            <HStack
              bg='emerald.500'
              px='2'
              py='1'
              mr={2}
              rounded='sm'
              p={2}
              space={2}
              alignItems={"center"}
              height={"10"}>
              <Feather name='check-circle' size={15} color='black' />
              <Text
                style={{
                  color: "white",
                  fontFamily: FONT.medium,
                }}>
                {profilePhotoRes?.msg}
              </Text>
            </HStack>
          );
        },
        placement: "top-right",
      });
      setImage(profilePhotoRes?.data);
      dispatch(ProfileAction.setUserUpdateProfilePhoto(null));
    }
  }, [profilePhotoRes]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      bottomDrawerRef.current.close(0);
      const formData = new FormData();
      formData.append("image", {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: "profile-picture",
      });
      formData.append("_id", selectUser.user?._id);
      dispatch(ProfileAction.fetchUserUpdateProfilePhoto(formData));
    }
    dispatch(ProfileAction.fetchUserProfileData({ id: selectUser?.user?._id }));
  };

  const takeImage = async () => {
    let options = {
      quality: 1,
      exif: false,
      allowsEditing: true,
      aspect: [4, 3],
    };
    let result = await ImagePicker.launchCameraAsync(options);

    if (!result.canceled) {
      bottomDrawerRef.current.close(0);
      const formData = new FormData();
      formData.append("image", {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: "profile-picture",
      });
      formData.append("_id", selectUser.user?._id);
      dispatch(ProfileAction.fetchUserUpdateProfilePhoto(formData));
    }
    dispatch(ProfileAction.fetchUserProfileData({ id: selectUser?.user?._id }));
  };

  useEffect(() => {
    if (bottomDrawerOpen) {
      if (bottomDrawerRef.current) {
        bottomDrawerRef.current.open(150);
      }
    } else {
      bottomDrawerRef.current.close(0);
    }
  }, [bottomDrawerOpen]);

  const onRefresh = () => {
    dispatch(ProfileAction.fetchUserProfileData({ id: selectUser?.user?._id }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.verbScreenBG }}>
      <StatusBar
        networkActivityIndicatorVisible={true}
        animated={true}
        backgroundColor={COLORS.backgoundAndStatusbar}
        barStyle={"dark-content"}
        showHideTransition={"fade"}
        hidden={false}
      />
      <Navheader title={"Profile"} navigation={() => navigation.goBack()} />

      <ScrollView
        style={{ height: height }}
        contentContainerStyle={{ paddingBottom: 80 }}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={ProfleDataLoader} />
        }>
        <VStack width={width / 1.1} mt={5} alignSelf={"center"}>
          <Stack>
            <TouchableOpacity onPress={() => setBottomDrawerOpen(true)}>
              {profilePhotoResLoader ? (
                <ActivityIndicator color={COLORS.verbBasePrimaryColor} />
              ) : (
                <Image
                  source={{
                    uri: image ?? "https://wallpaperaccess.com/full/317501.jpg",
                  }}
                  alt='Alternate Text'
                  style={style.profilePic}
                  onLoad={(e) => {
                    console.log(e);
                  }}
                />
              )}
            </TouchableOpacity>

            <Stack mt={3}>
              <Text
                style={{
                  fontFamily: FONT.PoppinsBold,
                  fontSize: 20,
                }}>
                {profileData?.data?.name}
              </Text>
            </Stack>
            <Stack mt={2}>
              <Text
                style={{
                  fontFamily: FONT.PoppinsRegular,
                  fontSize: 14,
                  color: COLORS.verbGray,
                }}>
                I love to plant and grow 🌳
              </Text>
            </Stack>
          </Stack>
        </VStack>

        <VStack
          width={width / 1.1}
          alignSelf={"center"}
          justifyContent={"space-between"}
          mt={5}
          space={2}>
          <HStack alignSelf={"center"} space={3}>
            <HStack style={style.profileActivityCard} justifyContent={"center"}>
              <Image
                source={require("../../assets/leaf.png")}
                alt='Alternate Text'
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Stack>
                <Text style={style.profileActivityCardData}>
                  {profileData?.data?.totalPlants}
                </Text>
                <Text style={style.profileActivityCardTitle}>Plants</Text>
              </Stack>
            </HStack>
            <HStack style={style.profileActivityCard} justifyContent={"center"}>
              <Image
                source={require("../../assets/heart.png")}
                alt='Alternate Text'
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Stack>
                <Text style={style.profileActivityCardData}>
                  {profileData?.data?.likes}
                </Text>
                <Text style={style.profileActivityCardTitle}>Likes</Text>
              </Stack>
            </HStack>
          </HStack>

          <HStack alignSelf={"center"} space={3}>
            <HStack style={style.profileActivityCard} justifyContent={"center"}>
              <Image
                source={require("../../assets/rank.png")}
                alt='Alternate Text'
                style={{
                  width: 30,
                  height: 30,
                }}
              />
              <Stack>
                <Text style={style.profileActivityCardData}>25</Text>
                <Text style={style.profileActivityCardTitle}>Rank</Text>
              </Stack>
            </HStack>
            <HStack style={style.profileActivityCard} justifyContent={"center"}>
              <Image
                source={require("../../assets/star.png")}
                alt='Alternate Text'
                style={{
                  width: 35,
                  height: 35,
                }}
              />
              <Stack>
                <Text style={style.profileActivityCardData}>
                  {parseInt(profileData?.data?.totalPlants) * 25}
                </Text>
                <Text style={style.profileActivityCardTitle}>Points</Text>
              </Stack>
            </HStack>
          </HStack>
        </VStack>

        <Stack mt={5} style={style.container}>
          {profileArr.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => navigation.navigate(item.onPress)}>
                <HStack
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  style={style.userPShadow}>
                  <Stack direction={"row"} space={2} alignItems={"center"}>
                    {/* <View>{item.preIcon}</View> */}
                    <Text>{item.name}</Text>
                  </Stack>
                  <View>{item.posIcon}</View>
                </HStack>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.setItem("isLoggedin", "false");
              dispatch(MainAction.setIsLoggedIn(false));
            }}>
            <HStack
              justifyContent={"space-between"}
              alignItems={"center"}
              style={style.userPShadow}>
              <View>
                <Stack direction={"row"} space={2}>
                  {/* <Entypo name="log-out" size={20} color="grey" /> */}
                  <Text> Logout</Text>
                </Stack>
              </View>
              <View>
                <Entypo name='chevron-thin-right' size={13} color='grey' />
              </View>
            </HStack>
          </TouchableOpacity>
        </Stack>
      </ScrollView>

      <BottomDrawer
        onClose={() => {
          setBottomDrawerOpen(false);
        }}
        ref={bottomDrawerRef}
        overDrag={true}>
        <VStack mx={5} space={4} justifyContent={"center"}>
          <TouchableOpacity onPress={takeImage}>
            <HStack alignItems={"center"} space={3}>
              <FontAwesome name='camera' size={30} color='black' />
              <Text
                style={{
                  fontFamily: FONT.medium,
                  fontSize: 15,
                }}>
                Camera
              </Text>
            </HStack>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage}>
            <HStack alignItems={"center"} space={3}>
              <Ionicons name='image' size={32} color='black' />
              <Text
                style={{
                  fontFamily: FONT.medium,
                  fontSize: 15,
                }}>
                Gallery
              </Text>
            </HStack>
          </TouchableOpacity>
        </VStack>
      </BottomDrawer>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    // marginHorizontal: 10,
    backgroundColor: "white",
    shadowColor: COLORS.verbGray,
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
    width: width / 1.1,
    alignSelf: "center",
  },
  profile: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
  },

  userPShadow: {
    padding: 10,
    paddingVertical: 15,
  },

  inHead: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 50,
    left: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },

  userDetails: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: 20,
    color: COLORS.text,
    fontWeight: "bold",
    textAlign: "center",
  },
  profileActivityCard: {
    width: width / 2.4,
    height: 100,
    backgroundColor: "white",
    // justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
    shadowColor: "#F5F5F5",
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 5,
    paddingHorizontal: 10,
    gap: 10,
  },
  profileActivityCardTitle: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: 12,
    color: COLORS.verbGray,
    fontWeight: "bold",
    textAlign: "center",
    // marginTop: 10,
  },
  profileActivityCardData: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 4,
  },
});

export default ProfileScreen;
