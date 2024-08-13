import React, { memo, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import { SIZES, COLORS, FONT } from "../../../utils/theme";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import {
  Button,
  HStack,
  PresenceTransition,
  Spinner,
  useToast,
} from "native-base";
import {
  Stack,
  ScrollView,
  Alert,
  VStack,
  IconButton,
  CloseIcon,
} from "native-base";
import { AirbnbRating } from "react-native-ratings";
import styles from "./Details.style";
import CommonButton from "../../../components/common/button/CommonButton";
import BottomDrawerComponent from "./BottomDrawer";
import { useDispatch, useSelector } from "react-redux";
import { FindPostScreenAction } from "../redux/action";
const { width, height } = Dimensions.get("window");

const FeedbackBox = ({ BASIC_DATA }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const selectUser = useSelector((state) => state?.loginreducer?.userdata);

  const [draweriIsOpen, setdrawerIsOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState("");
  const ratingComplete = (rating) => {
    setRatingValue(rating);
  };

  let addreviewdata = useSelector(
    (state) => state?.FindPostScreenReducer?.addreviewdata,
  );

  const addreviewloader = useSelector(
    (state) => state?.FindPostScreenReducer?.addreviewloader,
  );
  const reviewdata = useSelector(
    (state) => state?.FindPostScreenReducer?.reviewdata,
  );

  const reviewloader = useSelector(
    (state) => state?.FindPostScreenReducer?.reviewloader,
  );

  const REVIEWS_DATA = reviewdata?.data?.reviews;

  const addReview = () => {
    const apiPayload = {
      comment: comment,
      rating: ratingValue,
      post: BASIC_DATA?.post?._id,
      user: selectUser?.user?._id,
      location: BASIC_DATA?._id,
    };
    dispatch(FindPostScreenAction.fetchAddReview(apiPayload));
    setRatingValue(0);
    setComment("");
    dispatch(FindPostScreenAction.fetchReviews({ id: BASIC_DATA?.post?._id }));
  };

  useEffect(() => {
    function hitToast() {
      if (addreviewdata?.msg) {
        toast.show({
          duration: 1000,
          render: () => (
            <Alert w='100%' status={addreviewdata.status ? "success" : "error"}>
              <VStack space={2} flexShrink={1} w='100%'>
                <HStack
                  flexShrink={1}
                  space={2}
                  justifyContent='space-between'
                  alignItems={"center"}>
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon />
                    <Text fontSize='md' color='coolGray.800'>
                      {addreviewdata.status
                        ? "Review added successfully"
                        : "Failed to add review"}
                    </Text>
                  </HStack>
                  <IconButton
                    variant='unstyled'
                    _focus={{
                      borderWidth: 0,
                    }}
                    icon={<CloseIcon size='3' />}
                    _icon={{
                      color: "coolGray.600",
                    }}
                  />
                </HStack>
              </VStack>
            </Alert>
          ),
          placement: "top-right",
        });
        dispatch(FindPostScreenAction.setAddReview([]));
      }
    }
    hitToast();
  }, [addreviewdata]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ marginTop: 10 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <Text
          style={{
            fontFamily: FONT.PoppinsMedium,
            fontSize: 15,
          }}>
          Comments
        </Text>
        <HStack my={2} justifyContent={"space-between"}>
          <AirbnbRating
            count={5}
            reviews={["Terrible😱", "Bad🙄", "OK🙂", "Good😇", "Very Good🤩"]}
            size={20}
            onFinishRating={ratingComplete}
            showRating={false}
            defaultRating={ratingValue}
          />
          <Text
            style={{
              fontFamily: FONT.PoppinsMedium,
              fontSize: 20,
            }}>
            {ratingValue}/5{" "}
            <Text
              style={{
                fontFamily: FONT.PoppinsMedium,
                fontSize: 15,
              }}>
              {
                ["Terrible😱", "Bad🙄", "OK🙂", "Good😇", "Very Good🤩"][
                  ratingValue - 1
                ]
              }
            </Text>
          </Text>
        </HStack>
        <View style={styles.commentInput}>
          <TextInput
            multiline
            numberOfLines={1}
            placeholder='Add comments'
            placeholderTextColor={"#444"}
            autoCapitalize='none'
            autoCorrect={false}
            textContentType='password'
            style={{ flexGrow: 1, overflow: "hidden" }}
            value={comment}
            onChangeText={(text) => setComment(text)}
          />

          {!addreviewloader ? (
            <TouchableOpacity
              onPress={addReview}
              disabled={!ratingValue || !comment}>
              <Ionicons
                name='ios-send'
                size={24}
                color={
                  !ratingValue || !comment ? "#a3a3a3" : COLORS.primaryColor
                }
              />
            </TouchableOpacity>
          ) : (
            <Spinner />
          )}
        </View>
      </KeyboardAvoidingView>

      {REVIEWS_DATA < 2
        ? REVIEWS_DATA
        : REVIEWS_DATA?.slice(0, 2)?.map((item, i) => {
            return (
              <HStack key={i} style={styles.reviewContainer} space={2} my={2}>
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
                      <AntDesign key={i} name='star' size={14} color='orange' />
                    </View>
                  </HStack>
                </HStack>
              </HStack>
            );
          })}

      <Stack justifyContent={"center"} alignItems={"center"}>
        <CommonButton
          onPress={() => setdrawerIsOpen(true)}
          title={`Show comments (${reviewdata?.data?.reviews?.length ?? 0})`}
          style={{
            width: width / 1.5,
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: "white",

            height: 40,
            borderColor: COLORS.verbBasePrimaryColor,
            borderWidth: 1,
          }}
          textStyle={{
            color: COLORS.verbBasePrimaryColor,
          }}
        />
      </Stack>

      <BottomDrawerComponent
        onClose={() => setdrawerIsOpen(false)}
        draweriIsOpen={draweriIsOpen}
      />
    </SafeAreaView>
  );
};

export default memo(FeedbackBox);
