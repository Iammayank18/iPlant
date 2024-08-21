import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { Stack, HStack, Center } from "native-base";

import EmailIcon from "../../../assets/iconEmail.png";
import usePassIcon from "../../../assets/user-pass.png";
import usePassEye from "../../../assets/eye-pass.png";
import usePassEyeClose from "../../../assets/eye-pass-close.png";
import { useDispatch, useSelector } from "react-redux";
import CommonInput from "../../../components/common/Input/CommonInput";
import CommonButton from "../../../components/common/button/CommonButton";
import { COLORS, FONT } from "../../../utils/theme";
import style from "../AuthStyle";
import { LoginActions } from "../redux/action";

let LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("please enter a valid email")
    .required("email is required"),
  password: yup.string().required(),
});

const { width } = Dimensions.get("window");
const AuthLogin = ({ navigation }) => {
  const dispatch = useDispatch();
  const logres = useSelector((state) => state.loginreducer);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (logres?.response?.msg) {
      setTimeout(() => {
        dispatch(LoginActions.loginReqFailed({}));
      }, 1000);
    }
  }, [dispatch, logres?.response]);

  return (
    <ScrollView style={style.container}>
      <Stack style={style.logoContainer}>
        <HStack>
          <Text
            style={{
              color: COLORS.gray,
              fontSize: 45,
              fontFamily: FONT.PoppinsBold,
            }}>
            iPlant
          </Text>
          <Image
            source={require("../../../assets/leaf.png")}
            alt='Alternate Text'
            style={{
              width: 35,
              height: 35,
            }}
          />
        </HStack>
        <Text
          style={{
            fontSize: 18,
            fontFamily: FONT.PoppinsMedium,
            color: COLORS.verbGray,
            marginTop: 10,
            textAlign: "center",
          }}>
          Login to your accout.
        </Text>
      </Stack>
      <Stack>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              dispatch(
                LoginActions.loginRequest({ ...values, authType: "email" }),
              );
            }}
            validationSchema={LoginSchema}
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
              <View style={style.textInputContainer}>
                <View>
                  <Stack>
                    <CommonInput
                      inputLable={"Email Address"}
                      placeholder='Email Address'
                      placeholderColor={COLORS?.placeholderColor}
                      style={{
                        fontFamily: "DMRegular",
                      }}
                      leftIcon={
                        <Image
                          source={EmailIcon}
                          style={style.iconSize}
                          resizeMode='stretch'
                        />
                      }
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <Text style={style.errors}>{errors.email}</Text>
                    )}
                  </Stack>

                  <Stack mt={2}>
                    <CommonInput
                      inputLable={"Password"}
                      placeholder={"Password"}
                      placeholderColor={COLORS?.placeholderColor}
                      secureTextEntry={show}
                      leftIcon={
                        <Image
                          source={usePassIcon}
                          style={style.iconSize}
                          resizeMode='stretch'
                        />
                      }
                      rightIcon={
                        values.password.length <= 0 ? null : (
                          <TouchableOpacity
                            onPress={() => {
                              setShow(!show);
                            }}>
                            {!show ? (
                              <Image
                                source={usePassEye}
                                style={{
                                  width: 20,
                                  height: 20,
                                }}
                                resizeMode='contain'
                              />
                            ) : (
                              <Image
                                source={usePassEyeClose}
                                style={{
                                  width: 20,
                                  height: 20,
                                }}
                                resizeMode='contain'
                              />
                            )}
                          </TouchableOpacity>
                        )
                      }
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                    />

                    {errors.password && touched.password && (
                      <Text style={style.errors}>{errors.password}</Text>
                    )}
                  </Stack>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}>
                    {logres?.response?.msg ? (
                      <Text style={{ color: "red" }}>
                        {logres?.response?.msg}
                      </Text>
                    ) : (
                      <Text style={{ color: "red" }}></Text>
                    )}

                    <TouchableOpacity
                      onPress={() => navigation.navigate("Forget")}
                      style={{ marginBottom: 10 }}>
                      <Text
                        style={{ color: "#1C3879", fontFamily: "DMRegular" }}>
                        Forget Password
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <CommonButton
                  title={"Login"}
                  isValid={!isValid}
                  loader={logres?.loading}
                  onPress={handleSubmit}
                  style={{
                    borderRadius: 12,
                    width: width / 1.2,
                    marginTop: 10,
                    borderRadius: 10,
                    backgroundColor:
                      !isValid || logres?.loading
                        ? COLORS.verbGray2
                        : COLORS.verbBasePrimaryColor,
                    height: 50,
                    alignSelf: "center",
                  }}
                  loaderColor={logres.loading ? "black" : "white"}
                />
                <Center style={{ paddingBottom: 30 }}>
                  <TouchableOpacity
                    style={{ marginTop: 5 }}
                    onPress={() => navigation.navigate("Register")}>
                    <Text
                      style={{
                        fontFamily: "DMMedium",
                        color: "#BABABA",
                      }}>
                      Don't have an account?{" "}
                      <Text
                        style={{ color: "#0E2528", fontFamily: "DMMedium" }}>
                        Signup
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </Center>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </Stack>
    </ScrollView>
  );
};

export default AuthLogin;
