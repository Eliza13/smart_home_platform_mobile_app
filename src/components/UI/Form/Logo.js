import React from 'react';
import { View, Image } from 'react-native';
import logo from '../../../assets/images/logo.png';

const Logo = () => {
    const { container, image } = style; 

    return(
        <View  style={container}>
            <Image style={image} source ={logo} />
        </View>
    );
}

const style = {
    container: {
        alignSelf: 'center',
        marginTop: 65,
        marginBottom: 65
    },
    image: {
        resizeMode: 'center',
        width: 160,
        height: 80
    }
}

export {Logo};