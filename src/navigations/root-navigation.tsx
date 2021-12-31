import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../screens/home-screen";
import SplashScreen from "../screens/splash-screen";
import { RootStackParamList, RouteParams } from './data';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={RouteParams.SPLASH}>
                <Stack.Screen name={RouteParams.SPLASH} component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name={RouteParams.HOME} component={HomeScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator;