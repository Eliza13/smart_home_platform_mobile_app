import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SmallTile } from '../UI';

const ListSmallTiles = (props) => {

    const { data, error, text } = props;
    let tiles;

    if(error){
        tiles = <Text style={{fontSize: 20, color: 'red'}}> {error} </Text>;
    } else if (data && data.length>0){
        tiles = data.map(el => {
            return <SmallTile key={el.uid} 
                              typePress = {props.typePress} 
                              element={el}/>
        });
    } else {
        tiles = (
            <View>
                <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}> No {text} yet. </Text>
                <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}> Press the + button to add {text}. </Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.viewStyle}>
            {tiles}
        </ScrollView>
    );
}

const styles = {
    viewStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        paddingBottom: 10,
        paddingTop: 10
    }
};

export default ListSmallTiles; 