import { StyleSheet } from "react-native";
import { FONT, SIZES, COLORS } from "../../utils/theme";
const styles = StyleSheet.create({
  loader: {
    width: 270,
    height: 270,
    backgroundColor: "#eee",
  },
  loaderTest: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large,
    color: COLORS.primary,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: FONT.medium,
  },
});

export default styles;
