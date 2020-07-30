import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, Spinner } from '../UI';
import * as actions from '../../store/actions';

class AuthScreen extends Component {

    renderButtons(){
        const { email, password, signIn, signUp, loading, changeToResetScreen } = this.props;
        if(loading){
            return <View style={styles.btnsContainer}><Spinner /></View>;
        }

        return (
            <View style={styles.btnsContainer}>
                <Button title="Sign In" onPress={() => signIn({email, password})} />
                <Button style={{ backgroundColor: 'rgba(255,255,255, 0.4)'}} 
                        title="Sign Up" 
                        onPress={() => signUp({email,password})} />
                <TouchableOpacity onPress={() => changeToResetScreen()}>
                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center', marginTop: 10}}> Forgot password? </Text>
                </TouchableOpacity>
            </View>
        );
    }

    render(){
        const {email, password, emailChanged, passwordChanged, renderError} = this.props;
        return(
            <View>
                <Input placeholder='Email'
                    value={email} 
                    onChangeText={emailChanged}/>

                <Input placeholder='Password' 
                    secureTextEntry={true}
                    value={password} 
                    onChangeText={passwordChanged} />

                {renderError()}
                {this.renderButtons()}
            </View>
        );
    }
}

const styles = {
    btnsContainer:{
        marginTop: 50
    }
};

const mapStateToProps = state => {
    const {email, password, loading} = state.auth;
    return {email, password, loading};
};

export default connect(mapStateToProps, actions)(AuthScreen);