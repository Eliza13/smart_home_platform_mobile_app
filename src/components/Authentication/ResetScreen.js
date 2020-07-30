import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, Spinner } from '../UI';
import * as actions from '../../store/actions';

class ResetScreen extends Component {

    renderResetPasswordBtn(){
        const { email, loading, resetPassword, changeToResetScreen } = this.props;
        if(loading){
            return <View style={styles.btnsContainer}><Spinner /></View>;
        }

        return (
            <View style={styles.btnsContainer}>
                <Button title="Reset Password" onPress={() => resetPassword(email)}/>
                <Button style={{ backgroundColor: 'rgba(255,255,255, 0.4)'}} 
                        title="Back" 
                        onPress={() => changeToResetScreen()}/>
            </View>
        );
    }

    render(){
        const {email, emailChanged, renderError} = this.props;
        return(
            <View>
                <Text style={styles.resetTextStyle}>To reset password, enter your email and follow the instructions received in the mail. </Text>
                <Input placeholder='Email'
                       value={email} 
                       onChangeText={emailChanged}/>
                {renderError()}                    
                {this.renderResetPasswordBtn()}
            </View> 
        );
    }
}

const styles = {
    btnsContainer:{
        marginTop: 50
    },
    resetTextStyle:{
        color: 'white', 
        fontSize: 16, 
        textAlign: 'center', 
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 15
    }
};

const mapStateToProps = state => {
    const {email, loading} = state.auth;
    return {email, loading};
};

export default connect(mapStateToProps, actions)(ResetScreen);