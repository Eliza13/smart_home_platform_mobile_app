import * as actionTypes from './actionTypes';
import firebase from '@firebase/app';
import '@firebase/database';

const loadRoomsSuccess = (rooms) => {
    return {
        type: actionTypes.LOAD_ROOMS_SUCCESS,
        payload: rooms
    };
};

const loadRoomsFail = () => {
    return {
        type: actionTypes.LOAD_ROOMS_FAIL
    };
};

const loadRoomsStart = () => {
    return {
        type: actionTypes.LOAD_ROOMS_START
    };
};

export const loadRooms = () => {

    const { currentUser } = firebase.auth();
    return dispatch => {
        dispatch(loadRoomsStart());
        firebase.database().ref(`/users/${currentUser.uid}/rooms`)
                .once('value') 
                .then(snapshot => {
                      dispatch(loadRoomsSuccess(snapshot.val()));
                }, 
                    error => {
                    console.log('error ', error);
                    dispatch(loadRoomsFail());
                });
    };
};


// actions for beacon implementation
export const updatePreviousMinor = (minor) => {
    console.log('minor received in redux', minor);
    return {
        type: actionTypes.UPDATE_PREVIOUS_MINOR,
        payload: minor
    }
};


// load the beacon details from firebase
export const getBeaconDetails = () => {
    const { currentUser } = firebase.auth();
    return dispatch => {
        firebase.database().ref(`/users/${currentUser.uid}/houseBeacon`)
                .once('value')
                .then(snapshot => {
                    dispatch({type: actionTypes.GET_BEACON_DETAILS, payload:snapshot.val()});
                });
    }
};