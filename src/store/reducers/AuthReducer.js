import * as actionTypes from '../actions/actionTypes';

const initialState = {
    email: '',
    password: '',
    error: '',
    loading: false,
    user: null,
    forgotPasswordScreen: false
};

export default (state=initialState, action) => {

    switch(action.type){
        // input events
        case actionTypes.EMAIL_CHANGED:
            return {...state, email: action.payload};

        case actionTypes.PASSWORD_CHANGED:
            return {...state, password: action.payload};

        // authentication
        case actionTypes.AUTH_START: 
            return {...state, loading: true, error: ''};

        case actionTypes.AUTH_FAIL:
            return {...state, loading:false, error: 'Authentication failed!'}

        case actionTypes.AUTH_SUCCESS:
            return {...state, ...initialState, user: action.payload }; 

        case actionTypes.SIGN_OUT: 
            return {...initialState};

        // reset password
        case actionTypes.RESET_PASSWORD_ERROR: 
            return {...state, error: 'Password reset failed!', loading: false}

        case actionTypes.RESET_PASSWORD_SCREEN:
            return {...state, forgotPasswordScreen: !state.forgotPasswordScreen, error: ''}

        case actionTypes.RESET_PASSWORD_SUCCESS:
            return {...state, forgotPasswordScreen: !state.forgotPasswordScreen, loading: false, error: ''}

        default: 
            return state;
    }
}