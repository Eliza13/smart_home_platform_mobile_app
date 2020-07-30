import React from 'react';
import { ImageBackground, View } from 'react-native';
import pic from '../../assets/images/background.jpg';

const Background = (props) => (
    <View style={{flex: 1}}>
        <ImageBackground style={style} source={pic}>  
            {props.children}
        </ImageBackground>
    </View>
);

const style = {
    flex: 1, 
    resizeMode: 'cover',
    width: null,
    height: null
}

export default Background;

