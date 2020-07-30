import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Toast from 'react-native-toast-native';
import RoutinesActions from './RoutinesActions';
import * as actions from '../../../store/actions';

class RoutinesEdit extends Component {

    componentWillMount(){
        _.each(this.props.routine, (value, prop) => {
            this.props.routineFieldChanged({prop, value});
        });
    }

    onTickPressed(){
        const {name, when, actions, condition, appIcon, enabled, history, id } = this.props;

        if(name !== ''){
            const objToUpdate = { name, when, actions, condition, appIcon, enabled, history };
            this.props.editRoutine(id, objToUpdate);
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
            <RoutinesActions {...this.props} 
                             onTick = {this.onTickPressed.bind(this)}
                             screenTitle = 'Edit Routine'
                             actionsFromEditRoutine = { this.props.routine.actions }/>
        );
    }
}

const mapStateToProps = state => {
    const { name, when, actions, condition, appIcon, enabled, history } = state.routines;
    return { name, when, actions, condition, appIcon, enabled, history };
};

export default connect(mapStateToProps, actions)(RoutinesEdit);