import React from 'react';
import { ImageBackground, Image, StatusBar } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import bckr from '../../../assets/images/background.jpg';

const HeaderDetailPage = (props) => (
         <ImageBackground  source={ bckr } style={{width: "100%", height: 128, resizeMode: 'contain' }}>
          <Header style={style.headerStyle} span >

            <StatusBar
              backgroundColor="#a1a4a8"
              barStyle="light-content"/>

            <Left>
              <Button transparent  onPress = { () => Actions.pop() } >
                <Icon name='arrow-back'  />
              </Button>
            </Left>

            <Body>
              <Image source = { props.src } style={{ height: 30, width: 30, marginBottom: 10, resizeMode: 'contain' }} />
              <Title> { props.title } </Title>
            </Body>

            <Right>
              {props.children}
            </Right>

          </Header>
        </ImageBackground>
);

const style = {
    headerStyle: {
      backgroundColor:  'transparent',
      color: 'white'
    }
};

export {HeaderDetailPage};