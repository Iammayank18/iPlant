import React, { useMemo, useCallback } from "react";
import { View, HStack, Stack } from "native-base";
import { TextInput } from "react-native";

import { StyleSheet } from "react-native";

const SearchBar = ({
  onChangeText,
  onPressIn,
  isFocused,
  ref,
  placeholder,
  leftIcon,
  rightIcon,
}) => {
  const handleChangeText = useCallback(
    (text) => {
      onChangeText(text);
    },
    [onChangeText]
  );

  return useMemo(
    () => (
      <Stack mx={5} mt={3}>
        <HStack space={3} style={style.constainer}>
          <HStack alignItems={"center"} space={2}>
            {leftIcon}
            <TextInput
              ref={ref}
              placeholder={placeholder}
              onChangeText={handleChangeText}
            />
          </HStack>
          {rightIcon}
        </HStack>
      </Stack>
    ),
    [onChangeText, ref, placeholder, leftIcon, rightIcon]
  );
};

const style = StyleSheet.create({
  constainer: {
    // paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#dbdad9",
    paddingBottom: 2,
    alignItems: "center",
    justifyContent: "space-between",
    // paddingHorizontal: 10,
    // padding: 10,
  },
});
export default SearchBar;
