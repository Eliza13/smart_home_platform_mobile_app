import * as actionTypes from './actionTypes';
import firebase from '@firebase/app';
import '@firebase/database';

export const loadNotifications = () => {
    const { currentUser } = firebase.auth();
    return dispatch => {
        dispatch({type: actionTypes.LOAD_NOTIFICATIONS_START});
        firebase.database().ref(`/users/${currentUser.uid}/notifications`)
                .on('value', 
                    snapshot => dispatch({type: actionTypes.LOAD_NOTIFICATIONS_SUCCESS, payload: snapshot.val()}),
                    error => {
                        console.log(error);
                        dispatch({type: actionTypes.LOAD_NOTIFICATIONS_FAIL});
                    });

    };
};

export const saveNotification = (notification, id) => {
    return dispatch => {
        firebase.database().ref(`/users/${id}/notifications`)
                .push(notification)
                .then(() => dispatch({type: actionTypes.INCREASE_NOTIF_NR}))
                .catch(error => console.log(error));
    };
};

export const deleteNotification = (id) => {
    const {currentUser} = firebase.auth();
    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/notifications/${id}`)
                .remove()
                .then(() => {})
                .catch(error => console.log(error));
    };
};


export const resetNotifNr = () => {
    return {
        type: actionTypes.RESET_NOTIF_NR
    };
};




