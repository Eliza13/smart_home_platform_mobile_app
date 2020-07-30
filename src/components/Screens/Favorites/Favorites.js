import React, { Component} from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Header, TabButtons, Spinner, NavBarButton } from '../../UI';
import Background from '../../Hoc/Background';
import ListSmallTiles from '../../Lists/ListSmallTiles';
import CustomModal from '../CustomModal';
import settings from '../../../assets/icons/addBtn.png';
import * as stringConstants from '../../../common/stringConstants';
import * as actions from '../../../store/actions'; 

class Favorites extends Component {

    state={ showModal: false }

    onSettingsPressed(){
        this.setState({ showModal: !this.state.showModal });
    } 

    onXPressed(){
        this.setState({ showModal: false });
    }

    onAddFavPressed(){
        this.onXPressed();
        Actions.favAdd();
    }

    renderTiles(){
        const { favorites, loading, error } = this.props;
        let tiles = <Spinner />;
        if(!loading) { 
            tiles = <ListSmallTiles data={favorites} 
                                    error={error} 
                                    typePress = {stringConstants.FAV_DETAILS}
                                    text='favorites'/>;
        }
        return tiles;
    }


    render(){
        return(
            <Background> 
                <Header headerText="Favorites">
                    <NavBarButton src={settings} onPress={this.onSettingsPressed.bind(this)}/>
                </Header>

                { this.renderTiles() }

                <CustomModal onPress={this.onXPressed.bind(this)} 
                             visible={this.state.showModal}
                             actionOrRoutine={stringConstants.ACTION}
                             onAddPress={this.onAddFavPressed.bind(this)}/>

                <TabButtons fActive />
            </Background>
        );
    }
}

const mapStateToProps = state => {
    const { favorites, loading, error } = state.favorites;
    const mappedFavs = _.map(favorites, (val, uid) => {
        return {...val, uid };
    });

    return { favorites: mappedFavs, loading, error };
}

export default connect(mapStateToProps, actions)(Favorites); 