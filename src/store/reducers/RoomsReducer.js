import * as actionTypes from '../actions/actionTypes';

const initialState = {
    rooms: {},
    error: '',
    loading: false,
    previousRoomMinor: 0,
    beaconDetails: {}
}

export default (state=initialState, action) => {
    switch(action.type){
        case actionTypes.LOAD_ROOMS_START: 
            return {...state, loading: true, error: ''};

        case actionTypes.LOAD_ROOMS_SUCCESS:
            return {...state, rooms: action.payload, error:'', loading:false};

        case actionTypes.LOAD_ROOMS_FAIL:
            return {...state, loading: false, error: 'Something went wrong!'};

        case actionTypes.UPDATE_PREVIOUS_MINOR:
            return {...state, previousRoomMinor: action.payload};

        case actionTypes.GET_BEACON_DETAILS:
            return {...state, beaconDetails: action.payload}

        default:
            return state;
    }
}