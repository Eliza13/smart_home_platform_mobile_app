import React from 'react';
import { View, Text, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const Confirm = ({ children, visible, onAccept, onDecline }) => {

    const { containerStyle, textStyle, modalBoxStyle } = style;

    return (
        <Modal transparent
               visible={ visible }
               animationType='slide'
               onRequestClose={()=> {}} >

            <View style={containerStyle}>

                <View style={modalBoxStyle}>
                    <CardSection>
                        <Text style={textStyle}> { children} </Text>
                    </CardSection>
    
                    <CardSection >
                        <Button onPress={onAccept}> Yes </Button>
                        <Button onPress={onDecline} 
                                btnStyle={{borderColor: '#02a5bc'}} 
                                txtStyle={{color:'#02a5bc'}}> No </Button>
                    </CardSection>
                </View>

            </View>
        </Modal>
    );
};

const style = {
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 20,
        marginTop: 20,
        color: '#000' 
    },
    containerStyle: {
        flex: 1,
        backgroundColor: 'rgba(53,69,82, 0.9)',
        position: 'relative',
        justifyContent: 'center'
    },
    modalBoxStyle:{
        borderRadius: 10, 
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#fff',
        padding: 20
    }
}

export { Confirm };


