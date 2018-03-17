//@flow
'use-strict'
import { ImagePicker } from 'expo';
import React, { Component } from 'react';
import { View, Platform, FlatList} from 'react-native';
import { connect } from 'react-redux';
import { Container,  Content, Icon, Item, Text, Right, Card, CardItem, Spinner,
  Footer, FooterTab, Badge, Button, ActionSheet, Left, Body, ListItem
} from 'native-base';
import firebase from '../../model'
import { alert, Button as MyButton, Header, Image, primary, secondary} from '../common'
import { reset } from '../../actions'
import styles from './styles';
import { visionText } from '../../lib/'
import parseImageText from './parseImageText'
var _ = require('lodash/core')
import { navigate, registerNumberOfNotes } from '../../actions'
import { ColorDotsLoader } from 'react-native-indicator';

let ios = Platform.OS === 'ios'

let ActionSheetConfig = {
  buttons: ios ? [
    'Camera',
    'Photo library',
    'Cancel'
  ] : [
    {text: 'Camera', icon: 'camera-outline', color:'grey'},
    {text: 'Photo library', icon: 'photo-outline', color: 'grey'},
    {text: 'Back', icon: 'trending-down', color: 'grey'}
  ],
  CANCEL_INDEX: 2
}


type Props = {
  navigate: (routeName: string) => void,
  registerNumberOfNotes: (number: number) => void
};
type State = {
  isLoading: boolean,
  data: Array<any>
};

class Workspace extends Component {
  props: Props;
  state: State;

  constructor(props) {
    super(props)
    this.state={
      isLoading: true,
      data: []

    }
    this.notesRef = firebase.database().ref('notes');
  }

  /**
  * Listen for changes in staff lists on database
  */
  listenForNotes(noteRef: any) {
    if (noteRef) {
      noteRef.on('value', (dataSnapshot) => {
        this.setState({isLoading: true})
        var updatedNotes = {};
        let id = 0
        dataSnapshot.forEach((note) => {
          let title = note.val().title
          if (!updatedNotes.hasOwnProperty(title)) {
            updatedNotes[title] = {
              title: title,
              count: 1,
              id: id++
            }
          } else {
            updatedNotes[title] = {
              ...updatedNotes[title],
              count: updatedNotes[title].count + 1
            }
          }
        })

        var data = []
        Object.values(updatedNotes).forEach(note => {
          data.push(note)
        })
        this.props.registerNumberOfNotes(id + 1)
        this.setState({data, isLoading: false});
      });
    }
    
  }

  componentDidMount() {
    // start listening for firebase updates
    this.listenForNotes(this.notesRef)
  }

  componentWillUnmount() {
    this.listenForNotes(null)
  }
  
  
  openCamera() {
    ActionSheet.show(
    {
      options: ActionSheetConfig.buttons,
      cancelButtonIndex: ActionSheetConfig.CANCEL_INDEX,
      title: 'Please choose a method'
    }, (i) => {
          switch(i) {
            case 0: //camera
            this._openCameraUpload();
            break;

            case 1: //photo library
            this._openLibraryUpload();
            break;

            default:
            //cancel index
          }
        }

    )
  }

  async _openCameraUpload() {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      base64:true,
      exif: true
    })

    if (!result.cancelled) {
      this.setState({isLoading: true})
      this.parseImage(result.base64)

    }
    

  }

  async _openLibraryUpload() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      base64:true,
      exif: true
    })

    if (!result.cancelled) {
      this.setState({isLoading: true})
      this.parseImage(result.base64)
    }
  
  }

  parseImage(imageBase64: any) {
    visionText(imageBase64).then(text => {
        this.setState({isLoading: false})
        this.props.navigate('NoteForm', {...parseImageText(text)});
    })
  }

  openList(title: string) {
    this.props.navigate('List', {title: title});
  }

  render() {
    return (
      <Container>  
        <Header title="Workspace" hasRight iconNameRight="add" handlePressRight={() => this.openCamera()}/>
        <Content keyboardShouldPersistTaps="always">
          {this.state.isLoading ? <View style={styles.buttonView}><ColorDotsLoader 
            color1={primary.normal} 
            color2={primary.background}
            color3={secondary.normal}/></View> : 
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
      <ListItem button key={item.id} style={styles.listItem} onPress={() => this.openList(item.title)}>
        <Left>
          <Body>
            <Text style={styles.text}>{item.title}</Text>
            <Text note style={styles.text}>{item.count} {item.count === 1 ? 'item' : 'items'}</Text>
          </Body>
        </Left>
        <Right>
          <Icon style={{fontSize: 20, color: secondary.normal}}
          ios={item.count > 1 ? "ios-albums" : "ios-albums-outline"}
          android="md-albyns"/>
        </Right>
      </ListItem>
  )

}

const mapDispatchToProps = (dispatch) => ({
  navigate: (route: string, params: any) => dispatch(navigate(route, params)),
  registerNumberOfNotes: (number: number) => dispatch(registerNumberOfNotes(number))
})
export default connect(null, mapDispatchToProps)(Workspace);

