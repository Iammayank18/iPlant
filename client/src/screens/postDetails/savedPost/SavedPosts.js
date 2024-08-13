import {
  View,
  RefreshControl,
  Dimensions,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState, memo } from "react";
import Navheader from "../../../components/navHeader/Navheader";

import { HStack, Spinner, Center, Stack } from "native-base";
import { Octicons, AntDesign } from "@expo/vector-icons";
import PostCard from "../../../components/postCard/PostCard";
import { useSelector, useDispatch } from "react-redux";
import { FindPostScreenAction } from "../redux/action";
import { COLORS, FONT, SIZES } from "../../../utils/theme";

const { width, height } = Dimensions.get("window");

const SavedData = ({ state, descriptors, navigation }) => {
  const renderItem = React.useMemo(
    () =>
      ({ item }) => {
        return (
          <Stack
            key={item._id}
            style={{
              flex: 1,
              alignSelf: "stretch",
              marginVertical: 10,
            }}>
            <PostCard
              title={item?.title}
              city={item?.city}
              area={item?.area}
              state={item?.state}
              getPostDetails={() => {
                getPosts(item?.location, item?.name, item?.postId);
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
      },
    [],
  );

  const dispatch = useDispatch();
  const selectUser = useSelector((state) => state?.loginreducer?.userdata);
  const savedPosts = useSelector(
    (state) => state?.FindPostScreenReducer?.savedPost,
  );
  const savedPostLoader = useSelector(
    (state) => state?.FindPostScreenReducer?.savedPostLoader,
  );

  let coordinate = useSelector(
    (state) => state?.utilityReducer?.userGeoAddress,
  );

  useEffect(() => {
    dispatch(
      FindPostScreenAction.fetchSavedPost({
        uid: selectUser?.user?._id,
      }),
    );
  }, [navigation]);

  const [searchQuery, setSearchQuery] = useState("");

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
      FindPostScreenAction.fetchSavedPost({
        uid: selectUser?.user?._id,
      }),
    );
  };

  const filteredPosts = savedPosts?.filter((item) => {
    return item?.title?.toLowerCase().includes(searchQuery?.toLowerCase());
  });

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
      <Navheader title={"Saved posts"} navigation={() => navigation.goBack()} />

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
            placeholder={"Find saved post"}
            onChangeText={(e) => setSearchQuery(e)}
            placeholderTextColor={COLORS.gray}
          />
        </HStack>
      </HStack>

      {filteredPosts?.length <= 0 && (
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={savedPostLoader}
            />
          }>
          <Stack
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              height: height / 1.6,
            }}>
            <Image
              source={require("../../../assets/notfoundsaved.png")}
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
                width: 300,
                textAlign: "center",
              }}>
              You don't saved any post yet!
            </Text>
          </Stack>
        </ScrollView>
      )}

      <Center
        mb={5}
        style={{
          flex: 1,
        }}>
        <FlatList
          refreshing={!savedPostLoader ? true : savedPostLoader}
          refreshControl={<RefreshControl onRefresh={onRefresh} />}
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          data={filteredPosts}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          initialNumToRender={10}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </Center>
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
});

export default memo(SavedData);
