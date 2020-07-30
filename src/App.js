import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import OneSignal from 'react-native-onesignal';
import firebase from '@firebase/app';
import '@firebase/auth';
import {saveNotification} from './store/actions/';
import reducers from './store/reducers';
import RouterComponent from './RouterComponent';
import LoginForm from './components/Authentication/LoginScreen';
import LoadingScreen from './components/Authentication/LoadingScreen';
import SplashScreen from 'react-native-splash-screen';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
 
class App extends Component {

    constructor(properties) {
        super(properties);
        OneSignal.init("946f4f89-9117-4e01-98c0-cd9a86f82aa3");
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    }
    
    state = { logedIn: null }

    // hide the splash screen once the app loads
    componentDidMount(){
        SplashScreen.hide();
    }

    componentWillMount(){
        
        // check if the app is already initialised
        if (!firebase.apps.length) {
            firebase.initializeApp({
                    apiKey: "AIzaSyC4YZeBGh_ygx_v_ZdCChcze6XnVRJ7pTY",
                    authDomain: "smarthomeplatform-5d036.firebaseapp.com",
                    databaseURL: "https://smarthomeplatform-5d036.firebaseio.com",
                    projectId: "smarthomeplatform-5d036",
                    storageBucket: "smarthomeplatform-5d036.appspot.com",
                    messagingSenderId: "537070853700"
                });
        }

        firebase.auth().onAuthStateChanged( user => {
            if(user){
                // save the uid in asyncStorage
                this.saveUserId(user.uid);
                this.setState({ logedIn: true });
            } else{
                this.setState({ logedIn: false });
            }
        }); 
    }

    async saveUserId(uid){
        try {
            await AsyncStorage.setItem('userId', uid);
        } catch (error) {
            console.warn(error.message);
        }
    }

    // code for OneSignal 
    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    async onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
        try{
            const id = await AsyncStorage.getItem('userId');
            store.dispatch(saveNotification(openResult.notification.payload, id));
        } catch(error){
            console.warn(error.message);
        } 
    }

    onReceived(notification) {
        // store.dispatch(saveNotification(notification.payload));
    }

    onIds(device) {
        // console.log('Device info: ', device);
    }

    renderComponents(){
        switch(this.state.logedIn){
            case true: 
                return <RouterComponent />;

            case false: 
                return <LoginForm />;
            
            default: 
                return <LoadingScreen />
        }
    }

    render(){

        return (
            <Provider store={store}>
                {this.renderComponents()}
            </Provider>
        );
    }
}

export default App;