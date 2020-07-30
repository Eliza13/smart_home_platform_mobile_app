import firebase from '@firebase/app';
import '@firebase/database';
import '@firebase/auth';
import { Actions } from 'react-native-router-flux';
import * as actionTypes from './actionTypes';


// create a new favorite
export const createFavorite = ({name, device, setting, appIcon, enabled}) => {

    const {currentUser} = firebase.auth();

    return dispatch => {
        firebase.database().ref(`/users/${currentUser.uid}/favorites`)
                .push({name, device, setting, appIcon, enabled})
                .then(() => {
                    dispatch({type: actionTypes.CREATE_FAVORITE_SUCCESS});
                    Actions.pop();
                })
                .catch(() => console.log('error'));
    };
};

export const favoriteFieldChanged = ({prop, value}) => {
    return {
        type: actionTypes.FAVORITE_FIELD_CHANGED,
        payload: {prop, value}
    };
};


// fetch all favorite actions
export const fetchFavorites = () => {

    const { currentUser } = firebase.auth();
    return dispatch => {
        dispatch({type: actionTypes.FAVORITES_FETCH_START});
        
        firebase.database().ref(`/users/${currentUser.uid}/favorites`)
                .on('value', 
                    snapshot => {
                    dispatch({type: actionTypes.FAVORITES_FETCH_SUCCESS, payload: snapshot.val()});
                }, 
                    error => {
                    dispatch({ type:actionTypes.FAVORITES_FETCH_FAIL });
                });
    };
};


// delete a favorite
export const deleteFavorite = (id) => {

    const { currentUser } = firebase.auth();
    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/favorites/${id}`)
                .remove()
                .then(() => Actions.pop())
                .catch(error => console.log(error));
    };
};


// edit a favorite
export const editFavorite = (id, objToUpdate) => {

    const { currentUser } = firebase.auth();
    return dispatch => {
        firebase.database().ref(`/users/${currentUser.uid}/favorites/${id}`)
                .set(objToUpdate)
                .then(() => {
                    dispatch({type: actionTypes.EDIT_FAVORITE});
                    Actions.pop(); //! changed
                })
                .catch(() => console.log('error'));
    };
};


// clean the form when the user cancels an action
export const cleanFormXPressed = () => {
    return dispatch => {
        dispatch({type: actionTypes.EDIT_FAVORITE});
        Actions.pop();
    };
};


// toggle the 'enable/disable' mode of the action
export const toggleEnableFav = (id, value) => {

    const { currentUser } = firebase.auth();
    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/favorites/${id}/`)
                .update({enabled: value})
                .then(() => console.log(id, value))
                .catch(error => console.log(error));
    };
};
