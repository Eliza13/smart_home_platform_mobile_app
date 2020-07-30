import React, { Component } from 'react';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { InfoScreen, Confirm } from '../../UI';
import * as actions from '../../../store/actions';
import loadImages from '../../../common/loadImagesDynamically';

class RoutineDetail extends Component {

    state = { showModal: false };

    componentWillMount(){
        
        const { fbRoutine, deleteRoutineAction, data } = this.props;
        const { actions } = fbRoutine;

        if(fbRoutine && actions){

            var foundMatch = false;
            var indexToDelete = 0;

            for(var action of actions){

                for(var id of data){
                    if(action && action.id === id){
                        foundMatch = true;
                        break; 
                    }
                }

                // if we don't find matching ids, we delete the action
                indexToDelete = actions.indexOf(action);
                foundMatch ? foundMatch=false : deleteRoutineAction(this.props.id, indexToDelete);
            }
        }
    }

    deleteBtnPressed(){
        this.setState({showModal: !this.state.showModal});
    }

    editBtnPressed(){
        Actions.routinesEdit({ id: this.props.id, routine: this.props.fbRoutine });
    }

    togglePressed(id, enabled){
        this.props.toggleEnableRoutine(id, !enabled);
    }

    // handlers for the modal
    onAccept(){
        const id = this.props.id;
        this.props.deleteRoutine(id);        
    }

    onDecline(){
        this.setState({showModal: false});
    }

    render(){

        const { fbRoutine, id } = this.props; 

        const actions = fbRoutine ? fbRoutine.actions : null;
        const enabled = fbRoutine ? fbRoutine.enabled : true; 
        const src = fbRoutine ? loadImages(fbRoutine.appIcon) : null;

        return (
           <Container>
               <InfoScreen title = { fbRoutine ? fbRoutine.name : '' } 
                           src = { src }
                           id = { id }
                           routine = { true }
                           listItems = { actions } 
                           toggleEnabled = { enabled }
                           onSwitchToggled = { () => this.togglePressed(id, enabled)}
                           onEditBtnPressed = { () => this.editBtnPressed() }
                           onDeleteBtnPressed = { () => this.deleteBtnPressed() } />
    
                <Confirm visible={this.state.showModal}
                         onAccept={this.onAccept.bind(this)}
                         onDecline={this.onDecline.bind(this)}>
                         Are you sure you want to delete the routine?
                </Confirm>
           </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    // get the routine
    let { routines } = state.routines;
    let fbRoutine = routines ? routines[ownProps.id] : null;

    // take the ids of the existing fav actions
    const { favorites } = state.favorites;
    let favIdsArray = [];
    if(favorites){
        favIdsArray = _.map(favorites, (val, id) => {
            return id;
        });
    } 
    
    // take the ids of predefined actions
    const { predefActions } = state.routines;
    const predefIdsArray = _.map(predefActions, (val, id) => {
        return id;
    });

    const data = [...favIdsArray, ...predefIdsArray];

    return { fbRoutine, data };
};

export default connect(mapStateToProps, actions)(RoutineDetail); 