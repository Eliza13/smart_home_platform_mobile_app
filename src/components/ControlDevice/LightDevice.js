import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import BasicLayout from './BasicLayout';
import ProgressCircle from 'react-native-progress-circle';
import BasicLayoutLightHeater from './BasicLayoutLightHeater';
import loadingImg from '../../common/loadImagesDynamically';
import * as actions from '../../store/actions';

class  LightDevice extends Component {

    state = {percent: this.props.device.intensity, on: this.props.device.enabled};

    onMinusPressed(){
        this.setState(prevState => {
            return {percent: prevState.percent > 10 ? prevState.percent - 10 : 0};
        });
    }

    onPlusPressed(){
        this.setState(prevState => {
            return {
                percent: prevState.percent < 100 ? prevState.percent + 10 : 100,
                on: true
            };
        });
    }

    switchOnOff(on){
        if(on) {
            this.setState({ percent: 0, on: false});
        } else {
            this.setState({ percent: 100, on: true});
        }
    }

    componentWillUnmount(){
        const {id} = this.props.device;
        const {percent, on} = this.state;
        this.props.changeLightIntensity(id,percent, on);
    }

    render(){
    const { imgInnerStyle, btnStyleOn, btnStyleOff, btnTextStyle, btnsViewStyle } = style;
    const { on, percent } = this.state;

    let styles, txtStyle;
    if(on){
        styles = [btnStyleOn];
        txtStyle = [btnTextStyle];
    } else {
        styles = [ btnStyleOn, btnStyleOff ];
        txtStyle = [btnTextStyle, {color:'white'}];
    }

    const btn = (
            <TouchableOpacity onPress = {() => this.switchOnOff(on)}>
                <View style={styles} > 
                    <Text style={txtStyle} > {on ? 'On' : 'Off'} </Text>
                </View>
            </TouchableOpacity>
        );
    
    return (
        <BasicLayout deviceName = { this.props.device.name } deviceIcon = { loadingImg('lamp') } >
            <BasicLayoutLightHeater onPressMinus = {() => this.onMinusPressed()} 
                                    onPressPlus = {() => this.onPlusPressed()} > 
                <ProgressCircle
                    percent={percent}
                    radius={100}
                    borderWidth={20}
                    color="#02a5bc"
                    shadowColor="#fff"
                    bgColor="#2f4050">
                    <Text style={{ fontSize: 18, color: 'white' }}>{percent + ' %'}</Text>
                    <Image source={ loadingImg('brightness') } style={ imgInnerStyle } />
                </ProgressCircle>
            </BasicLayoutLightHeater>

            <View style = { btnsViewStyle } >
                {btn}
            </View>
        </BasicLayout>
    ); 
  }
};

const style = {
    imgInnerStyle:{
        height: 20, 
        width: 20, 
        resizeMode: 'contain',
        marginTop: 10
    },
    btnStyleOn: {
        width: 60,
        height: 40,
        borderRadius: 5,
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#02a5bc',
        margin: 10
    },
    btnStyleOff: {
        backgroundColor: '#02a5bc',
        borderColor: 'white'
    },
    btnTextStyle: {
        color: '#02a5bc',
        fontSize: 18,
        textAlign: 'center'
    },
    btnsViewStyle: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: 80
    }
};

export default connect(null, actions)(LightDevice); 

