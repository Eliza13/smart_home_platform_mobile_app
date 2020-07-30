import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { ActionButton } from '../UI';
import * as stringConstants from '../../common/stringConstants';

const CustomModal = ({ visible, actionOrRoutine, onPress, onAddPress }) => {

    const { viewStyle, textStyle } = styles;

    let text = '';
    if(actionOrRoutine === stringConstants.ACTION){
        text = stringConstants.ACTION;
    }
    if(actionOrRoutine === stringConstants.ROUTINE){
        text = stringConstants.ROUTINE;
    }

    return(
        <Modal transparent
                visible={ visible }
                animationType='slide'
                onRequestClose={()=> {}}>
        
            <View style={viewStyle}>
                <TouchableOpacity onPress={onAddPress}>
                    <Text style={textStyle}> Add {text}</Text> 
                </TouchableOpacity>
                <Text style={textStyle}> Add more settings </Text>
                <Text style={textStyle}> Add your favorite icons </Text>
                <ActionButton style={{marginTop: 30}} onPress={onPress} />
            </View>

        </Modal>
    );
}


const styles = {
    viewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(53,69,82, 0.9)',
        flex: 1
    },
    textStyle: {
        color: 'white',
        fontSize: 20,
        marginBottom: 15
    }
}

export default CustomModal;