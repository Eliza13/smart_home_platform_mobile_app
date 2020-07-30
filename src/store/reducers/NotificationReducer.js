import * as actionTypes from '../actions/actionTypes';

const initialState = {
    notifications: {},
    loading: false, 
    error: '',
    notifNr: 0
};

export default (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOAD_NOTIFICATIONS_START: 
            return {...state, loading: true, error: ''};
        
        case actionTypes.LOAD_NOTIFICATIONS_SUCCESS: 
            return {...state, notifications: action.payload , loading: false, error: ''};

        case actionTypes.LOAD_NOTIFICATIONS_FAIL: 
            return {...state, loading: false, error: 'Notifications cannot be loaded.'};

        case actionTypes.INCREASE_NOTIF_NR: 
            return {...state, notifNr: state.notifNr + 1};

        case actionTypes.RESET_NOTIF_NR: 
            return {...state, notifNr:0};

        default: 
            return state; 
    }
};

