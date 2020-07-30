import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toast from 'react-native-toast-native';
import RoutinesActions from './RoutinesActions';
import * as actions from '../../../store/actions';

class RoutinesAdd extends Component {

    onTickPressed(){
        const {name, when, actions, condition, appIcon, enabled, history} = this.props;

        if(name !== ''){
            const objToSend = { 
                name, 
                actions, 
                when: when || 'beacon', 
                condition: condition || 'weekDays', 
                appIcon: appIcon || 'yoga', 
                enabled, 
                history 
            };
            this.props.createRoutine(objToSend);
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
            <RoutinesActions onTick={this.onTickPressed.bind(this)}
                             screenTitle = 'New Routine'/>
        );
    }
}

const mapStateToProps = state => {
    const { name, when, actions, condition, appIcon, enabled, history } = state.routines;
    return { name, when, actions, condition, appIcon, enabled, history };
};

export default connect(mapStateToProps,actions)(RoutinesAdd);