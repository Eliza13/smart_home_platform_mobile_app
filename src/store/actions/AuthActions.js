import firebase from '@firebase/app';
import '@firebase/auth';
import { Actions } from 'react-native-router-flux';
import * as actionTypes from './actionTypes';

export const signIn = ({ email, password }) => {
    return dispatch => {
        dispatch({type: actionTypes.AUTH_START});
        firebase.auth().signInWithEmailAndPassword(email.trim(), password)
                .then(user => authSuccess(dispatch, user))
                .catch(err => {
                    console.log(err);
                    authFail(dispatch);
                });
    }
};

export const signUp = ({ email, password }) => {
    return dispatch => {
        dispatch({type: actionTypes.AUTH_START});
        firebase.auth().createUserWithEmailAndPassword(email.trim(), password)
                .then(user => authSuccess(dispatch, user))
                .catch(() => authFail(dispatch));
    }
};

export const emailChanged = (text) => {
    return {
        type: actionTypes.EMAIL_CHANGED,
        payload: text
    }
};

export const passwordChanged = (text) => {
    return {
        type: actionTypes.PASSWORD_CHANGED,
        payload: text
    }
};

const authSuccess = (dispatch, user) => {
    console.log('user in authSuccess is : ', user);
    dispatch({type: actionTypes.AUTH_SUCCESS, payload: user});
    Actions.pages(); 
};

const authFail = (dispatch) => {
    dispatch({type: actionTypes.AUTH_FAIL});
};


// sign out 
export const signOut = () => {
    const { currentUser } = firebase.auth();
    return dispatch => { 
        // CLEAN ALL THE LISTENERS FOR ROUTINES
        firebase.database().ref(`/users/${currentUser.uid}/routines`).off();      
        firebase.auth().signOut()
            .then(() => {
                dispatch({type: actionTypes.SIGN_OUT});
            })
            .catch(error => console.log('Sign out error: ', error));
    };
};

// reset password 
export const resetPassword = (email) => {
    return dispatch => {
        dispatch({type: actionTypes.AUTH_START});
        firebase.auth().sendPasswordResetEmail(email.trim())
                .then(() => { 
                    dispatch({type: actionTypes.RESET_PASSWORD_SUCCESS});
                })
                .catch(() => dispatch({type: actionTypes.RESET_PASSWORD_ERROR}));
    }
};

// change the screens (login or reset password)
export const changeToResetScreen = () => {
    return {
        type: actionTypes.RESET_PASSWORD_SCREEN
    }
};
