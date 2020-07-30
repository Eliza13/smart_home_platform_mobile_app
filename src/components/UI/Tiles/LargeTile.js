import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Swipeout from 'react-native-swipeout';
import * as stringConstants from '../../../common/stringConstants';
import loadImages from '../../../common/loadImagesDynamically';

const LargeTile = (props) => {

    const { textStyle, imageStyle, containerStyle, notifMessage, swipeOut, moreTxtStyle } = style;
    const { element, title, message, typePress, details} = props;
    const src = element ? loadImages(element.appIcon) : null;

    let btn;
    if(typePress === stringConstants.ROUTINE_EDIT ){
        btn = <TouchableOpacity 
                    style={ containerStyle } 
                    onPress={() => Actions.routineDetail({ id: element.id })}>
                    {element ? <Text style={ textStyle }> {element.name} </Text> : null }
                    {src ? <Image source={ src } style={imageStyle}/> : null }
              </TouchableOpacity>
    } else {
        const detailsList = details ? details : null;
        let detailsArray = [];
        let extraDetails, rainInfo = false, cookingInfo = false;

        if(detailsList !== null) {
            for(var key in detailsList){
                if(key.includes('outfit') || key.includes('rain') || key.includes('weather')){
                    rainInfo = true;
                } 
                if(key.includes('cooking') || key.includes('oven') || key.includes('dinner')){
                    cookingInfo = true;
                }
                detailsArray.push({key, data: detailsList[key]});
            }
            extraDetails = detailsArray.map(el => <Text style={notifMessage} key={el.key}> {el.data} </Text>);
        }

        var swipeoutBtns = [
            {
              text: 'Delete',
              onPress: function(){
                props.delete(props.id);
              },
              backgroundColor: '#02a5bc',
              color: 'white'
            }
        ];

        let moreBtn = rainInfo 
                    ? <TouchableOpacity onPress={() => Actions.weatherNot()}>
                        <Text style={moreTxtStyle}>More</Text> 
                      </TouchableOpacity>
                    : null;

        let moreBtnCooking = cookingInfo 
                            ? <TouchableOpacity onPress={() => Actions.cookingNot()}>
                                <Text style={moreTxtStyle}>More</Text> 
                              </TouchableOpacity>
                            : null;   

        btn = (
            <Swipeout right={swipeoutBtns} style={swipeOut}>
                <TouchableOpacity style={ containerStyle }>
                        {title ? <Text style={ textStyle }> {title} </Text> : null }
                        {message ? <Text style={ notifMessage }> {message} </Text> : null }
                        {detailsArray.length > 0 ? extraDetails : null}
                        {moreBtn}
                        {moreBtnCooking}
                </TouchableOpacity>
            </Swipeout>
        );
    }

    return btn;
}

const style = {
    textStyle: {
        color: 'white',
        fontSize: 20,
        padding: 10,
        textAlign: 'center'
    },
    imageStyle:{
        resizeMode: 'center',
        width: 45,
        height: 45
    },
    containerStyle: {
        backgroundColor: 'rgba(238,238,238, 0.5)',
        borderColor: '#02a6bc75',
        borderWidth: 1.5,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginBottom: 20
    },
    notifMessage:{
        color: 'white',
        fontSize: 15,
        padding: 5,
        textAlign: 'center'
    }, 
    swipeOut: {
        backgroundColor: 'rgba(255,255,255,0.0)',
        padding: 8
    },
    moreTxtStyle: {
        color: '#2f4050',
        fontSize: 20,
        fontWeight: 'bold'
    }
};

export { LargeTile };