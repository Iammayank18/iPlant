import {
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import React from "react";
import Navheader from "../../../components/navHeader/Navheader";
import styles from "./ChangePassword.style";
import CommonInput from "../../../components/common/Input/CommonInput";
import { COLORS } from "../../../utils/theme";
import { HStack, Stack } from "native-base";
import CommonButton from "../../../components/common/button/CommonButton";
const { width } = Dimensions.get("window");
const ChangePassword = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgoundAndStatusbar,
      }}
    >
      <StatusBar
        networkActivityIndicatorVisible={true}
        animated={true}
        backgroundColor={COLORS.backgoundAndStatusbar}
        barStyle={"default"}
        showHideTransition={"fade"}
        hidden={false}
      />
      <Navheader
        title={"Change Password"}
        navigation={() => navigation.goBack()}
      />

      <ScrollView style={styles.container}>
        <CommonInput
          inputLable={"Old password"}
          placeholder="Old password"
          placeholderColor={COLORS.placeholderColor}
          secureTextEntry={false}
        />
        <Stack mt={3}>
          <CommonInput
            inputLable={"New password"}
            placeholder="New password"
            placeholderColor={COLORS.placeholderColor}
            secureTextEntry={true}
          />
        </Stack>
      </ScrollView>
      {/* <HStack justifyContent={"center"}> */}
      <CommonButton
        title={"Apply"}
        style={{
          width: width / 1.2,
          marginTop: 10,
          borderRadius: 10,
          backgroundColor: COLORS.verbBasePrimaryColor,
          height: 50,
          ...(Platform.OS !== "android"
            ? { alignSelf: "center" }
            : { position: "absolute", bottom: 10, alignSelf: "center" }),
        }}
      />
      {/* </HStack> */}
    </SafeAreaView>
  );
};

export default ChangePassword;
