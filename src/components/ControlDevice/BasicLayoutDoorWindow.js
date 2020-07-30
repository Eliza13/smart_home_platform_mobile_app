import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import BtnBasicLayout from './BtnBasicLayout';
import * as actions from '../../store/actions';

class BasicLayoutDoorWindow extends Component{

    state = { open: this.props.device.enabled };

    componentWillUnmount(){
        const {id} = this.props.device;
        const {open} = this.state;
        this.props.openCloseWindowDoor(id,open);
    }

    render(){
        const { viewStyle, txtStyle } = style;
        const { openTitle, closeTitle, openImg, closeImg } = this.props;
        const { open } = this.state;

        return(
            <View style = { viewStyle } >
                <Text style = { txtStyle }> { open ? openTitle : closeTitle} </Text>
                <BtnBasicLayout image = {openImg} 
                                active = { open }
                                onPress = { () => this.setState({ open: !this.state.open })} />
                <BtnBasicLayout image = {closeImg} 
                                active = { !open }
                                onPress = {() => this.setState({ open: !this.state.open })} />
            </View>
        );
        
    }

};

const style = {
    viewStyle: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    txtStyle: {
        color: 'white', 
        fontSize: 20, 
        textAlign: 'center',
        marginBottom: 30
    }
};

export default connect(null, actions)(BasicLayoutDoorWindow);