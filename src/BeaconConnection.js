import React, { Component } from 'react';
import { DeviceEventEmitter, PermissionsAndroid } from 'react-native';
import Beacons from 'react-native-beacons-manager';
import { Actions } from 'react-native-router-flux';
import loadImages from './common/loadImagesDynamically';


class BeaconConnection extends Component {

    constructor(props) {
        super(props);
        // #region
        // this.state = {        
        //     identifier: '20:91:48:5E:12:A0',
        //     uuid: 'E2C56DB5-DFFB-48D2-B060-D0F5A71096E0'
        // };

        // this._region = {
        //     identifier: 'ios',
        //     uuid: this.state.uuid
        // };
        // #endregion
        this._region = {
            identifier: this.props.identifier,
            uuid: this.props.uuid
        };
        this._isMounted = false;
        this._beacon = {};
        this._counter = 0;
    }
  
    componentWillMount(){
        // start detecting beacons 
        Beacons.detectIBeacons();
        // detect beacons inside the region
        Beacons.startRangingBeaconsInRegion(this._region)
                .then(() => console.log('Beacons ranging'))
                .catch(error => console.log(`Beacons ranging not started, error: ${error}`));
        Beacons.startMonitoringForRegion(this._region)
                .then(() => console.log('Beacons monitoring'))
                .catch(error => console.log(`Beacons monitoring not started, error: ${error}`));
    }

    componentDidMount(){

         // set mounted state
         this._isMounted = true;

         // ask for Android location permission
         try {
            const granted = PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        'title': 'Location Permission',
                        'message': 'App needs to access your location.'
                    }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Location permitted.");
            } else {
                console.log("Location permission denied.");
            }

        } catch (err) {
            console.log(err);
        }

        // attach listeners for beacon 
        // ranging = better than monitoring, used for 'monitoring' in the foreground
        this.beaconsDidRange = DeviceEventEmitter.addListener('beaconsDidRange',
            (data) => {
                if(this._isMounted){
                    this._beacon = data.beacons[0];
                    _prevMinor = this.props.previousRoomMinor;
                    if(this._beacon && this._beacon.minor !== _prevMinor){
                        for (var r of this.props.rooms){
                            if(r.minor === this._beacon.minor){
                                _prevMinor = this._beacon.minor;
                                this._counter++; 
                                this.props.updateRoomMinor(this._beacon.minor);
                                Actions.homeDetail({elName: r.name, src: loadImages(r.appIcon)});
                                if(this._counter > 0){
                                    Beacons.stopRangingBeaconsInRegion(this._region);
                                    this._counter = 0;
                                }
                            }
                        }
                    };
                }
            });

            // monitoring = used for monitoring in the background
            this.beaconsDidEnterEvent = DeviceEventEmitter.addListener(
                'regionDidEnter',
                (data) => {
                   console.log('Monitoring');
                }
            ); 
    }
  
    componentWillUnmount(){
        // set mounted to false and remove listeners for beacon
        this._isMounted = false;
        // this.beaconsDidRange.remove();
        // this.beaconsDidRangeEvent.remove();
    }

    render() {
        return null;
    }
} 

export default BeaconConnection; 