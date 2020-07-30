import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '../UI';
import BasicLayout from './BasicLayout';
import loadingImg from '../../common/loadImagesDynamically';

const AudioDevice = (props) => {
    const { wrapperStyle, textStyle } = style;

    return (
        <BasicLayout deviceName = { props.title } deviceIcon = { loadingImg('other') } >
            <View style={wrapperStyle}>
                <Text style={textStyle}>Open the app of the device for more specific configurations.</Text>
                <Button title="Open"/>
            </View>
        </BasicLayout>
    );
};

const style = {
    wrapperStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1
    },
    textStyle:{
        color:'white',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 40
    }
}

export default AudioDevice;
