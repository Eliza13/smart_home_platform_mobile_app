import React, { Component } from 'react';
import { Container, Content, ListItem, CheckBox, Text, Body, List, Button } from 'native-base';
import { Modal } from 'react-native';

class RoutineModal extends Component {

  state = {
    options: this.props.data
  };

  toggleState(el, index){
     var newEl = {...el, checked: !el.checked};
     var newOptions = [...this.state.options];
     newOptions[index] = newEl;
     this.setState({ options: newOptions });
  }

  dispatchData(){

    // filter what is checked 
    const data = this.state.options.filter(el => el.checked === true);

    // send chosen options back
    this.props.doneClicked(data);
  }

  renderCheckBoxItems(){

    const data  = this.state.options;

      if(data && data.length > 0) {
        var list = data.map( (el, index) => {
            return (
                <ListItem key = {el.id} > 
                  <CheckBox checked={ el.checked } 
                            color='#02a5bc'
                            onPress={ () => this.toggleState(el, index) } />
                  <Body>
                    <Text> { el.name } </Text>
                  </Body>
                </ListItem>
            );
        });

        return list;
      }
      else{
          return <Text> No actions yet! </Text>
      }
  }
  
  render(){
    return (
      <Modal visible={this.props.showModal}
             transparent
             animationType="slide"
             onRequestClose={ () => {}}>

        <Container style={ style.containerStyle}> 
          <Container style={ style.modalBoxStyle }>

            <Content style={ style.contentStyle }>  
              <List style={{ marginBottom: 10 }}>
                { this.renderCheckBoxItems()}
              </List>
            </Content>
  
            <Button style={ style.btnStyle}
                    onPress={ () => this.dispatchData() }>
              <Text> Done </Text>
            </Button>

          </Container>
        </Container>

       </Modal>
    );
  }
};

const style = {
  containerStyle: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'rgba(53,69,82,0.9)'
  },
  contentStyle: {
    backgroundColor: '#fff',
    marginBottom: 10,
    marginTop: 10,
    padding: 20
  },
  modalBoxStyle: {
    marginTop: 180,
    marginBottom: 180,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  btnStyle: {
    marginTop: 20, 
    marginBottom: 20, 
    marginLeft: 20, 
    borderRadius: 10, 
    backgroundColor: '#02a5bc'
  }
}

export { RoutineModal }; 