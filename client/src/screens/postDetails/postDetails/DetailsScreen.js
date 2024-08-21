import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import uniVersalStyle from "../../../utils/uniVersalStyle";
import styles from "./Details.style";
import { FontAwesome, Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  HStack,
  ScrollView,
  Spinner,
  Center,
  AspectRatio,
  Image,
  Button,
  useToast,
  Box,
  Stack,
} from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";
import CommonButton from "../../../components/common/button/CommonButton";
import FeedbackBox from "./FeedbackBox";
import { BasicDetailsBoxs } from "./DetailsBoxs";
import { FindPostScreenAction } from "../redux/action";
import { COLORS, FONT } from "../../../utils/theme";
import CallBackModal from "./CallBackModal";
const { width, height } = Dimensions.get("window");

const PostDetailsScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [storeCoordinat, setStoreCoordinates] = useState({});
  const [isfav, setIsfav] = useState(false);
  const [isEnquired, setEnquired] = useState(false);

  let coordinate = useSelector(
    (state) => state?.utilityReducer?.userGeoAddress,
  );

  const selectUser = useSelector((state) => state?.loginreducer?.userdata);
  let {
    postsById,
    postByIdLoader,
    addSavedPostLoader,
    addSavedPost,
    postsEnquiry,
    postsEnquiryLoader,
  } = useSelector((state) => state?.FindPostScreenReducer);

  const POST_DATA = postsById?.data?.post;
  const BASIC_DATA = postsById?.data;

  useEffect(() => {
    if (POST_DATA?._id) {
      dispatch(FindPostScreenAction.fetchReviews({ id: POST_DATA?._id }));
    }
  }, [POST_DATA]);

  useEffect(() => {
    setIsfav(BASIC_DATA?.isFav);
    setEnquired(BASIC_DATA?.isEnquired);
  }, [BASIC_DATA]);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@coordinates");

        if (
          coordinate?.latitude == null ||
          coordinate?.latitude == undefined ||
          coordinate?.latitude == ""
        ) {
          setStoreCoordinates(JSON.parse(jsonValue));
        } else {
          setStoreCoordinates(coordinate);
        }
      } catch (e) {}
    };
    getData();
  }, []);

  const addToFav = async () => {
    const payload = {
      user: selectUser?.user?._id,
      post: POST_DATA?._id,
      location: BASIC_DATA._id,
      isFavorite: !isfav,
    };

    dispatch(FindPostScreenAction.fetchAddSavePost(payload));

    setTimeout(() => {
      setIsfav(!isfav);
    }, 1000);
  };

  if (postByIdLoader || !POST_DATA?.title) {
    return (
      <HStack
        space={3}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.backgoundAndStatusbar,
        }}>
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
          }}>
          Loading
        </Text>
        <Spinner size='lg' />
      </HStack>
    );
  }

  return (
    <View
      style={{
        backgroudColor: COLORS.verbScreenBG,
        flex: 1,
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
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white", flex: 1 }}
        contentContainerStyle={{ paddingBottom: 50 }}>
        <ScrollView horizontal={true}>
          <AspectRatio
            height={{
              base: height,
              md: height,
            }}
            width={{
              base: width,
              md: width,
            }}>
            <Image
              resizeMode='cover'
              source={{
                uri: POST_DATA.feature_image,
              }}
              onLoad={(e) => {}}
              alt='post image'
            />
          </AspectRatio>
        </ScrollView>

        <HStack style={styles.topHeader} justifyContent={"space-between"}>
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              top: 20,
              left: width / 22,
            }}
            className='align-middle'>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                borderRadius: 40,
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
              }}
              onPress={() => navigation.goBack()}>
              <Ionicons name='arrow-back-outline' size={24} color='black' />
            </TouchableOpacity>
          </View>
          <Stack
            style={{
              flexDirection: "row",
              position: "absolute",
              top: 20,
              left: width / 1.2,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                borderRadius: 40,
                justifyContent: "center",
                alignItems: "center",
                width: 40,
                height: 40,
              }}
              onPress={addToFav}>
              {addSavedPostLoader ? (
                <Spinner />
              ) : (
                <FontAwesome
                  name={isfav ? "heart" : "heart-o"}
                  size={24}
                  color={isfav ? "green" : "black"}
                />
              )}
            </TouchableOpacity>
          </Stack>
        </HStack>

        <View style={[uniVersalStyle.container, style.detailContainer]}>
          <BasicDetailsBoxs
            navigation={navigation}
            POST_DATA={POST_DATA}
            BASIC_DATA={BASIC_DATA}
            storeCoordinat={storeCoordinat}
          />

          <FeedbackBox BASIC_DATA={BASIC_DATA} />
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  detailContainer: {
    borderTopWidth: 1,
    paddingTop: 20,
    borderTopColor: "#e0e0e0",
  },
});

export default PostDetailsScreen;
