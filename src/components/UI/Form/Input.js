import React from 'react';
import { View, TextInput } from 'react-native';

const Input = ({ value, onChangeText, placeholder, secureTextEntry }) => {

    const { containerStyle, inputStyle } =  style ;

    return (
        <View style={ containerStyle }>
            <TextInput style={ inputStyle } 
                       value={ value }
                       autoCorrect={ false } 
                       secureTextEntry={ secureTextEntry }
                       placeholder={ placeholder }
                       onChangeText={ onChangeText } />
        </View>
    );
}

const style={
    containerStyle: {
        height: 50,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(255,255,255, 0.4)',
        borderRadius: 6,
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 10,
        borderWidth: 0.5,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3
    },
    inputStyle: {
        color: 'white',
        paddingRight: 10,
        paddingLeft: 10,
        fontSize: 18,
        lineHeight: 23
    }
};

export { Input };
