import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import { Actions } from 'react-native-router-flux';
import * as actionTypes from './actionTypes';


// actions to create a routine
export const createRoutine = (objToSend) => {

    const { currentUser } = firebase.auth();

    return dispatch => {
        firebase.database().ref(`/users/${currentUser.uid}/routines`)
                .push(objToSend)
                .then(() => {
                    dispatch({ type: actionTypes.CREATE_ROUTINE_SUCCESS });
                    Actions.pop();
                })
                .catch(() => console.log('error'));
    };
};

export const routineFieldChanged = ({ prop, value }) => {
    return {
        type: actionTypes.ROUTINE_FIELD_CHANGED,
        payload: { prop, value }
    };
};


// actions to load the routines
export const routinesLoad = () => {
    const { currentUser } = firebase.auth();
    return dispatch => {
        dispatch({ type: actionTypes.LOAD_ROUTINES_START });
        firebase.database().ref(`/users/${currentUser.uid}/routines`)
                .on('value', snapshot => {
                    dispatch(routinesLoadSuccess(snapshot.val()));
                }, error => {
                console.log(error);
                dispatch(routinesLoadFailed(error));
            });
    };
};

export const routinesLoadSuccess = (payload) => {
    return {
        type: actionTypes.LOAD_ROUTINES_SUCCESS,
        routines: payload
    };
};

export const routinesLoadFailed = (error) => {
    return {
        type: actionTypes.LOAD_ROUTINES_FAIL,
        error: error
    };
};


// action to delete a routine
export const deleteRoutine = (id) => {

    const { currentUser } = firebase.auth();
    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/routines/${id}`)
                .remove()
                .then(() => Actions.pop());
    };
};

// action to edit a routine
export const editRoutine = (id, objToUpdate) => {
    const { currentUser } = firebase.auth();

    return dispatch => {
        firebase.database().ref(`/users/${currentUser.uid}/routines/${id}`)
                .set(objToUpdate)
                .then( () => {
                    dispatch({ type: actionTypes.EDIT_ROUTINE });
                    Actions.pop();
                })
                .catch((error) => console.log(error));
    };
};

// clean the form data 
export const cleanFormOnXPressed = () => {
    return dispatch => {
        dispatch({ type: actionTypes.EDIT_ROUTINE });
        Actions.pop();
    };
};

// toggle the state of the routine 
export const toggleEnableRoutine = (id, value) => {

    const { currentUser } = firebase.auth();
    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/routines/${id}`)
            .update({ enabled: value})
            .then()
            .catch();
    };
};


// delete the actions of a routine if that favorite doesn't exist anymore
export const deleteRoutineAction = (routineId, actionId) => {

    const {currentUser } = firebase.auth();
    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/routines/${routineId}/actions/${actionId}`)
                .remove()
                .catch(error => console.log(error));
    };
};


// load predefined actions for a Routine
export const loadPredefinedActionsRoutine = () => {

    return dispatch => {
        firebase.database().ref('/predefinedRoutineActions/')
                .once('value')
                .then(snapshot => {
                    dispatch({type: actionTypes.LOAD_PREDEFINED_ACTIONS_FOR_ROUTINES, payload: snapshot.val()});
                })
                .catch(error => console.log(error));
    }
};
