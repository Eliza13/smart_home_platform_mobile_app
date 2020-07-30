import React from 'react';
import BasicLayout from './BasicLayout';
import BasicLayoutDoorWindow from './BasicLayoutDoorWindow';
import loadingImg from '../../common/loadImagesDynamically';

const WindowDevice = (props) => {
    return (
        <BasicLayout deviceName = { props.device.name } deviceIcon = { loadingImg('window') }>
            <BasicLayoutDoorWindow openTitle='Window Open' 
                                   closeTitle='Window Closed'
                                   openImg = 'windowOpen'
                                   closeImg='windowClose'
                                   device={props.device}/>
        </BasicLayout>
    );
}

export default WindowDevice; 

