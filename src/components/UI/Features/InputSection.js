import React from 'react';
import { View, Text } from 'react-native';
import { Input } from '../';

const InputSection = (props) => {
    const { textStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}> 
            <Text style={textStyle}> Name </Text>
            <Input placeholder={ props.inputPlaceholder } 
                   value = { props.inputValue }
                   onChangeText = { props.onChangeText } />
        </View>
    );
}

const styles = {
    textStyle: {
        color: 'white',
        fontSize: 20,
        marginBottom: 15
    },
    viewStyle: {
        marginLeft: 20,
        marginTop: 40,
        marginBottom: 30
    }
}

export {InputSection};