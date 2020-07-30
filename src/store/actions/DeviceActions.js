import firebase from '@firebase/app';
import '@firebase/database';
import '@firebase/auth';
import * as actionTypes from './actionTypes';


// load user devices 
export const loadDevices = () => {

    const { currentUser } = firebase.auth();
    return dispatch => {
        firebase.database().ref(`/users/${currentUser.uid}/devices`)
                .on('value', snapshot => {
                    dispatch({type: actionTypes.LOAD_DEVICES, payload:snapshot.val()});

                    // if user has no device, nothing should happen
                    if(snapshot.val() !== null){
                        const deviceId = Object.keys(snapshot.val())[0];
                        dispatch({type: actionTypes.INIT_DEVICE_ID_FOR_ACTION, payload: deviceId});
                    }
                });
    };
};


// actions to control devices
export const changeLightIntensity = (id, intensity, on) => {

    const { currentUser } = firebase.auth();
    let stringState;
    if(on){
        stringState = 'On';
    } else{
        stringState = 'Off';
    }

    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/devices/${id}/`)
                .update({intensity: intensity, enabled: on, state: stringState})
                .then(() => console.log(id, intensity))
                .catch(error => console.log(error));
    };
};

export const changeHeatTemp = (id, temp) => {
    const { currentUser } = firebase.auth();
    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/devices/${id}/`)
                .update({temperature: temp})
                .then(() => console.log(id, temp))
                .catch(error => console.log(error));
    };
};

export const openCloseWindowDoor = (id, open) => {
    const { currentUser } = firebase.auth();
    let stringState;
    if(open){
        stringState = 'Open';
    } else {
        stringState = 'Closed';
    }

    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/devices/${id}/`)
                .update({enabled: open, state: stringState})
                .then(() => console.log(id, intensity))
                .catch(error => console.log(error));
    };
};



