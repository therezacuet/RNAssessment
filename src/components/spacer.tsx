import React from 'react';
import { View } from 'react-native';

interface SpacerInterface {
    height?: number;
    width?: number;
}

const Spacer = (props: SpacerInterface) => {
    return (
        <View style={{ height: props.height ?? 0, width: props.width ?? 0 }}></View>
    );
};

export default Spacer;
