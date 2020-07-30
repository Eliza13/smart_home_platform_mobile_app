import React from 'react';
import BasicLayout from './BasicLayout';
import BasicLayoutDoorWindow from './BasicLayoutDoorWindow';
import loadingImg from '../../common/loadImagesDynamically';

const Door = (props) => {
    return (
        <BasicLayout deviceName = { props.device.name } deviceIcon={loadingImg('outside')}>
            <BasicLayoutDoorWindow openTitle='Door Unlocked' 
                                   closeTitle='Door Locked'
                                   openImg = 'unlocked'
                                   closeImg='locked'
                                   device={props.device}/>

        </BasicLayout>
    );
};

export default Door; 

