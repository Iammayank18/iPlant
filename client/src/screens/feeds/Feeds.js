import { View, Text } from "native-base";
import React from "react";
import Navheader from "../../components/navHeader/Navheader";

const Feeds = ({ navigation }) => {
  return (
    <View>
      <Navheader title={"Feeds"} navigation={() => navigation.goBack()} />
      <Text>Feeds</Text>
    </View>
  );
};

export default Feeds;
