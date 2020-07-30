import React from 'react';
import { Image, StatusBar } from 'react-native';
import { Header, Left, Body, Button, Icon, Title, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Background from '../Hoc/Background';


const BasicLayout = (props) => {

    const { imgStyle } =  style;

    return (
        <Background>

            <Header style = {{ backgroundColor: '#2f4050' }} >
                <StatusBar
                    backgroundColor="#a1a4a8"
                    barStyle="light-content"/>

                <Left>
                    <Button transparent onPress = {() => Actions.pop()} >
                        <Icon name='arrow-back' />
                    </Button>
                </Left>

                <Body style={{flexDirection: "row", justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={ props.deviceIcon } style={ imgStyle} />
                    <Title> { props.deviceName } </Title>
                </Body>

                <Right />
            </Header>

           { props.children }
        </Background>
    );
};

const style = {
    imgStyle: {
        height: 20, 
        width: 20, 
        marginRight: 8,
        resizeMode: 'contain'
    }
}; 

export default BasicLayout; 