import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Button = (props) => {
    const { btnStyle, textStyle } = styles;

    return(
        <TouchableOpacity onPress={props.onPress} style={ [btnStyle, props.style] } >
            <Text style={textStyle}> {props.title} </Text>
        </TouchableOpacity>
    );
}

const styles = {
    btnStyle: {
        backgroundColor: '#02A5BC',
        alignSelf: 'stretch',
        borderRadius: 40,
        marginLeft: 60,
        marginRight: 60,
        marginTop: 10,
        borderWidth: 0.5,
        borderColor: '#ddd'
    },
    textStyle:{
        alignSelf: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
}

export {Button};