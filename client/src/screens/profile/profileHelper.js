import { Ionicons, AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
export const profileArr = [
  {
    name: "Edit profile",
    preIcon: <AntDesign name="user" size={20} color="grey" />,
    posIcon: <Entypo name="chevron-thin-right" size={13} color="grey" />,
    onPress: "MyProfile",
  },
  {
    name: "Settings",
    preIcon: <AntDesign name="setting" size={20} color="grey" />,
    posIcon: <Entypo name="chevron-thin-right" size={13} color="grey" />,
    onPress: "Setting",
  },
  // {
  //   name: "Change Password",
  //   preIcon: <AntDesign name="tool" size={20} color="grey" />,
  //   posIcon: <Entypo name="chevron-thin-right" size={13} color="grey" />,
  //   onPress: "ChangePassword",
  // },
  {
    name: "Feedback",
    preIcon: <Ionicons name="md-help-circle-outline" size={20} color="grey" />,
    posIcon: <Entypo name="chevron-thin-right" size={13} color="grey" />,
    onPress: "FeedbackScreen",
  },
];
