//@flow
'use-strict'
import { ImagePicker } from 'expo';
import React, { Component } from 'react';
import { View, Platform, FlatList} from 'react-native';
import { connect } from 'react-redux';
import { Container,  Content, Icon, Item, Text, Right, Card, CardItem, Spinner,
  Footer, FooterTab, Badge, Button, ActionSheet, Left, Body, ListItem
} from 'native-base';
import { alert, Button as MyButton, Header, Image, primary, secondary} from '../common'
import styles from './styles';
import { visionLogo } from '../../lib/'
var _ = require('lodash/core')
import { reset } from '../../actions'
let ios = Platform.OS === 'ios'




type State = {
  isLoading: boolean
};

class Result extends Component {
  state: State;

  constructor(props) {
    super(props)
    this.state = {
      results: Object.entries(this.props.navigation.state.params.result)
    }
  }

  render() {
    return (
      <Container>  
        <Header title="Logo"/>
        <Content keyboardShouldPersistTaps="always">
        {/**this.state.loaded ? <View style={styles.result}><Text note>Brand</Text><Text style={styles.resultText}>{this.state.brand}</Text></View> :  null**/}
        {this.state.results.map(result => (
            <ListItem button key={result[0]} style={styles.listItem}>
                  <Text note >{result[0]}: </Text>
                  <View style={{width: 50}}/>
                  <Text style={styles.resultText}>{typeof result[1] === 'boolean' ? result[1] ? 'Yes' : 'No' : result[1]}</Text>
              </ListItem>
          ))}
              
          <MyButton
              style={styles.btn}
              color={primary.normal}
              onPress={() => this.props.reset()}
              text="Return"/>
        </Content>
      </Container>
    );
  }


}


const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(reset())
})

export default connect(null, mapDispatchToProps)(Result);
