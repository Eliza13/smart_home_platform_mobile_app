import React from 'react';
import { Text, View } from 'react-native';

const PlusButton = () => {
    const { btnStyle, textStyle } = styles;

    return (
        <View style={btnStyle}>
           <Text style={textStyle}> + </Text>
        </View>
    );
};

const styles = {
    btnStyle: {
        backgroundColor: 'rgba(255,255,255,0.0)',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 7,
        width: 15,
        height: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    textStyle:{
        color: 'white',
        fontSize: 10
    }
};

export  { PlusButton };