import {
  View,
  ScrollView,
  StatusBar,
  Dimensions,
  RefreshControl,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";
import { useDebounce } from "@uidotdev/usehooks";
import React, { useEffect, useRef, useState } from "react";
import { Stack, HStack, Center } from "native-base";
import PostCard from "../../components/postCard/PostCard";

import Navheader from "../../components/navHeader/Navheader";
import { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AntDesign,
  Entypo,
  Octicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { FONT, COLORS } from "../../utils/theme";
import { FindPostScreenAction } from "./redux/action";
const { width } = Dimensions.get("window");

const FindPosts = ({ navigation }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchTerm = useDebounce(searchQuery, 1000);

  const inputRef = useRef(null);

  const selectUser = useSelector((state) => state?.loginreducer?.userdata);
  let coordinate = useSelector(
    (state) => state?.utilityReducer?.userGeoAddress,
  );
  const filtersForSearch = useSelector(
    (state) => state.utilityReducer?.filterData,
  );

  let searchPosts = useSelector(
    (state) => state.FindPostScreenReducer.searchPostData,
  );
  let searchPostLoader = useSelector(
    (state) => state.FindPostScreenReducer.searchLoader,
  );

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(
        FindPostScreenAction.fetchFindPosts({
          keyword: searchQuery,
          ...filtersForSearch,
          ...coordinate,
        }),
      );
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (filtersForSearch) {
      dispatch(
        FindPostScreenAction.fetchFindPosts({
          keyword: searchQuery,
          ...filtersForSearch,
          ...coordinate,
        }),
      );
    }
  }, [filtersForSearch]);

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const onRefresh = () => {
    dispatch(
      FindPostScreenAction.fetchFindPosts({
        keyword: searchQuery,
        ...filtersForSearch,
        ...coordinate,
      }),
    );
  };

  const renderItem = React.useMemo(
    () =>
      ({ item }) => {
        const DATA = item.post;

        return (
          <Stack
            key={item._id}
            style={{ flex: 1, alignSelf: "stretch", marginVertical: 10 }}>
            <PostCard
              institute={DATA?.name}
              city={DATA?.city}
              state={DATA?.state}
              area={DATA?.area}
              admissionOpen={DATA.admissionOpen}
              getPostDetails={() => {
                getPosts(item?.location, DATA?.name, item?._id);
              }}
              image={DATA.feature_image}
              classRange={DATA.class_range}
              rating={item?.avgrating}
              featured={item?.featured}
              imagewidth={width - 50}
              // distance={item.distance}
            />
          </Stack>
        );
      },
    [],
  );

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

      <Navheader title={"Find Posts"} navigation={() => navigation.goBack()} />

      <HStack
        justifyContent={"space-between"}
        space={2}
        width={width / 1.1}
        alignSelf={"center"}
        alignItems={"center"}
        mt={4}
        pb={3}>
        <HStack style={styles.searchContainer}>
          <AntDesign name='search1' size={24} color={COLORS.gray2} />
          <TextInput
            placeholder={"Search post, city, pincode.."}
            onChangeText={(e) => setSearchQuery(e)}
            placeholderTextColor={COLORS.gray}
          />
        </HStack>

        <Stack
          style={[
            styles.filterContainer,
            {
              backgroundColor: searchPostLoader
                ? COLORS.verbBaseSecondaryColor
                : COLORS.verbBasePrimaryColor,
            },
          ]}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SelectFilter")}
            disabled={searchPostLoader}>
            {searchPostLoader ? (
              <ActivityIndicator color={"white"} />
            ) : (
              <SimpleLineIcons name='equalizer' size={18} color='white' />
            )}
          </TouchableOpacity>
        </Stack>
      </HStack>

      <Center
        mb={8}
        style={{
          ...(searchPosts?.length > 0 && { flex: 1 }),
        }}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 70 }}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={searchPostLoader}
            />
          }
          showsVerticalScrollIndicator={false}
          data={searchPosts}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          initialNumToRender={5}
        />
        {searchPosts?.length <= 0 ? (
          <Text>No posts found in {debouncedSearchTerm}</Text>
        ) : null}
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
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});
export default FindPosts;
