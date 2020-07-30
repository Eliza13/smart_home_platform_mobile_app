import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

const BasicLayoutLightHeater = (props) => {
    const { mainViewStyle, containerViewStyle, plusMinusTxtStyle, viewStyle } = styles;

    return (
        <View style = { containerViewStyle } > 
            <View style = { mainViewStyle } > 
                <TouchableWithoutFeedback onPress={props.onPressMinus}>
                    <Text style={ plusMinusTxtStyle }> - </Text>
                </TouchableWithoutFeedback>
                <View style={viewStyle} >
                    {props.children}
                </View>
                <TouchableWithoutFeedback onPress={props.onPressPlus}>
                    <Text style={ plusMinusTxtStyle }> + </Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

const styles = {
    containerViewStyle: {
        flex:1, 
        alignItems:'center', 
        justifyContent:'center'
    },
    mainViewStyle:{
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    plusMinusTxtStyle:{
        color: 'white', 
        fontSize: 28
    },
    viewStyle: {
        marginLeft: 15,
        marginRight: 15
    }
}

export default BasicLayoutLightHeater;