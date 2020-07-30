import React, { Component } from 'react';
import { ScrollView, Picker } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ActionHeader, InputSection, FeatureSection } from '../../UI';
import Background from '../../Hoc/Background';
import * as actions from '../../../store/actions';
import * as stringConstants from '../../../common/stringConstants';

class FavoritesActions extends Component {

    constructor(props){
        super(props);
        this.state = {category: stringConstants.AUDIO};
        this._editFlag = true;
    }

    // update the category automatically if we come from edit page
    componentWillMount(){
        if(this.props.edit){
            this.setDeviceCategoryToFilter(this.props.device);
        }
    }

    componentDidUpdate(){
        if(this._editFlag) {
            this._editFlag = false;
        }
    }

    renderPickerOptionsForDevices(){
        const options = this.props.devs.map(el => {
            return <Picker.Item  key = {el.id}
                                 label={el.name} 
                                 value={el.id} />
        });
        return options;
    }

    setDeviceCategoryToFilter(id){
        // go to redux
        this.props.favoriteFieldChanged({prop:'device', value: id})

        // loop through devices, get the one with the id selected and get its category
        this.props.devs.forEach(cur => {
            if(cur.id === id){
                this.setState({category: cur.category});
            }
        });
    }


    showSettingsOptions(){
        let { setting, edit} = this.props;

        const options = new Map();
        options.set(stringConstants.AUDIO, [{label: 'Volume', key: 0 }, {label: 'Track List', key: 1}]);
        options.set(stringConstants.HEAT, [{label: 'Temperature', key: 0}, {label: 'Eco Mode', key: 1}]);
        options.set(stringConstants.LIGHTS, [{label: 'Intensity', key: 0}, {label: 'Color', key: 1}]);
        options.set(stringConstants.DOORS, [{label: 'Lock Hours', key: 0}, {label: 'Unlock Hours', key: 1}]);
        options.set(stringConstants.WINDOWS, [{label: 'Close Hours', key: 0}, {label: 'Open Hours', key: 1}]);
        options.set(stringConstants.LAUNDRY, [{label: 'Start Time', key: 0}, {label: 'Washing Mode', key: 1}]);
        options.set(stringConstants.OTHER, [{label: 'Other', key: 0}]);

        if(edit && this._editFlag) { 
            let opts; 
            options.forEach(function(value){
                for(var obj of value){
                    if(obj.label === setting){
                        opts = value.map(el => {
                            return <Picker.Item label={el.label} value={el.label} key = {el.key}/>;
                        });
                        break;
                    }
                }
            }, this);
            if(opts) return opts;
                
        } else {
            const a =  options.get(this.state.category).map(el => {
                return <Picker.Item label={el.label} value={el.label} key = {el.key}/>;
            });
            return a;
        }
    }


    render(){
        const { device, name, setting, appIcon, favoriteFieldChanged, onTick, screenTitle, cleanFormXPressed } = this.props;
        return (
            <Background>
                
                <ActionHeader title={screenTitle}
                              onXPressed = {() => cleanFormXPressed()}
                              onTickPressed = { onTick }/>

                <ScrollView>
                    <InputSection inputPlaceholder = 'Favorite name'
                                  onChangeText = { text => favoriteFieldChanged({prop:'name', value: text})}
                                  inputValue={name}/>

                    <FeatureSection title='Device' 
                                    explanation='Choose device'>
                        <Picker selectedValue={device}
                                mode='dropdown'
                                onValueChange={(itemValue) => this.setDeviceCategoryToFilter(itemValue)}
                                style={style.picker}>
                            {this.renderPickerOptionsForDevices()}
                        </Picker>
                    </FeatureSection >
    
                    <FeatureSection title='Settings' 
                                    explanation='Change device settings'>
                        <Picker selectedValue={setting}
                                mode='dropdown'
                                onValueChange={(itemValue) => favoriteFieldChanged({prop:'setting', value: itemValue})}
                                style={style.picker}>
                            {this.showSettingsOptions()}
                        </Picker>
                    </FeatureSection >

                    <FeatureSection title='Icon' 
                                    explanation='Choose icon for action'>
                        <Picker selectedValue={appIcon}
                                mode='dropdown'
                                onValueChange={(itemValue) => favoriteFieldChanged({prop:'appIcon', value: itemValue})}
                                style={style.picker}>
                            <Picker.Item label="audio" value="music" />
                            <Picker.Item label="lights" value="lights" />
                            <Picker.Item label="heat" value="nest" />
                            <Picker.Item label="windows" value="window" />
                            <Picker.Item label="doors" value="outside" />
                            <Picker.Item label="laundry" value="drop" />
                            <Picker.Item label="celebrate" value="party" />
                            <Picker.Item label="other" value="other" />
                        </Picker>
                    </FeatureSection >

                </ScrollView>
            </Background>
        );
    }
}

const style = {
    picker: {
        backgroundColor: 'rgba(255,255,255,0.0)',
        color: 'white',
        flex: 1
    }
};

const mapStateToProps = state => {

    // load favs properties
    const { device, name, setting, appIcon } = state.favorites;

    // load user devices 
    let { devices } = state.devices;
    let devs = [{id:0, name: 'No device'}];

    if(devices){
      devs = _.map(devices, (val, id) => {
        return {...val, id};
    });} 
    
    return { device, name, setting, appIcon, devs };
};

export default connect(mapStateToProps,actions)(FavoritesActions);
