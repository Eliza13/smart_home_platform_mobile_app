import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as stringConstants from '../../../common/stringConstants';
import loadImages from '../../../common/loadImagesDynamically';

const SmallTile = (props) => {

    const { viewStyle, imgStyle, textStyle} = styles;
    const { appIcon, name, uid } = props.element;
    const src = loadImages(appIcon);

    return (
        <TouchableOpacity style={viewStyle} 
                          onPress={() => {
                            props.typePress === stringConstants.FAV_DETAILS 
                                ? Actions.favDetail({ uid }) 
                                : Actions.homeDetail({ elName: name, src})  
                            }}>
            <Image style={imgStyle} source={src}/>
            <Text style={textStyle}> {name} </Text>
        </TouchableOpacity>
    );
}

const styles={
    viewStyle:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderColor: '#02a6bc75',
        borderWidth: 1.5,
        width: 130,
        height: 130,
        padding: 20,
        borderRadius: 10,
        margin: 5
    },
    imgStyle:{
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
    textStyle:{
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 6
    }
}

export { SmallTile };