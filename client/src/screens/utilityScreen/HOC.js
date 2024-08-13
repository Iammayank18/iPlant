import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { COLORS } from "../../utils/theme";

const withHOC = (WrappedComponent) => {
  const EnhancedComponent = (args) => {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: COLORS.backgoundAndStatusbar }}
      >
        <StatusBar
          networkActivityIndicatorVisible={true}
          animated={true}
          backgroundColor={COLORS.backgoundAndStatusbar}
          barStyle={"default"}
          showHideTransition={"fade"}
          hidden={false}
        />
        <WrappedComponent {...args} />
      </SafeAreaView>
    );
  };

  return EnhancedComponent;
};

export default withHOC;
