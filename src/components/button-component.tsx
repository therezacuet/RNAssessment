import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, deviceFontFamily, isIOS, size } from "../styles/global-styles";

interface ButtonProps {
    title: string;
    btnBgColor?: string,
    textColor?: string,
    onPress: () => void;
}

export const Button: React.FC<ButtonProps> = (props:ButtonProps) => {
    return(
        <TouchableOpacity onPress={props.onPress} style={{...styles.buttonStyle, backgroundColor: props.btnBgColor ? props.btnBgColor : styles.buttonStyle.backgroundColor}}>
            <Text allowFontScaling={false} style={{...styles.textStyle, color: props.textColor ? props.textColor : styles.textStyle.color}}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    textStyle:{
        color: colors.white,
        textAlign: 'center',
        textAlignVertical: 'center',
        alignItems: 'baseline',
        fontFamily: deviceFontFamily,
        fontWeight: '700',
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing:1
    },
    buttonStyle:{
        borderRadius: size.s24,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: colors.meBlue40,
    }
});