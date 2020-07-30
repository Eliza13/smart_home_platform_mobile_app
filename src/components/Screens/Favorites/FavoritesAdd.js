import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toast from 'react-native-toast-native';
import FavoritesActions from './FavoritesActions';
import * as actions from '../../../store/actions';

class FavoritesAdd extends Component {

    onTickPressed(){
        const {name, device, setting, appIcon, enabled} = this.props;

        if(name !== ''){
            this.props.createFavorite({
                name, 
                enabled,
                device: device, 
                setting: setting || 'brightness', 
                appIcon: appIcon || 'music'
            });
        }
        else{
            Toast.show('Please insert a valid name.', Toast.LONG, Toast.BOTTOM, 
            {  color: 'white', 
               backgroundColor: '#02a5bc',
               borderRadius: 40,
               fontSize: 15,
               paddingTop: 30,
               paddingLeft: 10,
               paddingRight: 10
            });
        }
    }

    render(){
        return (
            <FavoritesActions onTick={ this.onTickPressed.bind(this) }
                              screenTitle = 'New Favorite'/>
        );
    }
}

const mapStateToProps = state => {
    const { device, name, setting, appIcon, enabled } = state.favorites;
    return { device, name, setting, appIcon, enabled };
};

export default connect(mapStateToProps, actions)(FavoritesAdd);