import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { Header, TabButtons, Spinner, NavBarButton } from '../../UI';
import Background from '../../Hoc/Background';
import RoutinesList from '../../Lists/RoutinesList';
import CustomModal from '../CustomModal';
import settings from '../../../assets/icons/addBtn.png';
import * as stringConstants from '../../../common/stringConstants';
import * as actions from '../../../store/actions';

class Routines extends Component {

    state={ showModal: false }

    componentWillMount(){
        this.props.routinesLoad();
        this.props.loadPredefinedActionsRoutine();
    }

    onSettingsPressed(){
        this.setState({ showModal: !this.state.showModal });
    } 

    onXPressed(){
        this.setState({ showModal: false });
    }

    onAddRoutinePressed(){
        this.onXPressed();
        Actions.routinesAdd();
    }

    render(){

        const { loading, rts, error } = this.props;
        let display; 

        if(loading){
            display = <Spinner />;
        }

        if(!loading){
            display = <RoutinesList routines={ rts } 
                                    error={ error } />;
        }

        return(
            <Background>
                <Header headerText="Routines" >
                    <NavBarButton src={settings} onPress={this.onSettingsPressed.bind(this)}/>
                </Header>

                { display }

                <CustomModal onPress={this.onXPressed.bind(this)} 
                             visible={this.state.showModal}
                             actionOrRoutine={stringConstants.ROUTINE}
                             onAddPress={this.onAddRoutinePressed.bind(this)}/>

                <TabButtons rActive/>
            </Background>

        );
    }
}

const mapStateToProps = (state) => {

    const {routines, loading, error} = state.routines;
    const mappedRoutines = _.map(routines, (val, uid) => {
        return {...val, id: uid}
    });

    return {
        loading,
        error,
        rts: mappedRoutines
    };
};

export default connect(mapStateToProps, actions)(Routines); 