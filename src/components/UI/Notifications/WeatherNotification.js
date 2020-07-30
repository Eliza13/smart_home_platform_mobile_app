import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, DeckSwiper, Card, CardItem, Text, Left, Body, Icon } from 'native-base';
import Background from '../../Hoc/Background';
import CommonHeader from './CommonHeader';

const cards = [
  {
    name: 'Recommendation One',
    image: require('../../../assets/images/w1.jpg')
  }, 
  {
    name: 'Recommendation Two',
    image: require('../../../assets/images/w2.jpg')
  },
  {
    name: 'Recommendation Three',
    image: require('../../../assets/images/w3.jpg')
  },
  {
    name: 'Recommendation Four',
    image: require('../../../assets/images/w4.jpg')
  }
];


class WeatherNotification extends Component {
  render() {

    return (
       <Background >
          <CommonHeader title = "Outfit Recommendations" />

          <View style = {{ marginTop: 30 }} >   
            <DeckSwiper
                dataSource={cards}
                renderItem={item =>
                <Card style={{ elevation: 3, marginLeft: 15, marginRight: 15 }}>
                    <CardItem>
                    <Left>
                        <Icon name="umbrella" style={{ color: '#02a5bc' }} type = "FontAwesome"/>
                        <Body>
                        <Text note> Today's Outfit Suggestion </Text>
                        <Text>{item.name}</Text>
                        </Body>
                    </Left>
                    </CardItem>

                    <CardItem />

                    <CardItem cardBody>
                    <Image style={{ height: 300, flex: 1 }} source={item.image} />
                    </CardItem>

                    <CardItem />

                    <CardItem>
                    <Icon name="heart" style={{ color: '#ED4A6A', fontSize: 20 }} />
                    <Text> Rain forecast </Text>
                    </CardItem>

                </Card>
             }/>
            </View>
      </Background>
    );
  }
}

export { WeatherNotification };