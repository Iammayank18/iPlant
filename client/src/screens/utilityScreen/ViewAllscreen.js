import React from "react";
import {
  ScrollView,
  Text,
  View,
  Dimensions,
  StatusBar,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import Navheader from "../../components/navHeader/Navheader";
import { Spinner, Stack, VStack, HStack, Center } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { COLORS, FONT } from "../../utils/theme";
import { MainScreenAction } from "../home/redux/action";
import { FindPostScreenAction } from "../postDetails/redux/action";
import PostCard from "../../components/postCard/PostCard";
const { width } = Dimensions.get("window");
const ViewAllscreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  let coordinate = useSelector(
    (state) => state?.utilityReducer?.userGeoAddress,
  );

  const selectUser = useSelector((state) => state?.loginreducer?.userdata);

  let homepagepost = useSelector(
    (state) => state.MainScreenReducer.qyerypagepost,
  );
  let homepagepostLoader = useSelector(
    (state) => state.MainScreenReducer.qyerypagepostloader,
  );

  const renderItem = React.useMemo(
    () =>
      ({ item }) => {
        const POST_DATA = item.post;
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
                getPosts(item?.location, POST_DATA?.name, item?._id);
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

  const onRefresh = () => {
    dispatch(
      MainScreenAction.fetchPostByRouteQuery({
        key: route.params.key,
        city: coordinate?.city,
        lat: coordinate?.latitude,
        lng: coordinate?.longitude,
      }),
    );
  };

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

  return (
    <SafeAreaView
      style={{ backgroundColor: COLORS.backgoundAndStatusbar, flex: 1 }}>
      <StatusBar
        networkActivityIndicatorVisible={true}
        animated={true}
        backgroundColor={COLORS.backgoundAndStatusbar}
        barStyle={"dark-content"}
        showHideTransition={"fade"}
        hidden={false}
      />
      <Navheader
        title={route.params.name}
        navigation={() => navigation.goBack()}
        onChangeText={(e) => setSearchQuery(e)}
      />

      {homepagepost?.length <= 0 && (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={homepagepostLoader}
              onRefresh={onRefresh}
            />
          }
          style={{
            marginTop: 100,
          }}>
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
          </Center>
        </ScrollView>
      )}

      <Center
        mb={5}
        style={{
          flex: 1,
        }}>
        <FlatList
          refreshing={homepagepostLoader}
          refreshControl={
            <RefreshControl
              refreshing={homepagepostLoader}
              onRefresh={onRefresh}
            />
          }
          onRefresh={onRefresh}
          showsVerticalScrollIndicator={false}
          data={homepagepost}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          initialNumToRender={10}
        />
      </Center>
    </SafeAreaView>
  );
};

export default ViewAllscreen;
