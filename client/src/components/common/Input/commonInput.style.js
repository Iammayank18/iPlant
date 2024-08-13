import { StyleSheet } from "react-native";
const InputStyle = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
    marginBottom: 50,
  },

  textInput: {
    borderRadius: 16,
    // padding: 12,
    // backgroundColor: "#eaeaea",
    marginBottom: 15,
    // borderWidth: 0,
    borderColor: "#CDCDCD",

    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
    gap: 10,
    paddingHorizontal: 15,
  },
  iconSize: {
    width: 20,
    height: 22,
  },
  textInputPassword: {
    borderRadius: 16,
    // padding: 12,
    // backgroundColor: "#eaeaea",
    marginBottom: 10,
    // borderWidth: 0,
    borderColor: "#CDCDCD",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
    gap: 10,
    paddingHorizontal: 15,
  },
  textInputContainer: {
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 400,
    marginBottom: 3,
    fontFamily: "DMRegular",
  },
  errors: {
    color: "#E0144C",
    marginTop: -6,
    marginBottom: 10,
    fontWeight: "400",
    marginLeft: 10,
  },
});

export default InputStyle;
