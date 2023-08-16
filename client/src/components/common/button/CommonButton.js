import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import CommonButtonStyle from "./CommonButton.style";
import { COLORS } from "../../../utils/theme";
const CommonButton = ({
  title,
  isValid,
  loader,
  onPress,
  style,
  icon,
  textStyle,
  disabled,
  loaderColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: COLORS.verbBasePrimaryColor,
          justifyContent: "center",
          alignItems: "center",
          // minHeight: 48,
          // marginTop: 20,
          flexDirection: "row",
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || isValid}
    >
      {loader && (
        <ActivityIndicator
          size={"small"}
          color={loaderColor ?? "gray"}
          style={{
            marginRight: 10,
          }}
        />
      )}
      {icon}
      <Text style={[CommonButtonStyle.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(CommonButton);
