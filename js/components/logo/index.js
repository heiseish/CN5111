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
import { reset } from '../../actions'
import styles from './styles';
import { visionLogo } from '../../lib/'
var _ = require('lodash/core')
import { navigate } from '../../actions'
import { LineDotsLoader } from 'react-native-indicator';

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


type State = {
  isLoading: boolean
}

export default class Logo extends Component {
  state: State;

  constructor(props) {
    super(props)
    this.state={
      brandLoading: false,
      loaded: false,
      brand: '',
      descriptionLoading: false

    }
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
      this.setState({brandLoading: true})
        visionLogo(result.base64).then(res => {
          if (res) {
            let brand = res.replace('"','').replace('"','');
            this.setState({loaded: true, brand: brand, brandLoading: false})
          } else {
            this.setState({loaded: true, brand: 'Not found:(', brandLoading: false})
          }

          
      })

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
      this.setState({brandLoading: true})
        visionLogo(result.base64).then(res => {
          if (res) {
            let brand = res.replace('"','').replace('"','');
            this.setState({loaded: true, brand: brand, brandLoading: false})
          } else {
            this.setState({loaded: true, brand: 'Not found:(', brandLoading: false})
          }
      })

    }
  }




  render() {
    return (
      <Container>  
        <Header title="Logo"/>
        <Content keyboardShouldPersistTaps="always">
        {/**this.state.loaded ? <View style={styles.result}><Text note>Brand</Text><Text style={styles.resultText}>{this.state.brand}</Text></View> :  null**/}
        {this.state.loaded ?
              <ListItem button style={styles.listItem}>
                  <Text note >Brand</Text>
                  <Text style={styles.resultText}>{this.state.brand}</Text>
              </ListItem> : null}
          <View style={styles.buttonView}>{this.state.brandLoading ? <LineDotsLoader color={secondary.normal}/>: 
          <Button bordered style={styles.button} onPress={() => this.openCamera()}>
            <Icon name="cloud-upload" style={styles.buttonIcon}/>
            <Text style={styles.buttonText}>Detect</Text>
        </Button>}</View>
        </Content>


      </Container>
    );
  }


}



