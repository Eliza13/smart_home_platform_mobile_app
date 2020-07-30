import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
        // overwrite the css through props
        <View style={[styles.containerStyle, props.style]}>{props.children}</View>
    );
};

const styles = {
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        position: 'relative',
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#fff',
        padding: 5
    }
};

export {CardSection};
