import { ScrollView, Stack } from "native-base";
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StatusBar,
  Dimensions,
  Platform,
  TextInput,
} from "react-native";
import { COLORS } from "../../utils/theme";
import Navheader from "../../components/navHeader/Navheader";
import CommonInput from "../../components/common/Input/CommonInput";
import CommonButton from "../../components/common/button/CommonButton";
const { width, height } = Dimensions.get("window");

const Feedback = ({ navigation }) => {
  const [feedBackData, setFeedbackData] = useState({
    subject: "",
    message: "",
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignSelf: "stretch",
      }}
    >
      <StatusBar
        networkActivityIndicatorVisible={true}
        animated={true}
        backgroundColor={COLORS.backgoundAndStatusbar}
        barStyle={"dark-content"}
        showHideTransition={"fade"}
        hidden={false}
      />
      <Navheader title={"Feedback"} navigation={() => navigation.goBack()} />
      <ScrollView>
        <Stack alignItems={"center"} mt={5}>
          <Stack
            style={{
              width: width / 1.1,
              justifyContent: "center",
            }}
          >
            {/* <CommonInput placeholder={"Full name"} inputLable={"Full name"} /> */}
            <CommonInput
              inputLable={"Subject"}
              placeholder={"Subject"}
              onChangeText={(e) =>
                setFeedbackData({ ...feedBackData, subject: e })
              }
            />
            <CommonInput
              inputLable={"Message"}
              placeholder={"Message"}
              numberOfLines={2}
              inpurtStyle={{
                height: 100,
              }}
              onChangeText={(e) => {
                setFeedbackData({ message: e });
              }}
              style={{
                borderColor: "red",
                borderWidth: 1,
              }}
            />
            <Stack alignItems={"flex-end"}>
              <Text>
                {feedBackData?.message?.split(" ").length > 50 ? (
                  <Text
                    style={{
                      color: "red",
                    }}
                  >
                    Max words exceeded
                  </Text>
                ) : (
                  feedBackData?.message?.split(" ").length + "/" + 50
                )}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </ScrollView>
      <CommonButton
        title={"Send feedback"}
        style={{
          width: width / 1.2,
          marginTop: 10,
          borderRadius: 10,
          backgroundColor:
            feedBackData?.message?.split(" ").length > 50
              ? COLORS.verbGray2
              : COLORS.verbBasePrimaryColor,
          height: 50,
          ...(Platform.OS !== "android"
            ? { alignSelf: "center" }
            : { position: "absolute", bottom: 10, alignSelf: "center" }),
        }}
        disabled={feedBackData?.message?.split(" ").length > 50}
      />
    </SafeAreaView>
  );
};

export default Feedback;
