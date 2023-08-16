import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, StatusBar, Text } from "react-native";
import { HStack, Spinner } from "native-base";
import {
  SettingScreen,
  AuthLogin,
  AuthRegister,
  ForgetPassword,
  ChangePassword,
  MyProfile,
  ProfileScreen,
  FindSchools,
  CityScreen,
  FilterScreen,
  ViewAllScreen,
  FeedbackScreen,
  BoardScreen,
  Addpost,
  MapViewScreen,
  DetailsScreen,
} from "../screens";
import BottomTab from "../components/bottomTab/BottomTab";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab2 from "../components/bottomTab/BottomTab2";
import { COLORS } from "../utils/theme";
const Stack = createNativeStackNavigator();

const NonAuthStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const options = {
  headerShown: false,
};

function NonAuthStackNavigator() {
  return (
    <NonAuthStack.Navigator initialRouteName="Login" screenOptions={options}>
      <Stack.Screen name="Login" component={AuthLogin} />
      <Stack.Screen name="Register" component={AuthRegister} />
      <Stack.Screen name="Forget" component={ForgetPassword} />
    </NonAuthStack.Navigator>
  );
}
// screenOptions = { options };
function AuthStackNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="BottomTab" screenOptions={options}>
      <Stack.Screen name="Schools" component={FindSchools} />
      <Stack.Screen name="postDetails" component={DetailsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="SelectCity" component={CityScreen} />
      <Stack.Screen name="SelectBoard" component={BoardScreen} />
      <Stack.Screen name="SelectFilter" component={FilterScreen} />
      <Stack.Screen name="ViewAllScreen" component={ViewAllScreen} />
      <Stack.Screen name="MapView" component={MapViewScreen} />
      <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
      <Stack.Screen name="AddPost" component={Addpost} />
      <Stack.Screen name="BottomTab" component={BottomTab2} />
    </AuthStack.Navigator>
  );
}

function InsideStack() {
  const { isLoggedIn } = useSelector((data) => data.mainreducer);

  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(false);

  async function isAuthenticated() {
    setLoading(true);
    let storeLog = await AsyncStorage.getItem("isLoggedin");
    setLogged(isLoggedIn || (storeLog === "true" ? true : false));
    setLoading(false);
  }
  useEffect(() => {
    isAuthenticated();
  }, [isLoggedIn, logged]);

  if (loading) {
    return (
      <HStack
        space={3}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.backgoundAndStatusbar,
        }}
      >
        <StatusBar
          networkActivityIndicatorVisible={true}
          animated={true}
          backgroundColor={COLORS.backgoundAndStatusbar}
          barStyle={"default"}
          showHideTransition={"fade"}
          hidden={false}
        />
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Loading
        </Text>
        <Spinner size="lg" />
      </HStack>
    );
  }
  return (
    <NavigationContainer>
      {logged ? <AuthStackNavigator /> : <NonAuthStackNavigator />}
    </NavigationContainer>
  );
}

export default InsideStack;
