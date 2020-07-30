import React, { Component } from 'react';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Header, ActionButton, Spinner } from '../../UI';
import Background from '../../Hoc/Background';
import NotificationsList from '../../Lists/NotificationsList';
import * as actions from '../../../store/actions/';

class Notifications extends Component {

    componentDidMount(){
        this.props.loadNotifications(); 
    }

    delete(id){
        // go to firebase and delete the notification
        this.props.deleteNotification(id);
    }

    xBtnHandler(){
        this.props.resetNotifNr();
        Actions.pop();
    }

    render() {
        const { notifications, loading, error } = this.props;
        const {txtStyle, errorTxtStyle} = style;
        let renderList;

        if(loading){
            renderList = <Spinner />;
        } else if(error){
            renderList = <Text style={errorTxtStyle}> {error} </Text>;
        } else if(notifications.length === 0){
            renderList = <Text style={txtStyle}> No notifications yet! </Text>;
        } else {
            renderList = <NotificationsList  notifications = {notifications} 
                                             delete = {this.delete.bind(this)}/>;
        }

        return(
            <Background>
                <Header headerText="Notifications" />
                {renderList}
                <ActionButton style={{ marginBottom: 60, textAlign: 'center' }} 
                              onPress={() => this.xBtnHandler()}/> 
            </Background>
        );
    }
}

const style = {
    txtStyle:{
        textAlign: 'center',
        font: 20,
        color: 'white'
    },
    errorTxtStyle:{
        textAlign: 'center',
        font: 20,
        color: 'red'
    }
};

const mapStateToProps = state => {
    const { notifications, loading, error } = state.notifications;
    
    const mappedNotifications = _.map(notifications, (val, uid) => {
        return {...val, id: uid}
    });

    return { notifications: mappedNotifications, loading, error};
};

export default connect(mapStateToProps, actions)(Notifications);