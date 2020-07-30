import React from 'react';
import { View, Text } from 'react-native';
import { PlusButton } from '../Buttons/PlusButton';

const FeatureSection = (props) => {
    const { sectionStyle, explanationStyle, actionStyle, titleStyle } = styles;

    return(
        <View style={sectionStyle}>

            <Text style={titleStyle}> {props.title} </Text>

            <View style={actionStyle}>
                <View><PlusButton /></View> 
                {props.children}
            </View>

            <Text style={explanationStyle}> {props.explanation} </Text>
        </View>
    );
};

const styles = {
    sectionStyle: {
        justifyContent: 'center',
        marginLeft: 20,
        marginBottom: 40
    },
    explanationStyle: {
        fontSize: 14,
        color: 'white',
        fontStyle: 'italic',
        marginLeft: 25
    },
    actionStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    }, 
    titleStyle: {
        color: 'white',
        fontSize: 20
    }
};

export { FeatureSection };