import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as yup from "yup";
import { Formik } from "formik";

import React, { useState } from "react";
import { ScrollView, Spinner, Stack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import EmailIcon from "../../assets/iconEmail.png";
import style from "./AuthStyle";
import { BASE_URL } from "../../utils/baseUrl";
import CommonInput from "../../components/common/Input/CommonInput";
import { COLORS } from "../../utils/theme";

let ForgettEmailValidator = yup.object().shape({
  email: yup
    .string()
    .email("please enter a valid email")
    .required("email is required"),
});
let ForgettOtpValidator = yup.object().shape({
  otp: yup.number("Please enter number only!").required("Otp is required"),
});
let ForgettPassValidator = yup.object().shape({
  password: yup
    .string()
    .min(6)
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least aone uppercase, one number and one special case character",
    ),
  confirmPassword: yup
    .string()
    .min(6)
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least aone uppercase, one number and one special case character",
    ),
});

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [showPass1, setShowPass1] = useState(true);
  const [showPass2, setShowPass2] = useState(true);

  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const [otpBtn, setOtpbtn] = useState(true);
  const [verifyOtp, setVerifyOtpbtn] = useState(false);
  const [resetPasswordbtn, setResetPasswordbtn] = useState(false);

  const [otpInput, setOtpInput] = useState(false);

  const [verifyOtpInput, setVerifyOtpInput] = useState(false);

  const [otpLoader, setOtpLoader] = useState(false);

  /*=====================
for forgett process
================*/
  const [showEmailDiv, setEmailDiv] = useState(true);
  const [showPassDiv, setPassDiv] = useState(false);
  const [showOtpDiv, setOtpDiv] = useState(false);

  /*=====================
for forgett process end
================*/

  async function ReSendOtp() {
    const emailRegex = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      "gm",
    );

    if (emailRegex.test(email)) {
      setOtpLoader(true);
      //   dispatch(MainAction.FetchSendResetPasswordEmailOtp({ email: email }));
      const apiRes = await axios.post(
        BASE_URL + "api/user/sendotp_forget_password",
        {
          email: email,
        },
      );
      try {
        if (apiRes.data === "success") {
          alert("Otp resent successfully");
          setOtpbtn(false);
          setOtpLoader(false);
          setVerifyOtpbtn(true);
          setOtpInput(true);
        } else if (apiRes.data === "Email Already exist") {
          setOtpbtn(true);
          setOtpLoader(false);
        }
      } catch (error) {}
    } else {
      alert("Please enter a valid email address");
    }
  }

  const EnterEmailBox = () => {
    return (
      <>
        <Stack position={"absolute"} top={10} left={6}>
          <AntDesign
            name='arrowleft'
            color={"#323232"}
            size={30}
            onPress={() => navigation.goBack()}
          />
        </Stack>
        <Stack style={styles.logoContainer}>
          <Text
            style={{
              fontSize: 28,
              fontFamily: "DMMedium",
              marginBottom: 30,
              color: "#000000",
            }}>
            Forgot password
          </Text>
        </Stack>

        <Stack marginTop={10}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "DMRegular",
              marginBottom: 9,
              textAlign: "center",
            }}>
            Enter Email Address
          </Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={90}
            enabled={true}>
            <Formik
              initialValues={{ email: "" }}
              onSubmit={async (values) => {
                setEmail(values.email);
                const emailRegex = new RegExp(
                  /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
                  "gm",
                );

                if (emailRegex.test(values.email)) {
                  setOtpLoader(true);
                  //   dispatch(MainAction.FetchSendResetPasswordEmailOtp({ email: email }));
                  const apiRes = await axios.post(
                    BASE_URL + "api/user/sendotp_forget_password",
                    {
                      email: values.email,
                    },
                  );

                  try {
                    if (apiRes.data === "success") {
                      alert("Otp sent successfully");
                      // setOtpbtn(false);
                      setOtpLoader(false);
                      // setVerifyOtpbtn(true);
                      // setOtpInput(true);
                      setOtpDiv(true);
                      setEmailDiv(false);
                    } else if (apiRes.data === "Email Already exist") {
                      setOtpbtn(true);
                      setOtpLoader(false);
                    }
                  } catch (error) {}
                } else {
                  alert("Please enter a valid email address");
                }
              }}
              validationSchema={ForgettEmailValidator}
              validateOnMount={true}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                isValid,
                errors,
                touched,
                isSubmitting,
              }) => (
                <View>
                  <View style={style.textInput}>
                    <Image
                      source={EmailIcon}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                      resizeMode='contain'
                    />
                    <TextInput
                      placeholder='Email Address'
                      placeholderTextColor={"#CDCDCD"}
                      autoCapitalize='none'
                      textContentType='emailAddress'
                      value={values.email}
                      // onChangeText={(text) => setEmail(text)}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                    />
                  </View>
                  {errors.email && touched.email && (
                    <Text style={style.errors}>{errors.email}</Text>
                  )}

                  <TouchableOpacity
                    disabled={!isValid}
                    style={{
                      backgroundColor:
                        !isValid || otpLoader ? "#d3d3d3" : "#0E2528",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: 48,
                      borderRadius: 12,
                      marginTop: 20,
                      flexDirection: "row",
                    }}
                    onPress={handleSubmit}>
                    <Stack direction={"row"} space={2}>
                      {otpLoader && <Spinner color='indigo.500' />}

                      <Text style={style.buttonText}>Send otp</Text>
                    </Stack>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </Stack>
      </>
    );
  };

  const EnterOtpBox = () => {
    return (
      <>
        <Stack position={"absolute"} top={10} left={6}>
          <AntDesign
            name='arrowleft'
            color={"#323232"}
            size={30}
            onPress={() => navigation.goBack()}
          />
        </Stack>

        <Stack style={styles.logoContainer}>
          <Text
            style={{
              fontSize: 28,
              fontFamily: "DMMedium",
              marginBottom: 30,
              color: "#000000",
            }}>
            Verification
          </Text>
        </Stack>

        <Stack marginTop={10}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "DMRegular",
              marginBottom: 9,
              textAlign: "center",
            }}>
            Enter Verification Cade
          </Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={90}
            enabled={true}>
            <Formik
              initialValues={{ otp: "" }}
              onSubmit={async (values) => {
                setOtpLoader(true);
                const apiRes = await axios.post(
                  BASE_URL + "api/user/forget_password_verifyotp",
                  {
                    email: email,
                    otp: values.otp,
                  },
                );

                try {
                  if (apiRes.data.msg == "invalid otp") {
                    setOtpLoader(false);
                    alert("Invalid otp");
                  } else if (apiRes.data.msg === "otp verified successfully") {
                    alert("Otp verified successfully");
                    setOtpLoader(false);
                    setVerifyOtpbtn(false);
                    // setResetPasswordbtn(true);
                    // setVerifyOtpInput(true);

                    setEmailDiv(false);
                    setPassDiv(true);
                    setOtpDiv(false);
                  }
                } catch (error) {}
              }}
              validationSchema={ForgettOtpValidator}
              validateOnMount={true}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                isValid,
                errors,
                touched,
                isSubmitting,
              }) => (
                <>
                  <View style={style.textInput}>
                    <TextInput
                      placeholder='OTP'
                      placeholderTextColor={"#CDCDCD"}
                      autoCapitalize='none'
                      onChangeText={handleChange("otp")}
                      onBlur={handleBlur("otp")}
                      value={values.otp}
                      style={{
                        flex: 1,
                      }}
                    />
                  </View>
                  {errors.otp && touched.otp && (
                    <Text style={style.errors}>{errors.otp}</Text>
                  )}
                  {!verifyOtpInput && (
                    <TouchableOpacity
                      onPress={ReSendOtp}
                      style={{
                        marginBottom: 5,
                      }}>
                      <Stack
                        direction={"row"}
                        alignItems='center'
                        justifyContent='flex-end'
                        space={2}>
                        <MaterialIcons name='replay' size={19} color='black' />
                        <Text>Resend otp</Text>
                      </Stack>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    disabled={!isValid || otpLoader}
                    style={{
                      backgroundColor:
                        !isValid || otpLoader ? "#d3d3d3" : "#0E2528",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: 48,
                      borderRadius: 12,
                      // marginTop: 20,
                      flexDirection: "row",
                    }}
                    onPress={handleSubmit}>
                    <Stack direction={"row"} space={2}>
                      {otpLoader && <Spinner color='indigo.500' />}
                      <Text style={style.buttonText}>Verify otp</Text>
                    </Stack>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </Stack>
      </>
    );
  };

  const EnterPasswordBox = () => {
    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(true);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async () => {};

    const handlePasswordChange = (value) => {
      setPassword(value);
    };

    const handleConfirmPasswordChange = (value) => {
      setConfirmPassword(value);
    };

    return (
      <>
        {/* ... */}
        <Stack position={"absolute"} top={10} left={6}>
          <AntDesign
            name='arrowleft'
            color={"#323232"}
            size={30}
            onPress={() => navigation.goBack()}
          />
        </Stack>
        <Stack style={styles.logoContainer}>
          <Text
            style={{
              fontSize: 28,
              fontFamily: "DMMedium",
              marginBottom: 30,
              color: "#000000",
            }}>
            Reset Password
          </Text>
        </Stack>
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          onSubmit={handleSubmit}
          validationSchema={ForgettPassValidator}>
          {({ handleChange, handleBlur, values, isValid, errors, touched }) => (
            <View>
              <View>
                <Stack>
                  <CommonInput
                    inputLable={"Password"}
                    placeholder={"Password"}
                    onChangeText={(value) => {
                      handlePasswordChange(value);
                      handleChange("password")(value);
                    }}
                    onBlur={handleBlur("password")}
                    value={password}
                    placeholderColor={COLORS?.placeholderColor}
                    secureTextEntry={showPass1}
                    // ...
                  />
                </Stack>
                {errors.password && touched.password && (
                  <Text style={style.errors}>{errors.password}</Text>
                )}
                <Stack marginTop={3}>
                  <CommonInput
                    inputLable={"Confirm Password"}
                    placeholder='Confirm Password'
                    onChangeText={(value) => {
                      handleConfirmPasswordChange(value);
                      handleChange("confirmPassword")(value);
                    }}
                    onBlur={handleBlur("confirmPassword")}
                    value={confirmPassword}
                    placeholderColor={COLORS?.placeholderColor}
                    secureTextEntry={showPass2}
                    // ...
                  />
                </Stack>
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={style.errors}>{errors.confirmPassword}</Text>
                )}
              </View>
              <View style={{ paddingBottom: 30 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      !isValid || otpLoader ? "#d3d3d3" : "#0E2528",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 48,
                    borderRadius: 12,
                    marginTop: 20,
                    flexDirection: "row",
                  }}
                  onPress={handleSubmit}
                  disabled={!isValid || otpLoader}>
                  {otpLoader && <Spinner mr={2} />}

                  <Text style={style.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </>
    );
  };

  return (
    <ScrollView style={style.container}>
      <View style={styles.textInputContainer}>
        {showEmailDiv && <EnterEmailBox />}
        {showOtpDiv && <EnterOtpBox />}
        {showPassDiv && <EnterPasswordBox />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 160,
  },
  loginImage: {
    width: 100,
    height: 100,
    marginTop: 50,
  },
  textInput: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#eaeaea",
    marginBottom: 10,
    borderWidth: 0,
  },
  textInputPassword: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#eaeaea",
    marginBottom: 10,
    borderWidth: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInputContainer: {
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  button: {
    backgroundColor: "#0D4C92",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 48,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  googleLog: {
    flexDirection: "row",
    backgroundColor: "#e2e2e2",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 42,
    borderRadius: 8,
    marginTop: 10,
    padding: 10,
    paddingHorizontal: 35,
  },
  googleText: {
    color: "grey",
    fontWeight: "bold",
    alignItems: "center",
  },
  facebookLog: {
    flexDirection: "row",
    backgroundColor: "#e2e2e2",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 42,
    borderRadius: 8,
    marginTop: 10,
    padding: 10,
    paddingHorizontal: 35,
  },
  facebooktext: {
    color: "grey",
    fontWeight: "bold",
    alignItems: "center",
  },
  errors: {
    color: "#E0144C",
    marginTop: -6,
    marginBottom: 10,
    fontWeight: "400",
  },
});

export default ForgetPassword;
