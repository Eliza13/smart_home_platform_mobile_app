import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button, Icon } from 'native-base';
import BasicLayout from './BasicLayout';
import loadingImg from '../../common/loadImagesDynamically';

const AudioDevice = (props) => {
    const { wrapperStyle, textStyle, imgStyle, imgContainerStyle, wavePic, controlBtnWrapperStyle } = style;

    return (
        <BasicLayout deviceName = { props.title } deviceIcon = { loadingImg('audio') } >
            <View style={wrapperStyle}>
                <View style={imgContainerStyle}>
                    <Image source={loadingImg('music')} style={imgStyle}/>
                </View>
                <Text style={[textStyle, {fontWeight: "bold", fontSize: 18}]}>ABBA</Text>
                <Text style={textStyle}>the winner takes it all</Text>

                <View style={controlBtnWrapperStyle}>
                    
                    <Button transparent light >
                        <Icon type='MaterialCommunityIcons' name='skip-previous'/>
                    </Button>

                    <Button transparent >
                        <Icon type='MaterialCommunityIcons' name='play-circle-outline'  />
                    </Button>

                    <Button transparent >
                        <Icon type='MaterialCommunityIcons' name='skip-next' />
                    </Button>
                </View>

                <Image source={loadingImg('wave')} style={wavePic}/>

            </View>
        </BasicLayout>
    );
};

const style = {
    wrapperStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 90
    },
    textStyle:{
        color:'white',
        fontSize: 14
    },
    imgStyle:{
        width: 60,
        height: 60
    },
    imgContainerStyle:{
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 120,
        borderColor: '#02a5bc',
        borderWidth: 0.8,
        width: 120,
        height: 120,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wavePic: {
        height: 50,
        marginTop: 30,
        resizeMode: 'center'
    },
    controlBtnWrapperStyle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30
    }
}

export default AudioDevice;
