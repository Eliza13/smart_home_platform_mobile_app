import React from 'react';
import { ScrollView } from 'react-native';
import { LargeTile } from '../UI';

const NotificationsList = (props) => {

    const notifications = props.notifications.map(el => {
        const details = el.additionalData ? el.additionalData : null;
        return <LargeTile title={el.title} 
                          id = {el.id}
                          key={el.id} 
                          details = {details}
                          delete= {props.delete}
                          message = {el.body} />
    });

    return (
        <ScrollView>{notifications}</ScrollView>
    );
}

export default NotificationsList;

