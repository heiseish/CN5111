//@flow
'use-strict'
import React, { Component } from 'react';
import { Image, View, StatusBar ,TextInput} from 'react-native';
import { connect } from 'react-redux';
import { Text, Container, Toast, Content, Icon, Item, Label, Input, Spinner} from 'native-base';
import {Button, Header, alert} from '../common'
import styles from './styles';
import { saveNote } from '../../model/query'
import { back } from '../../actions';
var _ = require('lodash/core')

type Props = {
  navigation: any,
  back: () => void
};
type State = {
  title: string,
  text: string,
  time: any,
  loading: boolean
};

class NoteForm extends Component {
  props: Props;
  state: State;
  _textInput: string;
  _subjectInput: string;

  constructor(props){
    super(props);
    this.state = {
      title: this.props.navigation.state.params.title,
      text: this.props.navigation.state.params.text,
      loading: false,
      time: this.props.navigation.state.params.time
    }
  }

  
  submit() {
    console.log('Hi')
    if (!(this.state.title !== '' && this.state.text !== ''))
      Toast.show({
        supportedOrientations: ['portrait'],
        text: `Please fill in all fields before submitting`,
        position: 'bottom',
        type: 'danger',
        duration: 1000
      })
    else {
      console.log('inside')
      this.setState({loading: true})
      saveNote(this.state.title, this.state.text, this.state.time).then(()=> {
        Toast.show({
            supportedOrientations: ['portrait'],
            text: `Your note has been registered!`,
            position: 'bottom',
            type: 'success',
            duration: 1000
        })
        this.props.back()
      }).catch(err => {
        alert(err.message)
        this.setState({loading: false})
      })
      
    }
      
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!_.isEqual(this.props.title,nextProps.title)) {
      this.setState({
        title: this.props.title
      });
    }
    if (!_.isEqual(this.props.field,nextProps.field)) {
      this.setState({
        text: this.props.field
      });
    }
  }

  render() {
    return (
      <Container>
        <Header title="Form" 
        hasLeft
        iconNameLeft="arrow-back"
        handlePressLeft={() => this.props.back()}
        />
          {/* prevent double tap */}
        <Content keyboardShouldPersistTaps="always"
        style={{backgroundColor: this.props.background}}>
          {this.state.loading ? <Spinner style={{alignSelf: 'center', marginTop: 5}}/>: <View/>}
          <View style={{height:20}} />
          <Item stackedLabel>
              <Label style={{...styles.label, color: this.props.color}}>Subject</Label>
              <Input 
              ref={c => this._subjectInput = c}
              // numberOfLines = {1}
              // style={{borderColor: this.props.color,...styles.subject}}
              onChangeText={(title) => this.setState({title: title})}
              value={this.state.title}
              />
            </Item>
            <View style={{height:20}} />
            <Item stackedLabel last style={{height: 300}}>
              <Label style={{...styles.label, color: this.props.color}}>Text</Label>
              <Input 
              ref={c => this._textInput = c}
              // autoFocus={true}
              //somehow this is not working
              multiline = {true}
              numberOfLines = {10}
              // style={{borderColor: this.props.color,...styles.textInput}}
              onChangeText={(text) => this.setState({text: text})}
              value={this.state.text}
            />
            </Item>

            <Button
              style={styles.btn}
              color={this.props.color}
              onPress={() => this.submit()}
              text="Submit"/>

        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  back: (route: string) => dispatch(back(route))
})

export default connect(null, mapDispatchToProps)(NoteForm);

