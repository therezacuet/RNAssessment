import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { RootStackParamList, RouteParams } from "../navigations/data";
import { colors, deviceFontFamily, size } from "../styles/global-styles";
import Icon from "react-native-vector-icons/Fontisto";
import Spacer from "../components/spacer";

interface SplashScreenProps {
    navigation: StackNavigationProp<RootStackParamList>;
    route: RouteProp<RootStackParamList, RouteParams.SPLASH>;
}

const SplashScreen: React.FC<SplashScreenProps> = (props) => {

    useEffect(() => {
        setTimeout(() => {
            props.navigation.replace(RouteParams.HOME);
        }, 2000);
        
    }, []);



    return (
        <View style={styles.container}>
            <Icon name="react" size={size.s64} color={colors.white}/>
            <Spacer height={size.s16}/>
            <Text style={styles.title}>RN Assessment</Text>
        </View>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container:{ 
        flex: 1, 
        backgroundColor: colors.ming,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },

    title:{
        fontFamily: deviceFontFamily,
        fontSize: 25,
        color: colors.white,
        fontWeight: 'bold'
    }
    
})