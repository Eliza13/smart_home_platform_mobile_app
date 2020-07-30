import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RoomsReducer from './RoomsReducer';
import RoutinesReducer from './RoutinesReducer';
import FavoritesReducer from './FavoritesReducer';
import DeviceReducer from './DeviceReducer';
import NotificationReducer from './NotificationReducer';

export default combineReducers({
    auth: AuthReducer,
    rooms: RoomsReducer,
    routines: RoutinesReducer,
    favorites: FavoritesReducer,
    devices: DeviceReducer,
    notifications: NotificationReducer
});