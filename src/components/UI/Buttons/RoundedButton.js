import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';

const RoundedButton = (props) => {

    const { btnStyle, textStyle, viewStyle, imgStyle } = styles;

    return(
        <View style={viewStyle}>

            <TouchableOpacity onPress={props.onPress} style={ btnStyle } >
               <Image source={props.src} style={imgStyle}/>
            </TouchableOpacity>
            
            <Text style={[ textStyle, props.style ]}> {props.title} </Text>
            
        </View>
    );
}

const styles = {
    btnStyle: {
        backgroundColor: 'rgba(255,255,255,0.0)'
    },
    textStyle:{
        alignSelf: 'center',
        color: 'rgba(191,192,193,0.5)',
        fontSize: 12
    },
    viewStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgStyle: {
        width: 60,
        height: 60
    }
}

export { RoundedButton };