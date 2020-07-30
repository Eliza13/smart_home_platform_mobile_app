import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import {Badge, Text} from 'native-base';

const NavBarButton = (props) => {

    const { btnStyle, imgStyle, badgeStyle, txtStyle } = styles;

    let badge;
    if(props.notifNr) {
        badge = props.notifNr > 0  
                  ? <Badge style={badgeStyle}>
                        <Text style={txtStyle}>{props.notifNr}</Text>
                    </Badge>
                  : null;
    }

    return(
        <TouchableOpacity onPress={props.onPress} style={ btnStyle } >
            {badge}
            <Image source={props.src} style={imgStyle}/>
        </TouchableOpacity>               
    );
}

const styles = {
    btnStyle: {
        backgroundColor: 'rgba(255,255,255,0.0)',
        marginLeft: 8,
        flexDirection: 'row'
    },
    imgStyle: {
        width: 20,
        height: 20
    },
    badgeStyle:{
        width: 21,
        height: 21,
        position: 'absolute',
        top: -12,
        right: 12,
        backgroundColor: '#02a5bc'
    },
    txtStyle:{
        fontSize: 10,
        color: 'white',
        textAlign: 'center'
    }
};

export { NavBarButton };