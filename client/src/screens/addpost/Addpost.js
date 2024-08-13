import { ScrollView, Stack } from "native-base";
import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StatusBar,
  Dimensions,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { VStack, HStack, useToast } from "native-base";
import Navheader from "../../components/navHeader/Navheader";
import CommonInput from "../../components/common/Input/CommonInput";
import CommonButton from "../../components/common/button/CommonButton";
import {
  Feather,
  FontAwesome,
  Ionicons,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import BottomDrawer from "react-native-animated-bottom-drawer";
import { COLORS, FONT } from "../../utils/theme";
import { useDispatch, useSelector } from "react-redux";
import { postAction } from "./redux/action";
import * as Location from "expo-location";
const { width, height } = Dimensions.get("window");

const Addpost = ({ navigation }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const selectUser = useSelector((state) => state?.loginreducer?.userdata);
  let { profileData, ProfleDataLoader } = useSelector(
    (state) => state?.ProfileReducer,
  );
  const userGeoadd = useSelector(
    (state) => state.utilityReducer.userGeoAddress,
  );

  const addpostData = useSelector((state) => state.postReducer.addpost);
  const addpostLoader = useSelector((state) => state.postReducer.addpostLoader);

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
    if (!userGeoadd.latitude) detectLocation();
  }, []);

  useEffect(() => {
    if (addpostData?.statusCode === 500) {
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
                {addpostData.msg}
              </Text>
            </HStack>
          );
        },
        placement: "top-right",
      });
      dispatch(postAction.setAddPost(null));
    } else if (
      addpostData?.statusCode === 200 ||
      addpostData?.msg === "post Uploaded"
    ) {
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
                {addpostData?.msg}
              </Text>
            </HStack>
          );
        },
        placement: "top-right",
      });
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
      dispatch(postAction.setAddPost(null));
    }
  }, [addpostData]);

  const bottomDrawerRef = useRef(null);
  const [bottomDrawerOpen, setBottomDrawerOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [feedBackData, setFeedbackData] = useState({
    subject: "",
    message: "",
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      bottomDrawerRef.current.close(0);
    }
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
      setImage(result.assets[0].uri);
      bottomDrawerRef.current.close(0);
    }
  };
  console.log(userGeoadd);
  const addpost = () => {
    const formData = new FormData();
    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: "profile-picture",
    });
    formData.append("user", selectUser.user?._id);
    formData.append("city", userGeoadd.city);
    formData.append("state", userGeoadd.state || userGeoadd.region);
    formData.append("country", userGeoadd.country);
    formData.append("postcode", userGeoadd.postalCode);
    formData.append("title", feedBackData.subject);
    formData.append("story", feedBackData.message);
    formData.append(
      "coordinates",
      userGeoadd.latitude + "/" + userGeoadd.longitude,
    );

    dispatch(postAction.fetchAddPost(formData));
  };

  useEffect(() => {
    // dispatch(postAction.setAddPost(null));
    if (bottomDrawerOpen) {
      if (bottomDrawerRef.current) {
        bottomDrawerRef.current.open(150);
      }
    } else {
      bottomDrawerRef.current.close(0);
    }
  }, [bottomDrawerOpen]);
  console.log(feedBackData);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignSelf: "stretch",
      }}>
      <StatusBar
        networkActivityIndicatorVisible={true}
        animated={true}
        backgroundColor={COLORS.backgoundAndStatusbar}
        barStyle={"dark-content"}
        showHideTransition={"fade"}
        hidden={false}
      />
      <Navheader title={"Add Post"} navigation={() => navigation.goBack()} />
      <ScrollView>
        <Stack alignItems={"center"} mt={5}>
          <Stack
            style={{
              width: width / 1.1,
              justifyContent: "center",
            }}>
            {image ? (
              <Image
                source={{
                  uri: image,
                }}
                resizeMode='stretch'
                alt='image'
                style={[
                  style.imageSelector,
                  {
                    borderStyle: "",
                  },
                ]}
              />
            ) : (
              <TouchableOpacity
                style={style.imageSelector}
                onPress={() => setBottomDrawerOpen(true)}>
                <VStack alignItems={"center"} space={3}>
                  <Feather name='camera' size={35} color='black' />
                  <Text
                    style={{
                      fontFamily: FONT.PoppinsMedium,
                      fontSize: 15,
                      color: COLORS.verbGray,
                    }}>
                    Click here to select image
                  </Text>
                </VStack>
              </TouchableOpacity>
            )}

            {image && (
              <HStack justifyContent={"flex-end"} mt={2}>
                <TouchableOpacity onPress={() => setImage(null)}>
                  <HStack alignItems={"center"}>
                    <Entypo name='cross' size={24} color='black' />
                    <Text
                      style={{
                        fontFamily: FONT.PoppinsMedium,
                      }}>
                      Remove
                    </Text>
                  </HStack>
                </TouchableOpacity>
              </HStack>
            )}

            {/* <CommonInput placeholder={"Full name"} inputLable={"Full name"} /> */}
            <Stack mt={5}>
              <CommonInput
                inputLable={"Title"}
                placeholder={"Title"}
                onChangeText={(e) =>
                  setFeedbackData({ ...feedBackData, subject: e })
                }
              />
              <CommonInput
                inputLable={"Story"}
                placeholder={"Story"}
                numberOfLines={2}
                inpurtStyle={{
                  height: 100,
                }}
                onChangeText={(e) =>
                  setFeedbackData({ ...feedBackData, message: e })
                }
                style={{
                  borderColor: "red",
                  borderWidth: 1,
                }}
              />
            </Stack>
            <Stack alignItems={"flex-end"}>
              <Text>
                {feedBackData?.message?.split(" ").length > 500 ? (
                  <Text
                    style={{
                      color: "red",
                    }}>
                    Max words exceeded
                  </Text>
                ) : (
                  feedBackData?.message?.split(" ").length + "/" + 500
                )}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </ScrollView>
      <CommonButton
        title={"Add"}
        onPress={addpost}
        disabled={
          addpostLoader ||
          feedBackData?.message?.split(" ").length > 50 ||
          feedBackData?.subject?.length <= 0 ||
          feedBackData?.message?.length <= 0 ||
          !image
        }
        loader={addpostLoader}
        style={{
          borderRadius: 12,
          width: width / 1.2,
          marginTop: 10,
          borderRadius: 10,
          backgroundColor:
            addpostLoader ||
            feedBackData?.message?.split(" ").length > 50 ||
            feedBackData?.subject?.length <= 0 ||
            feedBackData?.message?.length <= 0 ||
            !image
              ? COLORS.verbGray2
              : COLORS.verbBasePrimaryColor,
          height: 50,
          alignSelf: "center",
          marginBottom: Platform.OS === "android" ? 10 : 0,
        }}
        loaderColor={addpostLoader ? "black" : "white"}
      />
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
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  imageSelector: {
    width: width / 1.1,
    height: 200,
    backgroundColor: COLORS.verbGray3,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    //   marginBottom: 20,
    borderStyle: "dashed",
    borderWidth: 1,
  },
});

export default Addpost;
