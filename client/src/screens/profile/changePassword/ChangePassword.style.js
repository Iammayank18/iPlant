import { StyleSheet } from "react-native";
import { COLORS } from "../../../utils/theme";
const styles = StyleSheet.create({
  textInput: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#eaeaea",
    marginBottom: 10,
    borderWidth: 0,
  },
  container: {
    padding: 5,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  btn: {
    backgroundColor: COLORS.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 48,
    borderRadius: 8,

    flexDirection: "row",
  },
});

export default styles;
