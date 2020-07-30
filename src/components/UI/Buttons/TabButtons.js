import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { RoundedButton } from './RoundedButton';

// import all icons
import images from '../../../assets';

class TabButtons extends Component {

    onHomePress(){
        Actions.homePage();
    }

    onFavPress(){
        Actions.favsPage();
    }

    onRoutinesPress(){
        Actions.routinesPage();
    }

    render(){
        const style = {color: 'white'};
        const { hActive, fActive, rActive } = this.props;

        return (
            <View style={styles.containerStyle}>
                <RoundedButton title='Home'
                               src={ hActive ? images['homeActive'] : images['homeInactive'] } 
                               style = { hActive ? style : '' }
                               onPress={this.onHomePress}/>

                <RoundedButton title='Favorites' 
                               src={ fActive ? images['favActive'] : images['favInactive'] } 
                               style = { fActive ? style : '' }
                               onPress={this.onFavPress} />

                <RoundedButton title='Routines' 
                               src={ rActive ? images['rtActive']: images['rtInactive'] }
                               style = { rActive ? style : '' }
                               onPress = {this.onRoutinesPress} />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        paddingTop: 10,
        paddingBottom: 10
    }
}

export { TabButtons };