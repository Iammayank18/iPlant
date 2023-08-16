import React, { useState } from "react";
// import { Center, Modal } from "native-base";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  NativeBaseProvider,
} from "native-base";
import { View, Pressable, Text, Dimensions, StyleSheet } from "react-native";
import styles from "./Details.style";
import CommonButton from "../../../components/common/button/CommonButton";
import CommonInput from "../../../components/common/Input/CommonInput";
const { width } = Dimensions.get("window");
const CallBackModal = ({ modalVisible, setModalVisible }) => {
  return (
    <Center>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Request a callback</Modal.Header>
          <Modal.Body>
            <CommonInput />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2} justifyContent={"space-between"}>
              <CommonButton title={"send"} style={btnStyle.btn} />
              <CommonButton
                title={"Cancel"}
                style={[
                  btnStyle.btn,
                  {
                    backgroundColor: "white",
                    borderWidth: 1,
                  },
                ]}
                textStyle={{
                  color: "black",
                }}
              />
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

const btnStyle = StyleSheet.create({
  btn: {
    width: width / 4.5,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#45CFDD",
    height: 40,
  },
});

export default CallBackModal;
