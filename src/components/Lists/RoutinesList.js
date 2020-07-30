import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { LargeTile } from '../UI';
import * as stringConstants from '../../common/stringConstants';

const RoutinesList = (props) => {

    const { routines, error } = props;
    let tiles; 

    if(error){
        tiles = <Text style={[styles.textStyle, {color: 'red'}]}> Error: { error } </Text>;
    }
    else if(routines && routines.length > 0){
        tiles = routines.map(el => {
            return <LargeTile  element = {el}
                               key={el.id}
                               typePress = { stringConstants.ROUTINE_EDIT } />
        });
    }
    else{
        tiles = (
            <View>
                <Text style={ styles.textStyle }> No routines yet. </Text>
                <Text style={[styles.textStyle, {fontSize: 18}]}> Press the + button to add a routine.  </Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={ styles.viewStyle }>
            { tiles }
        </ScrollView>
    );
}

const styles = {
    viewStyle: {
        flexGrow: 1,
        paddingBottom: 10,
        paddingTop: 10,
        justifyContent: 'center'
    },
    textStyle: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    }
}

export default RoutinesList; 
