import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Toast from 'react-native-toast-native';
import FavoritesActions from './FavoritesActions';
import * as actions from '../../../store/actions';

class FavoritesEdit extends Component {

    componentWillMount(){
        _.each(this.props.element, (value, prop) => {
            this.props.favoriteFieldChanged({prop, value});
        });
    }

    onTickPressed(){
        const {name, device, setting, appIcon, element, id } = this.props;
        
        if(name !== ''){
            const objToUpdate = {name, device, setting, appIcon, enabled: element.enabled};
            this.props.editFavorite(id, objToUpdate);
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
        return(
            <FavoritesActions {...this.props}
                              onTick={this.onTickPressed.bind(this)}
                              edit = {true}
                              screenTitle = 'Edit Favorite'/>
        );
    }
}

const mapStateToProps = state => {
    const { device, name, setting, appIcon } = state.favorites;
    return { device, name, setting, appIcon };
};

export default connect(mapStateToProps, actions)(FavoritesEdit);