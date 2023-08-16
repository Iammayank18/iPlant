import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Switch,
  StatusBar,
  Dimensions,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import React, { useState } from "react";
import Navheader from "../../../components/navHeader/Navheader";
import { Stack, Modal, TextField, HStack } from "native-base";
import { COLORS } from "../../../utils/theme";
import { SettingsModal } from "./SettingModals";

import withHOC from "../../utilityScreen/HOC";
const { width, height } = Dimensions.get("window");
function SettingScreen({ navigation }) {
  const [showAbout, setShowAbout] = useState(false);
  const [showDataConsent, setShowDataConsent] = useState(false);
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  let Allcolor = isEnabled ? "black" : "gray";
  return (
    <View
      style={{
        backgroundColor: COLORS.verbScreenBG,
        flex: 1,
      }}
    >
      <Navheader title={"Setting"} navigation={() => navigation.goBack()} />
      <SafeAreaView>
        <View style={style.container}>
          {/* <Pressable style={style.userPShadow}>
            <View style={style.userP}>
              <View>
                <Stack direction={"row"} space={2}>
                  <Text>Enable Darkmode</Text>
                </Stack>
              </View>
              <View style={{ padding: 0, margin: 0 }}>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>
          </Pressable> */}

          <TouchableOpacity onPress={() => setShowTermsAndConditions(true)}>
            <HStack
              justifyContent={"space-between"}
              alignItems={"center"}
              style={style.userPShadow}
            >
              <Stack direction={"row"} space={2}>
                <Text>Terms & Conditions</Text>
              </Stack>
              <Entypo name="chevron-thin-right" size={13} color="grey" />
            </HStack>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowPrivacyPolicy(true)}>
            <HStack
              justifyContent={"space-between"}
              alignItems={"center"}
              style={style.userPShadow}
            >
              <Stack direction={"row"} space={2}>
                <Text>Privacy Policy</Text>
              </Stack>
              <Entypo name="chevron-thin-right" size={13} color="grey" />
            </HStack>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowDataConsent(true)}>
            <HStack
              justifyContent={"space-between"}
              alignItems={"center"}
              style={style.userPShadow}
            >
              <Stack direction={"row"} space={2}>
                <Text>Data Consent</Text>
              </Stack>
              <Entypo name="chevron-thin-right" size={13} color="grey" />
            </HStack>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowAbout(true)}>
            <HStack
              justifyContent={"space-between"}
              alignItems={"center"}
              style={style.userPShadow}
            >
              <Stack direction={"row"} space={2}>
                <Text>About</Text>
              </Stack>
              <Entypo name="chevron-thin-right" size={13} color="grey" />
            </HStack>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <SettingsModal
        showModal={showAbout}
        setShowModal={setShowAbout}
        title={"About us"}
        para={
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non a
            voluptate ratione omnis odit obcaecati consequuntur provident fugit
            animi sed doloremque, laboriosam dignissimos vitae repellendus.
          </Text>
        }
      />
      <SettingsModal
        showModal={showDataConsent}
        setShowModal={setShowDataConsent}
        title={"Data consent"}
        para={
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non a
            voluptate ratione omnis odit obcaecati consequuntur provident fugit
            animi sed doloremque, laboriosam dignissimos vitae repellendus.
          </Text>
        }
      />

      <SettingsModal
        showModal={showTermsAndConditions}
        setShowModal={setShowTermsAndConditions}
        title={"Terms and conditions"}
        para={
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non a
            voluptate ratione omnis odit obcaecati consequuntur provident fugit
            animi sed doloremque, laboriosam dignissimos vitae repellendus.
          </Text>
        }
      />
      <SettingsModal
        showModal={showPrivacyPolicy}
        setShowModal={setShowPrivacyPolicy}
        title={"Privacy Policy"}
        para={
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Non a
            voluptate ratione omnis odit obcaecati consequuntur provident fugit
            animi sed doloremque, laboriosam dignissimos vitae repellendus.
          </Text>
        }
      />
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    backgroundColor: "white",
    shadowColor: COLORS.verbGray,
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
    width: width / 1.1,
    alignSelf: "center",
    marginTop: 20,
  },
  profile: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    borderColor: "#EFF5F5",
  },

  userPShadow: {
    padding: 10,
    paddingVertical: 15,
  },
  topHeader: {
    height: 150,
    borderWidth: 1,
    borderColor: "#CFF5E7",
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
    backgroundColor: "#59C1BD",
    marginBottom: 20,
  },
  inHead: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 50,
    left: 20,
  },
  profilePic: {
    marginTop: -70,
    marginBottom: 20,
  },
});

export default withHOC(SettingScreen);
