import React from 'react';
import { View, Text, Image, Platform } from 'react-native';
import Background from '../../Hoc/Background';
import CommonHeader from './CommonHeader';
import loadImagesDynamically from '../../../common/loadImagesDynamically';
import {Button} from '../Buttons/Button';

const CookingNotification = () => {
    const { subTitle, infoView, imgStyle, minText, maxText, rowView, textView, ovenStyle } = style;
    return (
        <Background>
            <CommonHeader title = "Oven finishes in 5 min" />
            <View style = {{ flex: 1, flexDirection:'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text style = {subTitle} > Dinner Almost Done </Text>
                <Image source = {loadImagesDynamically('oven')} style = {ovenStyle} />
                <View style = {infoView}> 
                    <View style = {rowView}> 
                        <Image source = {loadImagesDynamically('thermometer')} style = {imgStyle}/>
                        <View style = {textView}>
                            <Text style={minText}>Temp</Text>
                            <Text style={maxText}>340 °F</Text>
                        </View>
                    </View>
    
                    <View style = {rowView}> 
                       <Image source = {loadImagesDynamically('clock')} style = {imgStyle} />
                       <View style = {textView} >
                            <Text style={minText}>Start</Text>
                            <Text style={maxText}>17:50 PM</Text>
                       </View>
                    </View>
                </View>
            <Button title = "Stop the oven now" style = {{ backgroundColor: 'orange', marginBottom: 40, marginTop: -10 }} />
            </View>
        </Background>
    );
}

const style = {
    subTitle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 30
    },
    maxText: {
        color: 'white',
        fontSize: 20
    },
    minText: {
        color: 'white',
        fontSize: 16
    },
    imgStyle: {
        width: 35,
        height: 35
    },
    ovenStyle: {
        width: 200,
        height: 200,
        marginTop: 50,
        resizeMode: Platform.OS === 'ios' ? 'contain' : 'center'
    },
    infoView: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 50,
        justifyContent: 'space-between'
    },
    rowView: {
        flex: 1, 
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textView :{
        flex: 1,
        flexDirection: 'column',
        marginLeft: 15
    }
}

export {CookingNotification};