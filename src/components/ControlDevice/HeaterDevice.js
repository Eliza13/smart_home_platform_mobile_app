import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { connect } from 'react-redux';
import BasicLayout from './BasicLayout';
import ProgressCircle from 'react-native-progress-circle';
import BasicLayoutLightHeater from './BasicLayoutLightHeater';
import loadingImg from '../../common/loadImagesDynamically';
import * as actions from '../../store/actions';


class  HeaterDevice extends Component {

    state = {percent: this.props.device.temperature};

    onMinusPressed(){
        this.setState(prevState => {
            return {percent: prevState.percent > 1 ? prevState.percent - 1 : 1};
        })
    }

    onPlusPressed(){
        this.setState(prevState => {
            return {percent: prevState.percent < 40 ? prevState.percent + 1 : 40};
        })
    }

    componentWillUnmount(){
        const {id} = this.props.device;
        const {percent} = this.state;
        this.props.changeHeatTemp(id,percent);
    }

    render(){
        const { imgInnerStyle } = style;
        const { name } = this.props.device;
        const { percent } = this.state;

        return (
                <BasicLayout deviceName = { name } deviceIcon = { loadingImg('nest') } >
                    <BasicLayoutLightHeater onPressMinus = {() => this.onMinusPressed()} 
                                            onPressPlus = {() => this.onPlusPressed()}> 
                        <ProgressCircle
                            percent={percent}
                            radius={100}
                            borderWidth={20}
                            color="#02a5bc"
                            shadowColor="#fff"
                            bgColor="#2f4050">
                            <Text style={{ fontSize: 18, color: 'white' }}>{percent + ' °C'}</Text>
                            <Image source={ loadingImg('thermometer') } style={ imgInnerStyle } />
                        </ProgressCircle>
                    </BasicLayoutLightHeater>
                </BasicLayout>
        );
    }
}

const style = {
    imgInnerStyle:{
        height: 25, 
        width: 25, 
        resizeMode: 'contain',
        marginTop: 10
    }
}

export default connect(null, actions)(HeaterDevice); 

