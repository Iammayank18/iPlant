import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { Stack, Modal, Button, HStack, Radio, useToast } from "native-base";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";

import style from "../AuthStyle";
import { useSelector, useDispatch } from "react-redux";
import MainAction from "../../redux/action";
import CommonInput from "../../../components/common/Input/CommonInput";
import { COLORS, FONT } from "../../../utils/theme";
import usePassIcon from "../../../assets/user-pass.png";
import usePassEye from "../../../assets/eye-pass.png";
import usePassEyeClose from "../../../assets/eye-pass-close.png";
import CommonButton from "../../../components/common/button/CommonButton";
import { AntDesign, Fontisto, Feather, Entypo } from "@expo/vector-icons";
import { LoginActions } from "../redux/action";
const { width } = Dimensions.get("window");
let LoginSchema = yup.object().shape({
  email: yup.string().email("please enter a valid email").required(),
  password: yup
    .string()
    .min(6)
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least aone uppercase, one number and one special case character"
    ),
  username: yup.string().required(),
  confirmpassword: yup
    .string()
    .min(6)
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least aone uppercase, one number and one special case character"
    ),
});

const AuthRegister = ({ navigation }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [show, setShow] = useState(false);

  const RegisterRes = useSelector((data) => data?.loginreducer.registerReq);
  const RegisterLoader = useSelector(
    (data) => data?.loginreducer?.registerLoader
  );

  useEffect(() => {
    if (RegisterRes?.status === false) {
      toast.show({
        duration: 1200,
        render: () => {
          return (
            <HStack
              bg="amber.500"
              px="2"
              py="1"
              mr={2}
              rounded="sm"
              p={2}
              space={1}
              alignItems={"center"}
              height={"10"}
              justifyContent={"center"}
            >
              <Feather name="info" size={20} color="white" />
              <Text
                style={{
                  color: "white",
                  fontFamily: FONT.medium,
                }}
              >
                {RegisterRes?.msg}
              </Text>
            </HStack>
          );
        },
        placement: "top-right",
      });
      dispatch(LoginActions.setRegisterUser(null));
    } else if (RegisterRes?.msg === "user registered") {
      dispatch(LoginActions.setRegisterUser(null));
      navigation.navigate("Login");
    }
  }, [dispatch, RegisterLoader]);

  return (
    <View style={style.container}>
      <ScrollView>
        <Stack style={style.logoContainer}>
          <HStack>
            <Text
              style={{
                color: COLORS.gray,
                fontSize: 45,
                fontFamily: FONT.PoppinsBold,
              }}
            >
              iPlant
            </Text>
            <Image
              source={require("../../../assets/leaf.png")}
              alt="Alternate Text"
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
            }}
          >
            Create a accout.
          </Text>
        </Stack>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmpassword: "",
          }}
          onSubmit={(values) => {
            dispatch(LoginActions.fetchRegisterUser(values));
          }}
          validationSchema={LoginSchema}
          validateOnMount={true}
        >
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
              <KeyboardAvoidingView>
                <Stack>
                  <CommonInput
                    placeholder="Username"
                    inputLable={"Username"}
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                    placeholderColor={COLORS.placeholderColor}
                    autoCapitalize="words"
                    autoCorrect={false}
                    leftIcon={
                      <Image
                        source={usePassIcon}
                        style={style.iconSize}
                        resizeMode="stretch"
                      />
                    }
                  />
                  {errors.username && touched.username && (
                    <Text style={style.errors}>{errors.username}</Text>
                  )}
                </Stack>
                <Stack>
                  <CommonInput
                    placeholder="Email"
                    inputLable={"Email"}
                    textContentType="emailAddress"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholderColor={COLORS.placeholderColor}
                    autoCapitalize="words"
                    autoCorrect={false}
                    leftIcon={<Fontisto name="email" size={22} color="black" />}
                  />
                  {errors.email && touched.email && (
                    <Text style={style.errors}>{errors.email}</Text>
                  )}
                </Stack>

                <Stack>
                  <CommonInput
                    inputLable={"Password"}
                    placeholder={"Password"}
                    placeholderColor={COLORS?.placeholderColor}
                    secureTextEntry={show}
                    leftIcon={
                      <Image
                        source={usePassIcon}
                        style={style.iconSize}
                        resizeMode="stretch"
                      />
                    }
                    rightIcon={
                      values.password.length <= 0 ? null : (
                        <TouchableOpacity
                          onPress={() => {
                            setShow(!show);
                          }}
                        >
                          {!show ? (
                            <Image
                              source={usePassEye}
                              style={{
                                width: 20,
                                height: 20,
                              }}
                              resizeMode="contain"
                            />
                          ) : (
                            <Image
                              source={usePassEyeClose}
                              style={{
                                width: 20,
                                height: 20,
                              }}
                              resizeMode="contain"
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

                <Stack>
                  <CommonInput
                    inputLable={"Confirm Password"}
                    placeholder={"Confirm Password"}
                    placeholderColor={COLORS?.placeholderColor}
                    secureTextEntry={show}
                    leftIcon={
                      <Image
                        source={usePassIcon}
                        style={style.iconSize}
                        resizeMode="stretch"
                      />
                    }
                    rightIcon={
                      values.password.length <= 0 ? null : (
                        <TouchableOpacity
                          onPress={() => {
                            setShow(!show);
                          }}
                        >
                          {!show ? (
                            <Image
                              source={usePassEye}
                              style={{
                                width: 20,
                                height: 20,
                              }}
                              resizeMode="contain"
                            />
                          ) : (
                            <Image
                              source={usePassEyeClose}
                              style={{
                                width: 20,
                                height: 20,
                              }}
                              resizeMode="contain"
                            />
                          )}
                        </TouchableOpacity>
                      )
                    }
                    onChangeText={handleChange("confirmpassword")}
                    onBlur={handleBlur("confirmpassword")}
                    value={values.confirmpassword}
                  />
                  {errors.confirmpassword && touched.confirmpassword && (
                    <Text style={style.errors}>{errors.confirmpassword}</Text>
                  )}
                </Stack>
              </KeyboardAvoidingView>

              <View style={{ paddingBottom: 30 }}>
                <CommonButton
                  title={"Signup"}
                  isValid={!isValid}
                  loader={RegisterLoader?.loading}
                  onPress={handleSubmit}
                  style={{
                    borderRadius: 12,
                    width: width / 1.2,
                    marginTop: 10,
                    borderRadius: 10,
                    backgroundColor:
                      !isValid || RegisterLoader?.loading
                        ? COLORS.verbGray2
                        : COLORS.verbBasePrimaryColor,
                    height: 50,
                    alignSelf: "center",
                  }}
                  loaderColor={RegisterLoader?.loading ? "black" : "white"}
                />

                <View style={{ alignItems: "center" }}>
                  <Pressable
                    style={{ marginTop: 5 }}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text
                      style={{
                        fontFamily: "DMMedium",
                        color: "#BABABA",
                      }}
                    >
                      Already have an account?{" "}
                      <Text style={{ color: "#0D4C92", fontWeight: "bold" }}>
                        Login
                      </Text>
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default AuthRegister;
