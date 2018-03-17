//@flow
'use-strict'
import React, { Component } from 'react';
import { View, Platform, FlatList} from 'react-native';
import { connect } from 'react-redux';
import { Container,  Content, Icon, Item, Text, Right, Card, CardItem, Spinner,Left, Body, ListItem
} from 'native-base';
import firebase from '../../model'
import { alert, Button as MyButton, primary, Header} from '../common'
import styles from './styles';
var _ = require('lodash/core')
import { back } from '../../actions'

type State = {
  isLoading: boolean,
  data: Array<any>
};

class List extends Component {
  props: Props;
  state: State;

  constructor(props) {
    super(props)
    this.state={
      isLoading: true,
      data: []

    }
    this.notesRef = firebase.database().ref('notes/');
  }

  componentDidMount() {
    let data = []
    this.notesRef.once("value", snapshot => {
      snapshot.forEach(snap => {
        console.log(snap.val().title)
        if (snap.val().title === this.props.navigation.state.params.title)
          data.push(snap.val())
      })
    })
    this.setState({data: data, isLoading: false})
  }



  render() {
    return (
      <Container>  
        <Header title={this.props.navigation.state.params.title} 
        hasLeft
        iconNameLeft="arrow-back"
        handlePressLeft={() => this.props.back()}
        />
        <Content keyboardShouldPersistTaps="always">
          {this.state.isLoading ? <Spinner/> : 
          <FlatList
            data={this.state.data}
            extraData={this.state}
            keyExtractor={(item, index) => item.id}
            renderItem={this._renderItem}
          />}
        </Content>


      </Container>
    );
  }

  _renderItem = ({item}) => (
      <ListItem button key={item.id} style={styles.listItem} onPress={() => {}}>
        <Left>
          <Body style={{marginLeft: 30}}>
            <View style={styles.title}>
              <Text note>{item.time}</Text>
              <View style={{width: 270, height: 1, backgroundColor: primary.normal}}/>
            </View>
            <Text style={styles.text}>{item.text}</Text> 
          </Body>
        </Left>
      </ListItem>
  )

}

const mapDispatchToProps = (dispatch) => ({
  back: (route: string) => dispatch(back(route))
})

export default connect(null, mapDispatchToProps)(List);
