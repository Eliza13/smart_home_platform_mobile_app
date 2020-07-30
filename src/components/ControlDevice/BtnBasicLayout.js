import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import loadingImg from '../../common/loadImagesDynamically';


const BtnBasicLayout = ( props ) => {
    const {  activeBtnStyle, inactiveBtnStyle, imgStyle } = style;
    let styles; 

    if(props.active){
        styles = [ activeBtnStyle ];
    } else {
        styles = [ activeBtnStyle, inactiveBtnStyle ];
    }

    return (
        <TouchableOpacity style = { styles } onPress = { props.onPress } >
            <Image source = { loadingImg( props.image ) } style={ imgStyle} />
        </TouchableOpacity>
    );
};

const style = {
    activeBtnStyle: {
        width: 150,
        height: 150,
        borderRadius: 100, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(2, 165, 188, 0.55)',
        borderColor: 'white',
        borderWidth: 0.8,
        marginTop: 30
    },
    inactiveBtnStyle:{
        backgroundColor: 'rgba(255,255,255,0.55)',
        borderColor: '#02a5bc',
    },
    imgStyle:{
        width: 40,
        height: 40,
        resizeMode: 'contain'
    }
};

export default BtnBasicLayout; 