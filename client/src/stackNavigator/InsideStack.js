import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { StatusBar, Text } from "react-native";
import { HStack, Spinner } from "native-base";
import {
  SettingScreen,
  AuthLogin,
  AuthRegister,
  ForgetPassword,
  ChangePassword,
  MyProfile,
  ProfileScreen,
  CityScreen,
  FilterScreen,
  ViewAllScreen,
  FeedbackScreen,
  BoardScreen,
  Addpost,
  MapViewScreen,
  DetailsScreen,
  FindPosts,
} from "../screens";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab2 from "../components/bottomTab/BottomTab2";
import { COLORS } from "../utils/theme";

const NonAuthStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const options = {
  headerShown: false,
};

function NonAuthStackNavigator() {
  return (
    <NonAuthStack.Navigator initialRouteName='Login' screenOptions={options}>
      <NonAuthStack.Screen name='Login' component={AuthLogin} />
      <NonAuthStack.Screen name='Register' component={AuthRegister} />
      <NonAuthStack.Screen name='Forget' component={ForgetPassword} />
    </NonAuthStack.Navigator>
  );
}
// screenOptions = { options };
function AuthStackNavigator() {
  return (
    <AuthStack.Navigator initialRouteName='BottomTab' screenOptions={options}>
      <AuthStack.Screen name='Posts' component={FindPosts} />
      <AuthStack.Screen name='postDetails' component={DetailsScreen} />
      <AuthStack.Screen name='Profile' component={ProfileScreen} />
      <AuthStack.Screen name='MyProfile' component={MyProfile} />
      <AuthStack.Screen name='ChangePassword' component={ChangePassword} />
      <AuthStack.Screen name='Setting' component={SettingScreen} />
      <AuthStack.Screen name='SelectCity' component={CityScreen} />
      <AuthStack.Screen name='SelectBoard' component={BoardScreen} />
      <AuthStack.Screen name='SelectFilter' component={FilterScreen} />
      <AuthStack.Screen name='ViewAllScreen' component={ViewAllScreen} />
      <AuthStack.Screen name='MapView' component={MapViewScreen} />
      <AuthStack.Screen name='FeedbackScreen' component={FeedbackScreen} />
      <AuthStack.Screen name='AddPost' component={Addpost} />
      <AuthStack.Screen name='BottomTab' component={BottomTab2} />
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
        }}>
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
          }}>
          Loading
        </Text>
        <Spinner size='lg' />
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
