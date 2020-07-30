import * as actionTypes from '../actions/actionTypes';

const initialState = {
    devices: {}
};

export default (state=initialState, action) => {

    switch(action.type){
        case actionTypes.LOAD_DEVICES:
            return {...state, devices: action.payload};

        default:
            return state;

    };
};