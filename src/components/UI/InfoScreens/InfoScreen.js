import React from 'react';
import { Text, View, Switch } from 'react-native';
import {Left, Body, Button, Icon, ListItem, Content, Container } from 'native-base';
import { HeaderDetailPage } from './HeaderDetailPage';
import { Actions } from 'react-native-router-flux';

const InfoScreen = (props) => {

    let items; 
    if( props.listItems ){
        items = props.listItems.map( el => {
            return (
                <ListItem icon style= {{ marginTop: 15 }} key={ el.id }>
                    <Left>
                        <Button style={{ backgroundColor: "#2f4050" }}>
                            { props.routine 
                                  ? <Icon name="heart" type="EvilIcons" />
                                  : <Icon name="devices-other" type="MaterialIcons" /> }
                        </Button>
                    </Left>

                    <Body>
                        <Text> {el.name} </Text>
                    </Body>
                </ListItem>
        ); });
    }

    return (
        <Container>

          <HeaderDetailPage  title = {props.title}  src = {props.src} >
                <Button transparent onPress = { props.onEditBtnPressed }>
                  <Icon type='Entypo' name='edit' />
                </Button>

                <Button transparent onPress = { props.onDeleteBtnPressed } >
                  <Icon type='MaterialCommunityIcons' name='delete' />
                </Button>
          </HeaderDetailPage>

          <View style={ style.toggleContainer}> 
            <Text style={ style.toggleContainerTextStyle }> Last Run: Today </Text>
            <Switch onValueChange={ props.onSwitchToggled }
                    value = { props.toggleEnabled }
                    thumbColor="#eee" 
                    trackColor={{false: "#ccc", true:"#2f4050"}}  />
          </View>

          <Container style={{ marginTop: 20 }} >
            <Content>
                  <Text style={ style.toggleContainerTextStyle }> { props.routine ?  'Run Favorite Actions' : 'Devices Used'} </Text>
                  { items } 
            </Content>
          </Container>

        </Container>
    );
}

const style = {
    toggleContainer: {
      borderBottomColor: '#2f4050', 
      borderBottomWidth: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      height: 80
    },
    toggleContainerTextStyle: {
      color: '#2f4050', 
      fontSize: 18, 
      paddingLeft: 10
    }
  }

export { InfoScreen };