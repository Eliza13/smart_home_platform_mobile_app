import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Logo } from '../UI';
import Background from '../Hoc/Background';
import AuthScreen from './AuthScreen';
import ResetScreen from './ResetScreen';

class LoginScreen extends Component {

    // render errors
    renderError(){
        const { error } = this.props;
        if(error){
            return(
                <View >
                   <Text style={{color: 'red', fontSize: 15, textAlign: 'center', marginTop: 10}}> {error} </Text>
                </View>
            );
        }
    }

    // check which screen to show
    screenToShow(){        
        if(!this.props.forgotPasswordScreen){
            return <AuthScreen renderError={this.renderError.bind(this)}/>
        } else {
            return <ResetScreen renderError={this.renderError.bind(this)}/>
        }
    }

    render(){
        return(
            <Background>
                <Logo/>
                {this.screenToShow()}
            </Background>
        );
    }
}

const mapStateToProps = state => {
    const { error, forgotPasswordScreen} = state.auth;
    return { error, forgotPasswordScreen};
};

export default connect(mapStateToProps)(LoginScreen);