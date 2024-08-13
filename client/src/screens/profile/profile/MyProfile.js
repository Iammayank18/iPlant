import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  RefreshControl,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import Navheader from "../../../components/navHeader/Navheader";
import { COLORS } from "../../../utils/theme";
import CommonInput from "../../../components/common/Input/CommonInput";
import { HStack, Stack, Button, Radio, Modal } from "native-base";
import CommonButton from "../../../components/common/button/CommonButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import InputStyle from "../../../components/common/Input/commonInput.style";
import style from "../../auth/AuthStyle";
import { useDispatch, useSelector } from "react-redux";
import ProfileAction from "../redux/action";
const { width } = Dimensions.get("window");

const ProfileSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Please enter a valid email"),
  phoneno: yup
    .number()
    .typeError("Please enter a valid phone number")
    .positive("Please enter a valid phone number")
    .integer("Please enter a valid phone number")
    .test(
      "len",
      "Phone number must be exactly 10 digits",
      (val) => val && val.toString().length === 10,
    ),
  postcode: yup
    .number()
    .typeError("Please enter a valid pincode")
    .positive("Please enter a valid pincode")
    .integer("Please enter a valid pincode")
    .test(
      "len",
      "Pincode must be exactly 6 digits",
      (val) => val && val.toString().length === 6,
    ),
  city: yup
    .string()
    .matches(/^[A-Za-z]+$/, "City should only contain alphabetic characters."),
  state: yup
    .string()
    .matches(/^[A-Za-z]+$/, "State should only contain alphabetic characters."),
});
const MyProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const selectUser = useSelector((state) => state?.loginreducer?.userdata);
  let { profileData, ProfleDataLoader } = useSelector(
    (state) => state?.ProfileReducer,
  );
  let coordinate = useSelector(
    (state) => state?.utilityReducer?.userGeoAddress,
  );

  useEffect(() => {
    dispatch(ProfileAction.fetchUserProfileData({ id: selectUser?.user?._id }));
    setDatePicked(profileData?.data?.dob);
    setUserType(profileData?.data?.usertype);
  }, [dispatch]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [datepick, setDatePicked] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [userType, setUserType] = useState("");
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let tempDate = new Date(date);
    let fdate =
      tempDate.getDate() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getFullYear();

    setDatePicked(fdate);

    hideDatePicker();
  };

  const updateProfile = (data) => {
    const filteredData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});

    const payload = {
      ...filteredData,
      _id: selectUser?.user?._id,
      dob: datepick,
      usertype: userType,
      country: coordinate?.country ?? "",
    };

    dispatch(ProfileAction.fetchUpdateProfile(payload));
    dispatch(ProfileAction.fetchUserProfileData({ id: selectUser?.user?._id }));
  };

  const onRefresh = () => {
    dispatch(ProfileAction.fetchUserProfileData({ id: selectUser?.user?._id }));
  };
  console.log(JSON.stringify(profileData.data));

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgoundAndStatusbar,
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
      <Navheader
        title={"Edit profile"}
        navigation={() => navigation.goBack()}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      />

      <Formik
        initialValues={{
          name: profileData?.data?.name ?? "",
          email: profileData?.data?.email ?? "",
          phoneno: profileData?.data?.phone ?? "",
          address: profileData?.data?.address ?? "",
          city: profileData?.data?.city ?? "",
          state: profileData?.data?.state ?? "",
          postcode: profileData?.data?.postcode ?? "",
        }}
        onSubmit={(values) => {
          return updateProfile(values);
        }}
        validationSchema={ProfileSchema}
        validateOnMount={true}
        enableReinitialize={true}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          errors,
          touched,
        }) => (
          <View style={style.textInputContainer}>
            <KeyboardAvoidingView
              style={{
                flex: 1,
              }}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{
                  backgroundColor: "white",

                  alignSelf: "stretch",
                  marginBottom: Platform.OS == "android" && 60,
                }}
                stickyHeaderIndices={[9]}
                refreshControl={
                  <RefreshControl
                    onRefresh={onRefresh}
                    refreshing={ProfleDataLoader}
                  />
                }>
                <CommonInput
                  placeholder='Full Name'
                  inputLable={"Full Name"}
                  placeholderColor={COLORS.placeholderColor}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {errors.name && touched.name && (
                  <Text style={style.errors}>{errors.name}</Text>
                )}

                <TouchableOpacity onPress={showDatePicker}>
                  <Stack>
                    <Text style={InputStyle.inputLabel}>Date of Birth</Text>
                  </Stack>
                  <Stack
                    style={{
                      display: "flex",
                      borderRadius: 16,
                      marginBottom: 15,
                      borderColor: "#CDCDCD",
                      borderWidth: 1,
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      padding: 10,
                      gap: 3,
                      paddingHorizontal: 15,
                    }}>
                    <TouchableOpacity onPress={showDatePicker}>
                      <Text
                        style={{
                          fontFamily: "DMMedium",
                          color: !datepick ? "#BABABA" : "#000",
                        }}>
                        {datepick ?? "Date of Birth"}
                      </Text>
                    </TouchableOpacity>
                  </Stack>
                </TouchableOpacity>
                <CommonInput
                  placeholder='Email'
                  inputLable={"Email"}
                  placeholderColor={COLORS.placeholderColor}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <Text style={style.errors}>{errors.email}</Text>
                )}
                <CommonInput
                  placeholder='Phone'
                  inputLable={"Phone"}
                  placeholderColor={COLORS.placeholderColor}
                  onChangeText={handleChange("phoneno")}
                  onBlur={handleBlur("phoneno")}
                  value={values.phoneno}
                />
                {errors.phoneno && touched.phoneno && (
                  <Text style={style.errors}>{errors.phoneno}</Text>
                )}
                <CommonInput
                  placeholder='Pincode'
                  inputLable={"Pincode"}
                  placeholderColor={COLORS.placeholderColor}
                  onChangeText={handleChange("postcode")}
                  onBlur={handleBlur("postcode")}
                  value={values.postcode}
                />
                {errors.postcode && touched.postcode && (
                  <Text style={style.errors}>{errors.postcode}</Text>
                )}
                <CommonInput
                  placeholder='City'
                  inputLable={"City"}
                  placeholderColor={COLORS.placeholderColor}
                  onChangeText={handleChange("city")}
                  onBlur={handleBlur("city")}
                  value={values.city}
                />
                {errors.city && touched.city && (
                  <Text style={style.errors}>{errors.city}</Text>
                )}
                <CommonInput
                  placeholder='State'
                  inputLable={"State"}
                  placeholderColor={COLORS.placeholderColor}
                  onChangeText={handleChange("state")}
                  onBlur={handleBlur("state")}
                  value={values.state}
                />
                {errors.state && touched.state && (
                  <Text style={style.errors}>{errors.state}</Text>
                )}
                <CommonInput
                  placeholder='Address'
                  inputLable={"Address"}
                  placeholderColor={COLORS.placeholderColor}
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  value={values.address}
                />
              </ScrollView>
            </KeyboardAvoidingView>
            <Stack pt={Platform.OS !== "android" ? 4 : 0}>
              <CommonButton
                disabled={ProfleDataLoader}
                loader={ProfleDataLoader}
                onPress={handleSubmit}
                loaderColor={"black"}
                title={"Update Personal Profle"}
                style={{
                  width: width / 1.2,
                  borderRadius: 10,
                  backgroundColor: ProfleDataLoader
                    ? COLORS.verbGray2
                    : COLORS.verbBasePrimaryColor,
                  height: 50,
                  marginBottom: -20,
                  ...(Platform.OS !== "android"
                    ? { alignSelf: "center" }
                    : {
                        position: "absolute",
                        bottom: 10,
                        alignSelf: "center",
                      }),
                }}
                textStyle={ProfleDataLoader ? "black" : "white"}
              />
            </Stack>
          </View>
        )}
      </Formik>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth='400px'>
          <Modal.CloseButton />
          <Modal.Header>User</Modal.Header>
          <Modal.Body>
            <Radio.Group
              name='myRadioGroup'
              accessibilityLabel='favorite number'
              value={userType}
              onChange={(nextValue) => {
                setUserType(nextValue);
              }}>
              <Radio shadow={2} value='student' my='2'>
                <HStack alignItems={"center"} space={2}>
                  {/* <AntDesign name="user" size={22} color="black" /> */}
                  <Text>Student</Text>
                </HStack>
              </Radio>
              <Radio shadow={2} value='parent' my='2'>
                <HStack alignItems={"center"} space={2}>
                  {/* <AntDesign name="addusergroup" size={24} color="black" /> */}
                  <Text>Parents</Text>
                </HStack>
              </Radio>
              <Radio shadow={3} value='other' my='2'>
                <HStack alignItems={"center"} space={3}>
                  {/* <AntDesign name="infocirlceo" size={20} color="black" /> */}
                  <Text>Other</Text>
                </HStack>
              </Radio>
            </Radio.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant='ghost'
                colorScheme='blueGray'
                onPress={() => {
                  setShowModal(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </SafeAreaView>
  );
};

export default MyProfile;
