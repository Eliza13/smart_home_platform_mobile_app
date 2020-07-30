import React from 'react';
import { View, Text } from 'react-native';
import { ActionButton, TickButton } from '../';

const ActionHeader = (props) => {
    const { textStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <ActionButton onPress = { props.onXPressed } />
            <Text style={textStyle}>  {props.title}  </Text>
            <TickButton  onPress = { props.onTickPressed } />
        </View>
    );
}

const styles = {
    viewStyle: {
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: 18
    },
    textStyle: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    }
}

export {ActionHeader};