import React, { Component } from  'react';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { InfoScreen, Confirm } from '../../UI';
import * as actions from '../../../store/actions';
import loadImages from '../../../common/loadImagesDynamically';

class FavoriteDetail extends Component {

    state = { showModal: false };

    deleteFav(){
        this.setState({showModal: !this.state.showModal});
    }

    editBtnPressed(){
        Actions.favEdit({ element: this.props.fbElement, id: this.props.uid});
    }

    // handlers for the modal
    onAccept(){
        this.props.deleteFavorite(this.props.uid);
    }

    onDecline(){
        this.setState({showModal: false});
    }

    // toggle the action state
    onSwitchToggle(id, enabled ){
        this.props.toggleEnableFav(id, !enabled);
    }

    render(){

        const { uid, fbElement, devs } = this.props;

        // show only the device involved in this action
        const deviceId = fbElement ? fbElement.device : '';
        const device = devs.filter(el => el.id === deviceId);

        // fix bug delete
        const enabled = fbElement ? fbElement.enabled  : true;
        const src = fbElement ? loadImages(fbElement.appIcon) : null;

        return(
            <Container>
                <InfoScreen title = {fbElement? fbElement.name : ''} 
                            id={uid}
                            src={src} 
                            routine={false}
                            listItems = {device}
                            toggleEnabled={enabled}
                            onSwitchToggled = { () => this.onSwitchToggle(uid, enabled)}
                            onEditBtnPressed = { () => this.editBtnPressed() }
                            onDeleteBtnPressed = { () => this.deleteFav() }/>
    
                <Confirm visible={this.state.showModal}
                         onAccept={this.onAccept.bind(this)}
                         onDecline={this.onDecline.bind(this)}>
                       Are you sure you want to delete the action?
                </Confirm>
            </Container>
        );
    }
};

const mapStateToProps = (state, ownProps) => {

    // this object has no uid coming from firebase => we need to pass down the uid we receive
    let { favorites } = state.favorites;
    let fbElement = favorites ? favorites[ownProps.uid] : null;

    // load devices 
    let { devices } = state.devices;
    let devs=[];

    if(devices){
        devs = _.map(devices, (val, id) => {
            return {...val, id};
        });
    }

    return {fbElement, devs};
};

export default connect(mapStateToProps, actions)(FavoriteDetail);