import React from 'react';
import AudioDevice from './AudioDevice';
import HeaterDevice from './HeaterDevice';
import LightDevice from './LightDevice';
import Window from './Window';
import Door from './Door';
import OtherDevices from './OtherDevices';
import * as stringConstants from '../../common/stringConstants';

const RouterCtrlDevice = (props) => {

    const {page, title } = props;
    let device; 
    if(page === stringConstants.AUDIO){
        device = <AudioDevice title = {title}/>
    } else if (page === stringConstants.HEAT){
        device = <HeaterDevice device = {props.device}/>
    } else if(page === stringConstants.LIGHTS){
        device = <LightDevice device = {props.device}/>
    } else if(page === stringConstants.DOORS){
        device = <Door device = {props.device}/>
    } else if(page === stringConstants.WINDOWS){
        device = <Window device = {props.device}/>
    } else {
        device = <OtherDevices title = {title}/> 
    }

    return device;
};

export default RouterCtrlDevice;