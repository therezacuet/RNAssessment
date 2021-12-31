import { Platform, StyleSheet } from "react-native";


/* PLATFORM INFO */
export const isIOS: boolean = Platform.OS === 'ios';
export const isAndroid: boolean = Platform.OS === 'android'

/* Fonts */
//
export const iosFont = 'Avenir Next'
export const androidFont = 'sans-serif-medium'
export const iosMonoFont = 'Menlo-Bold'
export const androidMonoFont = 'monospace'
// to avoid checking platform each time before use
export const deviceFontFamily = isIOS ? iosFont : androidFont;


export const size = {
    s4: 4,
    s8: 8,
    s16: 16,
    s24: 24,
    s32: 32,
    s48: 48,
    s64: 64,
    s128: 128,
    s256: 256,
    s512: 512,
}


export const colors = {
    white: '#FFFFFF',
    black: '#000000',
    red: '#ff0000',
    success: '#42ba96',
    ming: "#37687f",
    skyBlue : "#75d9fe",
    lightBlue: "#39e8e8",
    lightRed: '#fe7a87',
    lightGrey: "#768ba0",

}

export const globalStyles = StyleSheet.create({

    /* Layout Utils */
    col: {
        flex: 1,
        flexDirection: 'column',
    },
    flexDiCol: {
        flexDirection: 'column'
    },
    flexDiRow: {
        flexDirection: 'row'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    rowCrossCenter: {
        alignItems: 'center'
    },
    rowCrossBottom: {
        alignItems: 'flex-end'
    },
    rowRightAligned: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    wrapContainer: {
        flexWrap: 'wrap'
    },
    rowAlignCenter: {
        alignItems: 'center'
    },

    margin0: {
        margin: 0
    },

    horizontalMargin0: {
        marginHorizontal: 0
    },

    container8_8: {
        height: size.s8,
        width: size.s8
    },

    container16_16: {
        height: size.s16,
        width: size.s16
    },

    container24_24: {
        height: size.s24,
        width: size.s24
    },

    container32_32: {
        height: size.s32,
        width: size.s32
    },

    container48_48: {
        height: size.s48,
        width: size.s48
    },

    paddedContainer: {
        paddingHorizontal: size.s16
    },

    paddedContainer16_16: {
        padding: size.s16
    },

    paddedContainer24_24: {
        paddingHorizontal: size.s24,
        paddingVertical: size.s24
    },

    paddedContainer32_32: {
        paddingHorizontal: size.s32,
        paddingVertical: size.s32
    },

    paddedContainer8_8: {
        paddingHorizontal: size.s8,
        paddingVertical: size.s8
    },

    paddedContainer4_4: {
        paddingHorizontal: size.s4,
        paddingVertical: size.s4
    },

    expandedContainer: {
        flex: 1
    },

    /* Type System */
    deviceFont: {
        fontFamily: isIOS ? iosFont : androidFont,
    },
    monoFont: {
        fontFamily: isIOS ? iosMonoFont : androidMonoFont,
    },
});