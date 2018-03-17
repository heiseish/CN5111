//@flow
'use-strict'
import React, { Component } from 'react';
import { View, Platform, FlatList} from 'react-native';
import { connect } from 'react-redux';
import { Container,  Content, Icon, Item, Text, Right, Card, CardItem, 
  Input, Left, Body, ListItem
} from 'native-base';
import firebase from '../../model'
import { alert, Button as MyButton, primary, Header, secondary} from '../common'
import styles from './formStyle';
var _ = require('lodash/core')
import { back, navigate } from '../../actions'
const axios = require('axios')
var arrayMove = require('array-move');
import { LineDotsLoader } from 'react-native-indicator';


type State = {
  isLoading: boolean,
  data: Array<any>
};

class ParamsList extends Component {
  props: Props;
  state: State;

  constructor(props) {
    super(props)
    this.state={
      isLoading: false,
      data: []
    }
  }

  componentDidMount() {
    let arr = [], id = 0
    for (let datum of this.props.navigation.state.params.text) {
      arr.push({
        id: id++,
        text: datum
      })
    }
    this.setState({data: arr})
  }


  render() {
    return (
      <Container>  
        <Header title="Parameters" 
        hasLeft
        iconNameLeft="arrow-back"
        handlePressLeft={() => this.props.back()}
        hasRight
        iconNameRight="ios-add"
        handlePressRight={() => this.setState({data : [
          ...this.state.data,
          {
            id: this.state.data.length,
            text: ''
          }]})}
        />
        <Content keyboardShouldPersistTaps="always">
          <FlatList
            data={this.state.data}
            extraData={this.state}
            keyExtractor={(item, index) => item.id}
            renderItem={this._renderItem}
          />

          {this.state.isLoading ? <LineDotsLoader color={secondary.normal}/> :<MyButton
              style={styles.btn}
              color={primary.normal}
              onPress={() => this.submit()}
              text="Submit"/>}
        </Content>


      </Container>
    );
  }

  _renderItem = ({item}) => (
        <Item rounded key={item.id} style={{margin: 10}}>
            <Input placeholder='Rounded Textbox' 
            onChangeText={(text) => this.updateData(item, text)}
            value={item.text}/>
          </Item>
  )

  updateData(item: any, text: string) {
    let data = [
      ...this.state.data.slice(0, item.id),
      {
        id: item.id,
        text: text
      },
      ...this.state.data.slice(item.id + 1)
    ]
    this.setState({data: data})
  }

  submit() {
    this.setState({isLoading: true})
    let objective = '', constraint = [], params = []
    let text = ''
    for (let statement of this.state.data) {
      console.log(statement)
      if (statement.text.indexOf('max') !== -1)
        objective = statement.text
      else if (statement.text.indexOf('<=') !== -1
        || statement.text.indexOf('=>') !== -1
        || statement.text.indexOf('=') !== -1
        || statement.text.indexOf('<') !== -1
        || statement.text.indexOf('>') !== -1)
        constraint.push(statement.text)
      else
        params.push(statement.text)

    }
    let arr = [
      objective,
      ...constraint,
      ...params
    ]
    for (let datum of arr) {
      text += datum + '<br>'
    }

    axios.post('https://hacknroll18.herokuapp.com/math', {
      model: text.toLowerCase()
    })
    .then(response => {
      this.setState({isLoading: false})
      this.props.navigate('Result', {result: response.data})   })
    .catch(function (error) {
      console.log(error);
    });

  }

}

const mapDispatchToProps = (dispatch) => ({
  navigate: (route: string, params: any) => dispatch(navigate(route, params)),
  back: (route: string) => dispatch(back(route))
})

export default connect(null, mapDispatchToProps)(ParamsList);
