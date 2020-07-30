import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Left, Body, Button, Icon, ListItem, List, Content, Container } from 'native-base';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { HeaderDetailPage } from '../../UI';
import loadImagesDynamically from '../../../common/loadImagesDynamically';
import * as stringConstants from '../../../common/stringConstants';
 
class HomeDetail extends Component {

    renderList(){
        const { devs, elName } = this.props;
        if(devs){ 
            const list = devs.filter(el => {
                return el.location === elName; 
            });
    
            if(list.length > 0){
                const mapped = list.map(el => {
                    return (
                        <ListItem icon 
                                  style= {{ marginTop: 15 }}  
                                  key={el.id} 
                                  onPress={() => Actions.deviceCtrl({ page: el.category, title: el.name, device: el })} >
                            <Left>
                              <Button style={{ backgroundColor: "#2f4050" }}>
                                <Icon name="devices-other" type="MaterialIcons" />
                              </Button>
                            </Left>
              
                            <Body>
                              <Text> {el.name} </Text>
                            </Body>
                        </ListItem>
                    );
                })
                return mapped;
            }
            else{
                return <Text style={{ fontSize: 18, paddingLeft: 10, color: '#2f4050'}}> No devices yet. </Text>;
            }
        }  
    }

    render(){
        const { roomInfoData } = this.props;

        const renderData = roomInfoData.map(el => {
            return (
                <View style = {{ flexDirection: 'column'}} key= {el.id} >
                    <Image source = {loadImagesDynamically(el.icon)} style={style.dataImageStyle} />
                    <Text style={{ color: 'white', marginTop: 4}}> {el.name}  </Text>
                    <Text style={{ color: 'white', marginTop: 4}}> { this.props.thermoVal && el.name === 'Temperature' ? `${this.props.thermoVal} °C` : `${el.value}`} </Text>
                </View>
            );
        });


        return(

        <Container>
            <HeaderDetailPage  title = { this.props.elName }  src = { this.props.src } />
      
             {this.props.roomInfoData.length > 0    
                    ? <View style={ style.dataContainer}> 
                            {renderData}
                        </View> 
                    : null }

              <View style={ style.toggleContainer}> 
                <Text style={ style.toggleContainerTextStyle }> Devices </Text>
              </View>
      
              <Container >
                  <Content>
                      <List>
                         { this.renderList() } 
                      </List>
                  </Content>
              </Container>
        </Container>
        );
    }
}

const style = {
    toggleContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      height: 40
    },
    toggleContainerTextStyle: {
      color: '#2f4050', 
      fontSize: 18, 
      paddingLeft: 10,
      paddingTop: 10
    },
    dataContainer: {
      borderBottomColor: 'white', 
      borderTopColor: 'white', 
      borderBottomWidth: 2,
      borderTopWidth: 2,
      backgroundColor: '#354051',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      paddingRight: 15,
      paddingLeft: 15,
      height: 120
    },
    dataImageStyle: {
        width: 25, 
        height: 25
    }
};

const mapStateToProps = (state, ownProps) => {

    let { devices } = state.devices;
    const { rooms } = state.rooms;

    let mappedRooms = [];
    let roomInfoData = [];
    let devs = [];
    let thermoVal; 

    if(rooms){
        mappedRooms = _.map(rooms, (val, uid) => {
            return {...val, uid }; 
        });
    }

    if(mappedRooms.length > 0){
        for(var r of mappedRooms){
            if(r.name === ownProps.elName){
                roomInfoData = _.map(r.roomData, (val, id) => {
                    return {...val, id};
                });
            }
        }
    }
    
    if(devices){
        devs = _.map(devices, (val, id) => {
            if(val.category === stringConstants.HEAT) {
                thermoVal = val.temperature; 
            }
            return {...val, id};
        });
    }

    return {devs, roomInfoData, thermoVal};
}

export default connect(mapStateToProps)(HomeDetail);