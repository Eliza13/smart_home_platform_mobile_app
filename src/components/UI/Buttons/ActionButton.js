import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const ActionButton = (props) => {

    const { btnStyle, textStyle } = styles;

    return(
        <TouchableOpacity onPress={props.onPress} style={ btnStyle } >
            <Text style={[textStyle, props.style]}> X </Text>
        </TouchableOpacity>               
    );
}

const styles = {
    btnStyle: {
        backgroundColor: 'rgba(255,255,255,0.0)',
    }, 
    textStyle:{
        color: 'white',
        fontSize: 25
    }
}

export { ActionButton };