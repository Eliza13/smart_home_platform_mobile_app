import React from 'react';
import { StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Left, Body, Icon, Header, Title, Button } from 'native-base';

const CommonHeader = (props) => {
    return (
        <Header style = {{ backgroundColor: 'rgba(255,255,255,0.0)'}}>
                <StatusBar
                backgroundColor="#a1a4a8"
                barStyle="light-content"/>

                <Left>
                    <Button transparent  onPress = { () => Actions.pop() } >
                        <Icon name='arrow-back'  />
                    </Button>
                </Left>

                <Body>
                    <Title> {props.title} </Title>
                </Body>
        </Header>
    );
}

export default CommonHeader;