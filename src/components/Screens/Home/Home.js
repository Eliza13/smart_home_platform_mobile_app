import React, { Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Toast from 'react-native-toast-native';
import RNBluetoothListener from 'react-native-bluetooth-listener';
import { TabButtons, Spinner } from '../../UI';
import Background from '../../Hoc/Background';
import ListSmallTiles from '../../Lists/ListSmallTiles';
import BeaconConnection from '../../../BeaconConnection';
import SideDrawer from './SideDrawer';
import * as actions from '../../../store/actions';
import * as stringConstants from '../../../common/stringConstants';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = { connectionState : '' }
    }

    componentWillMount(){
        // enable bluetooth listener
        RNBluetoothListener.addEventListener('change', this.handleConnection);

        // load rooms
        this.props.loadRooms();
        // load devices
        this.props.loadDevices();
        // load favs
        this.props.fetchFavorites();
        // beacon details
        this.props.getBeaconDetails();
    }

    componentDidMount(){
        // enable Bluetooth for user
        RNBluetoothListener.getCurrentState().then(this.handleConnection);
    }

    componentWillUnmount(){
         // remove bluetooth listener
         RNBluetoothListener.disable();
         RNBluetoothListener.removeEventListener('change', this.handleConnection);
    }

    handleConnection = (resp) => {
        let {connectionState} = resp.type;
        if(connectionState === 'off'){
            RNBluetoothListener.enable();
            Toast.show('Bluetooth enabled for beacons detection.', Toast.LONG, Toast.BOTTOM, 
                        {  color: 'white', 
                           backgroundColor: '#02a5bc',
                           borderRadius: 40,
                           fontSize: 15,
                           paddingTop: 30,
                           paddingLeft: 10,
                           paddingRight: 10
                        });
        } 
        this.setState({connectionState});
    }


    renderTiles(){
        const { rooms, loading, error } = this.props;
        let tiles = <Spinner />;
        if(!loading) { 
            tiles = <ListSmallTiles data={rooms} 
                                    error={error} 
                                    typePress = {stringConstants.HOME_DETAILS}
                                    text='rooms'/>;
        }
        return tiles;
    }

    updateBeacon(minor){
        this.props.updatePreviousMinor(minor);
    }

    beaconConnection(){
        const { rooms, previousRoomMinor, beaconDetails } = this.props;
        if(rooms.length > 0 && beaconDetails.identifier && beaconDetails.uuid){
           const id = beaconDetails.identifier;
           const uuid = beaconDetails.uuid;
           return <BeaconConnection rooms={rooms} 
                                    previousRoomMinor = {previousRoomMinor}
                                    identifier = {id}
                                    uuid = {uuid}
                                    updateRoomMinor={this.updateBeacon.bind(this)}/>
        }
    }

    render(){
        return(
            <Background>
                <SideDrawer signOut={this.props.signOut.bind(this)}
                            notifNr = {this.props.notifNr}/>
                {this.renderTiles()}
                {this.beaconConnection()}
                <TabButtons hActive/>
            </Background>
        );
    }
}

const mapStateToProps = state => {
    const { rooms, loading, error, previousRoomMinor, beaconDetails } = state.rooms;
    const mappedRooms = _.map(rooms, (val, uid) => {
        return {...val, uid }
    });

    const {notifNr} = state.notifications;
    return { rooms: mappedRooms, loading, error, previousRoomMinor, beaconDetails, notifNr };
};

export default connect(mapStateToProps, actions)(Home); 