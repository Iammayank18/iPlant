import React, { useEffect } from "react";
import { LogBox, SafeAreaView } from "react-native";
import { NativeBaseProvider } from "native-base";
import { InsideStack } from "./src/stackNavigator";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store";
import { SSRProvider } from "@react-aria/ssr";
import { useFonts } from "expo-font";

function App() {
    const [fontsLoaded] = useFonts({
        DMBold: require("./src/assets/fonts/Poppins/Poppins-Bold.ttf"),
        DMMedium: require("./src/assets/fonts/Poppins/Poppins-Medium.ttf"),
        DMRegular: require("./src/assets/fonts/Poppins/Poppins-Regular.ttf"),
        PoppinsRegular: require("./src/assets/fonts/Poppins/Poppins-Regular.ttf"),
        PoppinsThin: require("./src/assets/fonts/Poppins/Poppins-Thin.ttf"),
        PoppinsMedium: require("./src/assets/fonts/Poppins/Poppins-Medium.ttf"),
        PoppinsBold: require("./src/assets/fonts/Poppins/Poppins-Bold.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <SSRProvider>
                        <NativeBaseProvider>
                            <InsideStack />
                        </NativeBaseProvider>
                    </SSRProvider>
                </PersistGate>
            </Provider>
        </SafeAreaView>
    );
}

export default App;
