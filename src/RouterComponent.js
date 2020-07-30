import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import LoginScreen from './components/Authentication/LoginScreen';
import Home from './components/Screens/Home/Home';
import HomeDetail from './components/Screens/Home/HomeDetail';
import Notifications from './components/Screens/Home/Notifications';
import Favorites from './components/Screens/Favorites/Favorites';
import FavoritesAdd from './components/Screens/Favorites/FavoritesAdd';
import FavoritesEdit from './components/Screens/Favorites/FavoritesEdit';
import FavoriteDetail from './components/Screens/Favorites/FavoriteDetail';
import Routines from './components/Screens/Routines/Routines';
import RoutinesAdd from './components/Screens/Routines/RoutinesAdd';
import RoutinesEdit from './components/Screens/Routines/RoutinesEdit';
import RoutineDetail from './components/Screens/Routines/RoutineDetail';
import RouterCtrlDevice from './components/ControlDevice/RouterCtrlDevice';
import { WeatherNotification, CookingNotification } from './components/UI/';

const RouterComponent = () => {

    return(
        <Router>
            <Scene key="root" hideNavBar >

                <Scene key="auth" hideNavBar > 
                    <Scene key="login" component = {LoginScreen} />
                </Scene>

                <Scene key="pages" hideNavBar initial >
                    <Scene key="homePage" component={Home} />
                    <Scene key="favsPage" component={Favorites} />
                    <Scene key="routinesPage" component={Routines} />

                    <Scene key="notifications" component = {Notifications}/>

                    <Scene key="routineDetail" component = {RoutineDetail} />
                    <Scene key="favDetail" component = {FavoriteDetail} />
                    <Scene key="homeDetail" component = {HomeDetail} />

                    <Scene key="favAdd" component = {FavoritesAdd}/>
                    <Scene key="routinesAdd" component = {RoutinesAdd}/>
                    <Scene key="favEdit" component = {FavoritesEdit}/>
                    <Scene key="routinesEdit" component = {RoutinesEdit}/>

                    <Scene key="deviceCtrl" component = {RouterCtrlDevice}/>

                    <Scene key="weatherNot" component = {WeatherNotification}/>
                    <Scene key="cookingNot" component = {CookingNotification}/>
                </Scene>

            </Scene>
        </Router>
    );
}

export default RouterComponent;