const VerifyOtp = async () => {
  setOtpLoader(true);

  const apiRes = await axios.post(
    BASE_URL + "api/user/forget_password_verifyotp",
    {
      email: email,
      otp: otp,
    }
  );
  console.log(apiRes);
  try {
    if (apiRes.data.msg == "invalid otp") {
      setOtpLoader(false);
      alert("Invalid otp");
    } else if (apiRes.data.msg === "otp verified successfully") {
      alert("Otp verified successfully");
      setOtpLoader(false);
      setVerifyOtpbtn(false);
      setResetPasswordbtn(true);
      setVerifyOtpInput(true);
    }
  } catch (error) {
    console.log(error);
  }
};

const ResetPassword = async () => {
  setOtpLoader(true);
  const apiRes = await axios.post(BASE_URL + "api/user/reset_password", {
    email: email,
    password: password.password,
    confirmpassword: password.confirmPassword,
  });
  console.log(apiRes);

  try {
    if (apiRes.data.msg === "password updated successfully") {
      setOtpLoader(false);
      alert("Password updated successfully");
      setTimeout(() => {
        navigation.navigate("Login");
      }, 1200);
      // setVerifyOtpbtn(true);
    }
  } catch (error) {
    console.log(error);
  }
};

const SendOtp = async () => {
  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );

  if (emailRegex.test(email)) {
    setOtpLoader(true);
    //   dispatch(MainAction.FetchSendResetPasswordEmailOtp({ email: email }));
    const apiRes = await axios.post(
      BASE_URL + "api/user/sendotp_forget_password",
      {
        email: email,
      }
    );
    try {
      if (apiRes.data === "success") {
        alert("Otp sent successfully");
        setOtpbtn(false);
        setOtpLoader(false);
        setVerifyOtpbtn(true);
        setOtpInput(true);
      } else if (apiRes.data === "Email Already exist") {
        setOtpbtn(true);
        setOtpLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("Please enter a valid email address");
  }
};

<View className="flex flex-row justify-between align-middle pt-8 px-3">
  <Pressable
    onPress={() => navigation.navigate("Profile")}
    className="flex flex-row justify-between align-middle"
  >
    <View>
      <Image
        source={{
          uri: "https://wallpaperaccess.com/full/317501.jpg",
        }}
        alt="Alternate Text"
        style={{
          width: 50,
          height: 50,
          borderRadius: 50,
          marginRight: 10,
          borderWidth: 3,
          borderColor: "#59C1BD",
        }}
      />
    </View>
    <View>
      <Text>
        Hello <FontAwesome name="hand-peace-o" size={15} color="#0D4C92" />
      </Text>
      <Text>Mayank</Text>
    </View>
  </Pressable>
  <View className="flex-row justify-between align-middle content-center">
    <TouchableOpacity onPress={getLocation}>
      <HStack
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        space={2}
      >
        <Stack>
          {/* <MaterialIcons
                  name="my-location"
                  size={20}
                  color={userPermission ? COLORS.danger : COLORS.gray}
                /> */}
          <FontAwesome name="map-pin" size={22} color="gray" />
          {/* <MaterialIcons name="location-pin" size={24} color="black" /> */}
          {/* <Ionicons name="location-outline" size={24} color="black" /> */}
          {/* <Entypo name="location-pin" size={28} color="black" /> */}
        </Stack>
        <Stack>
          <VStack>
            <Text
              style={{
                fontSize: 10,
                textAlign: "left",
              }}
            >
              Your City
            </Text>
            <HStack
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              space={1}
            >
              <Text>Jaipur</Text>
              <AntDesign
                name="down"
                size={15}
                color="black"
                style={{
                  marginTop: 4,
                }}
              />
            </HStack>
          </VStack>
        </Stack>
      </HStack>
    </TouchableOpacity>
  </View>
</View>;

///////////////////////
// for PermissionStatus
const checkPermission = async () => {
  const hasPermission = await Location.requestForegroundPermissionsAsync();
  if (hasPermission.status === "granted") {
    const permission = await askPermission();
    return permission;
  }
  return true;
};

const askPermission = async () => {
  const permission = await Location.requestForegroundPermissionsAsync();
  return permission.status === "granted";
};

const getLocation = async () => {
  try {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) return;
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    const jsonValue = JSON.stringify({
      latitude: latitude,
      longitude: longitude,
    });
    dispatch(
      MainAction.setOriginCoordinates({
        latitude: latitude,
        longitude: longitude,
      })
    );
    await AsyncStorage.setItem("@coordinates", jsonValue);
  } catch (err) {}
};

useEffect(() => {
  checkPermission();
  getLocation();
}, []);

//for favorite
const addToFav = (isFavorite, school) => {
  console.log(isFavorite, school);
  const payload = {
    user: selectUser?.data._id,
    school,
    isFavorite: isFavorite ? false : true,
  };

  dispatch(MainAction.FetchSchoolFav({ apiPayload: payload, page: "main" }));
  // dispatch(MainAction.FetchSchoolFav(payload))
};

// ===================
<Stack px={5} mt={5} mb={4}>
  <TouchableOpacity
    style={[
      styles.locationContainer,
      {
        backgroundColor: loading1
          ? COLORS.verbBaseSecondaryColor
          : COLORS.verbBasePrimaryColor,
      },
    ]}
    onPress={detectLocation}
    disabled={loading1}
  >
    <HStack alignItems={"center"} space={3}>
      {loading1 ? (
        <ActivityIndicator color={"white"} />
      ) : permissionGranted ? (
        <MaterialIcons
          name="my-location"
          size={20}
          color={loading1 ? "gray" : "white"}
        />
      ) : (
        <MaterialIcons
          name="location-searching"
          size={20}
          color={loading1 ? "gray" : "white"}
        />
      )}
      <Text
        style={{
          color: "white",
          fontFamily: FONT.medium,
        }}
      >
        Use my current location
      </Text>
    </HStack>
  </TouchableOpacity>
</Stack>;
