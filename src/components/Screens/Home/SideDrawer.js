import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header, NavBarButton } from '../../UI';
import notifications from '../../../assets/icons/notification.png';
import settings from '../../../assets/icons/settings.png';

class SideDrawer extends Component {

    state = {showDrawer: false}

    toggleDrawer(){
        this.setState({ showDrawer: !this.state.showDrawer });
    }

    onSignOut(){
        this.setState({showDrawer:false});
        this.props.signOut();
    }

    render(){
        const { showStyle, hideStyle, txtStyle } = style;

        return(
            <View>
                <Header headerText="Home" >
                        <NavBarButton src={notifications} 
                                      onPress={() => Actions.notifications()}
                                      notifNr = {this.props.notifNr}/>
                        <NavBarButton src={settings} 
                                      onPress={() => this.toggleDrawer()}/>
                </Header>
    
                <View style={{ alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                    <View style={this.state.showDrawer ? showStyle : hideStyle}>
                        <TouchableWithoutFeedback onPress ={() => this.onSignOut()}>
                            <Text style={txtStyle}>Sign Out</Text>
                        </TouchableWithoutFeedback>
    
                        <TouchableWithoutFeedback>
                            <Text style={txtStyle}>More</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        );
    }
};

const style = {
    showStyle: {
      backgroundColor: '#eee',
      width: 100,
      marginRight: 10,
      padding: 10,
      borderRadius: 4,
      elevation: 10,
      shadowOffset: {width: 8, height:8},
      shadowColor: '#000',
      shadowOpacity: 0.9,
      shadowRadius: 4
    },
    hideStyle: {
      display: 'none'
    },
    txtStyle:{
      color:'#2f4050',
      padding: 2
    }
  };

export default SideDrawer;

