import React, { Component } from 'react';
import { ScrollView, Picker } from 'react-native';
import { Button, Text } from 'native-base';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ActionHeader, InputSection, FeatureSection, RoutineModal } from '../../UI';
import Background from '../../Hoc/Background';
import * as actions from '../../../store/actions';

class RoutinesActions extends Component {

    state = { showModal: false };
    
    toggleModal(){
        this.setState({ showModal: !this.state.showModal });
    }

    optionsChosen(data){
        this.setState({ showModal: false });
        this.props.routineFieldChanged({prop: 'actions', value: data});
    }
      
    render(){
        const { name, when, condition, appIcon, routineFieldChanged, onTick, screenTitle, cleanFormOnXPressed } = this.props;

        return (
            <Background> 
                <ActionHeader title={screenTitle}
                              onXPressed = { () => cleanFormOnXPressed() }
                              onTickPressed = { onTick } />
                <ScrollView>
                    <InputSection inputPlaceholder = "Routine Name"
                                  onChangeText = { text => routineFieldChanged({prop: 'name', value: text})}
                                  inputValue={name} /> 
    
                    <FeatureSection title="When"
                                    explanation="An event triggers a routine" > 
                        <Picker selectedValue={when}
                                mode='dropdown'
                                onValueChange={(itemValue) => routineFieldChanged({prop: 'when', value: itemValue})}
                                style={style.picker}>
                            <Picker.Item label="Beacon Proximity" value="beacon" />                            
                            <Picker.Item label="Morning" value="morning" />
                            <Picker.Item label="Afternoon" value="afternoon" />
                            <Picker.Item label="Evening" value="evening" />
                        </Picker>
                    </FeatureSection>
    
                    <FeatureSection title="Run These Actions"
                                    explanation="There must be at least one action" >

                            <Button onPress={() => this.toggleModal() } 
                                    style={style.btnStyle} >
                                    <Text uppercase={false} style={{ fontSize: 18 }}> Options </Text>
                            </Button>

                    </FeatureSection>

    
                    <FeatureSection title="Only If"
                                    explanation="Requires an action first" >
                         <Picker selectedValue={condition}
                                 mode='dropdown'
                                 onValueChange={(itemValue) => routineFieldChanged({prop: 'condition', value: itemValue})}
                                 style={style.picker}>
                            <Picker.Item label="Week Days" value="weekDays" />
                            <Picker.Item label="Rainy Day" value="rainyDay" />
                            <Picker.Item label="Weekend" value="weekend" />
                        </Picker>
                    </FeatureSection>

                    <FeatureSection title="Icon"
                                    explanation="Choose icon for routine" >
                         <Picker selectedValue={appIcon}
                                 mode='dropdown'
                                 onValueChange={(itemValue) => routineFieldChanged({prop: 'appIcon', value: itemValue})}
                                 style={style.picker}>
                            <Picker.Item label="yoga" value="yoga" />
                            <Picker.Item label="morning" value="morning" />
                            <Picker.Item label="sleep" value="sleep" />
                        </Picker>
                    </FeatureSection> 

                </ScrollView>   

                <RoutineModal showModal = { this.state.showModal }
                              doneClicked = { (data) => this.optionsChosen(data)} 
                              data = { this.props.data }/>

            </Background>   
        );
    }
}

const style = {
    picker: {
        backgroundColor: 'rgba(255,255,255,0.0)',
        color: 'white',
        flex: 1
    },
    btnStyle: {
        backgroundColor: 'rgba(255,255,255,0.0)',
        color: 'white'
      }
};

const mapStateToProps = (state, ownProps) => {

    // routine fields from redux
    const { name, when, actions, condition, appIcon, enabled, history, predefActions } = state.routines;

    // favorite actions
    let { favorites } = state.favorites;
    let favs = [];
    if(favorites){
        favs = _.map(favorites, ( val, id) => {

            if(ownProps.actionsFromEditRoutine){
                for(var el of ownProps.actionsFromEditRoutine){
                    if(el.id === id){
                        return {name: val.name, id, checked: el.checked};
                    }
                }
            }
            return { name: val.name, id, checked: false};
        });
    }

    // predefined actions
    const predef = _.map(predefActions, (val, id) => {
        if(ownProps.actionsFromEditRoutine){
            for(var el of ownProps.actionsFromEditRoutine){
                if(el && el.id === id){
                    return {name: val.name, id, checked: el.checked};
                }
            }
        }
        return { name: val.name, id, checked: false};
    });

    // all options together
    var data = [...favs, ...predef];
    return { name, when, actions, condition, appIcon, enabled, history, data };
};

export default connect(mapStateToProps, actions)(RoutinesActions);
