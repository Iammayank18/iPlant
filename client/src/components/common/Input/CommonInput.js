import { View, TextInput, Image, Text } from "react-native";
import React, { useCallback } from "react";
import InputStyle from "./commonInput.style";
import { FONT } from "../../../utils/theme";
const CommonInput = ({
  leftIcon,
  rightIcon,
  placeholder,
  placeholderColor,
  onChangeText,
  onBlur,
  value,
  autoCapitalize,
  style,
  inputLable,
  secureTextEntry,
  autoCorrect,
  numberOfLines,
  inpurtStyle,
  defaultValue,
  disabled,
}) => {
  return (
    <>
      <Text style={InputStyle.inputLabel}>{inputLable}</Text>
      <View style={[style, InputStyle.textInput]}>
        {leftIcon}
        <TextInput
          multiline
          defaultValue={defaultValue}
          value={value}
          numberOfLines={numberOfLines}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor}
          placeholderStyle={{
            fontFamily: "DMRegular",
          }}
          secureTextEntry={secureTextEntry}
          autoCapitalize={"none"}
          onChangeText={onChangeText}
          onBlur={onBlur}
          style={[
            inpurtStyle,
            {
              fontFamily: FONT.PoppinsRegular,
              flex: 1,
            },
          ]}
          autoCorrect={autoCorrect}
        />
        {rightIcon}
      </View>
    </>
  );
};

export default React.memo(CommonInput);
