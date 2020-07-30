import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {

    const { textStyle, containerStyle, navBtnsContainerStyle } = styles;
    return (
        <View style={containerStyle}>
            <Text style={textStyle}> {props.headerText} </Text>
            <View style={navBtnsContainerStyle}>
                {props.children}
            </View>
        </View>
    );
};

const styles = {
    containerStyle: {
        backgroundColor: 'rgba(255,255,255,0.0)',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 40,
        position: 'relative',
        paddingLeft: 10,
        paddingTop: 15,
        marginBottom: 20
    },
    textStyle: {
        fontSize: 18,
        color: 'white'
    },
    navBtnsContainerStyle:{
        flexDirection: 'row',
        position: 'absolute',
        right: 15,
        paddingLeft: 10,
        paddingTop: 15
    }
};

export { Header };
