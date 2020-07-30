import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import checkSymbol from '../../../assets/icons/checkSymbol.png';

const TickButton = (props) => {

    return(
        <TouchableOpacity style={styles.btnStyle} onPress={ props.onPress }>
            <Image source={checkSymbol} style={styles.imgStyle}/>
        </TouchableOpacity>
    );
}

const styles = {
    btnStyle: {
        backgroundColor: 'rgba(255,255,255,0.0)'
    },
    imgStyle: {
        width: 25,
        height: 25
    }
}

export {TickButton}; 