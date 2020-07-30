import * as actionTypes from '../actions/actionTypes';

var deviceId = '';

const initialState = {
    favorites: {},
    loading: false,
    error: '',
    name: '',
    device: deviceId,
    setting: '',
    appIcon:'',
    enabled: true
};

export default (state=initialState, action) => {

    switch(action.type){

        // cases for creating a favorite
        case actionTypes.FAVORITE_FIELD_CHANGED: 
            return {...state, [action.payload.prop]: action.payload.value};

        case actionTypes.CREATE_FAVORITE_SUCCESS: 
            return {...state, name:'', device: deviceId, setting:'', appIcon: ''};

        // cases for fetching favorites
        case actionTypes.FAVORITES_FETCH_START: 
            return {...state, loading: true, error: ''};

        case actionTypes.FAVORITES_FETCH_SUCCESS: 
            return {...state, favorites: action.payload, loading: false };

        case actionTypes.FAVORITES_FETCH_FAIL:
            return {...state, error: 'Something went wrong!', loading: false};

        // case for editing a favorite
        case actionTypes.EDIT_FAVORITE: 
            return {...state, name:'', device: deviceId, setting:'', appIcon: ''};

        // case for getting a default value of device id
        case actionTypes.INIT_DEVICE_ID_FOR_ACTION:
            deviceId = action.payload;
            return {...state, device: deviceId};

        default: 
            return state;
    }
};