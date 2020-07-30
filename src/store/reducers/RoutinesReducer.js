import * as actionTypes from '../actions/actionTypes';

const initialState = {
    routines: {},
    loading: false,
    error: null,
    predefActions: {},
    actions: {},
    name: '',
    when: '',
    condition: '',
    appIcon: '',
    enabled: true,
    history: 'Settings'
}

export default (state = initialState, action) => {

    switch(action.type){

        // cases for loading routines
        case actionTypes.LOAD_ROUTINES_START: 
            return { ...state, loading: true };

        case actionTypes.LOAD_ROUTINES_SUCCESS: 
            return { ...state, loading: false, routines: action.routines };

        case actionTypes.LOAD_ROUTINES_FAIL: 
            return { ...state, error: action.error, loading: false };

        // cases for creating a routine
        case actionTypes.CREATE_ROUTINE_SUCCESS: 
            return {...state, name: '', when:'', actions: {}, condition:'', appIcon:'' };

        case actionTypes.ROUTINE_FIELD_CHANGED: 
            return {...state, [action.payload.prop]: action.payload.value };
        
        // case for editing a routine
        case actionTypes.EDIT_ROUTINE: 
            return {...state, name: '', when:'', actions: {}, condition:'', appIcon:'' };

        // case for fetching predefined actions
        case actionTypes.LOAD_PREDEFINED_ACTIONS_FOR_ROUTINES: 
            return {...state, predefActions: action.payload};

        default: 
            return state;
    }
};