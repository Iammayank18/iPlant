import React, {
  useRef,
  memo,
  useLayoutEffect,
  useEffect,
  useState,
} from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import MapView, {
  Marker,
  Callout,
  Circle,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { HStack, Stack, Center } from "native-base";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import CommonButton from "../../../components/common/button/CommonButton";
import { SIZES, COLORS, FONT } from "../../../utils/theme";
import { mapStyle } from "../../../utils/globalMapSyle";
import styles from "./Details.style";
import * as Location from "expo-location";
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("window");

const Mapview = ({ route, navigation }) => {
  let coordinate = useSelector(
    (state) => state?.utilityReducer?.userGeoAddress,
  );
  let homepagepost = useSelector(
    (state) => state.MainScreenReducer.homepagepost,
  );

  const storeCoordinat = {
    latitude: coordinate?.latitude,
    longitude: coordinate?.longitude,
  };

  const [region, setRegion] = useState({
    latitude: storeCoordinat?.latitude,
    longitude: storeCoordinat?.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const mapRef = useRef(null);

  const handleZoomToMyLocation = async () => {
    const getPermission = await Location.requestForegroundPermissionsAsync();
    if (getPermission) {
      const { coords } = await Location.getCurrentPositionAsync({});
      let { longitude, latitude } = coords;

      const region = {
        latitude,
        longitude,
        latitudeDelta: 0.05, // Adjust the zoom level as desired
        longitudeDelta: 0.05, // Adjust the zoom level as desired
      };
      mapRef.current.animateToRegion(region, 1000);
    } else {
      navigation.goBack();
    }
  };

  const zoomIn = () => {
    setRegion((prevRegion) => {
      const newDelta = Math.max(prevRegion.latitudeDelta * 0.9, 0.01);
      const aspectRatio =
        Dimensions.get("window").width / Dimensions.get("window").height;
      const newRegion = {
        ...prevRegion,
        latitudeDelta: newDelta,
        longitudeDelta: newDelta * aspectRatio,
      };
      mapRef.current.animateToRegion(newRegion, 1000);
      return newRegion;
    });
  };
  const zoomOut = () => {
    setRegion((prevRegion) => {
      const newDelta = prevRegion.latitudeDelta / 0.9;
      const aspectRatio =
        Dimensions.get("window").width / Dimensions.get("window").height;
      const newRegion = {
        ...prevRegion,
        latitudeDelta: newDelta,
        longitudeDelta: newDelta * aspectRatio,
      };
      mapRef.current.animateToRegion(newRegion, 1000);
      return newRegion;
    });
  };

  return (
    <View style={{ backgroudColor: "#efffff", flex: 1 }}>
      <MapView
        ref={mapRef}
        loadingEnabled={true}
        style={styles.map}
        customMapStyle={mapStyle}
        initialRegion={region}
        region={region}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={true}
        zoomControlEnabled={true}
        // zoomTapEnabled={true}
        scrollEnabled={true}
        showsScale={true}
        showsUserLocation={true}
        followsUserLocation={true}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}>
        {storeCoordinat?.latitude !== null && (
          <Marker
            draggable={true}
            coordinate={storeCoordinat}
            identifier='origin'>
            <Callout>
              <HStack p={"2"}>
                <FontAwesome5
                  name='user-tie'
                  size={24}
                  color={COLORS.primaryColor}
                />
                <Text>Your are here</Text>
              </HStack>
            </Callout>
          </Marker>
        )}

        {homepagepost?.map((item, i) => {
          return (
            <Marker
              key={item._id}
              draggable={true}
              anchor={{ x: 0.5, y: 0.5 }}
              coordinate={{
                latitude: item?.location?.coordinates[0],
                longitude: item?.location?.coordinates[1],
              }}>
              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 1,
                }}>
                <Image
                  source={require("../../../assets/leaf.png")}
                  style={{
                    width: 35,
                    height: 35,
                  }}
                />
              </View>
              <Callout>
                <Stack width={170}>
                  <Text style={styles.postName}>{item?.post?.area}</Text>
                  <Text
                    style={{
                      fontSize: 12,
                    }}>
                    {item?.post?.city}
                  </Text>
                </Stack>
              </Callout>
            </Marker>
          );
        })}

        <Circle
          center={storeCoordinat}
          radius={100}
          strokeColor={"black"}
          strokeWidth={1}
        />
      </MapView>

      <View style={styles.topHeader}>
        <View style={styles.inHead} className='align-middle'>
          <TouchableOpacity
            className='rounded-full p-2'
            onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back-outline' size={34} color='black' />
          </TouchableOpacity>
        </View>
      </View>

      <Center
        style={{
          ...(Platform.OS === "android"
            ? {
                alignSelf: "center",
                position: "absolute",
                bottom: 10,
              }
            : { position: "absolute", bottom: 10, alignSelf: "center" }),
        }}>
        <HStack space={2}>
          <CommonButton
            onPress={handleZoomToMyLocation}
            title={"Recenter"}
            style={{
              width: width / 2.5,
              marginTop: 10,
              borderRadius: 10,
              backgroundColor: COLORS.verbBasePrimaryColor,
              height: 50,
              gap: 10,
            }}
            icon={<FontAwesome name='location-arrow' size={24} color='white' />}
          />
          <CommonButton
            onPress={zoomOut}
            title={"Out"}
            style={{
              width: width / 4,
              marginTop: 10,
              borderRadius: 10,
              backgroundColor: COLORS.verbBasePrimaryColor,
              height: 50,
              gap: 10,
            }}
          />
          <CommonButton
            onPress={zoomIn}
            title={"In"}
            style={{
              width: width / 4,
              marginTop: 10,
              borderRadius: 10,
              backgroundColor: COLORS.verbBasePrimaryColor,
              height: 50,
              gap: 10,
            }}
          />
        </HStack>
      </Center>
    </View>
  );
};

export default memo(Mapview);
