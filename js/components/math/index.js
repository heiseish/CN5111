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
import { visionText } from '../../lib/'
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
};

class Math extends Component {
  state: State;
  option: any;
  solver: any;

  constructor() {
    super()
    this.state={
      resultLoading: false,
      loaded: false,
      result: [],
      descriptionLoading: false,

    }
    this.option = {
      allowsEditing: true,
      quality: 1,
      base64:true,
      exif: true
    }
    
  }

  // componentDidMount() {
  //   console.log('hi')
  //   let model 
  //   = "max: 1200 table 1600 dresser<br>30 table 20 dresser <= 300<br>5 table 10 dresser <= 110<br>30 table 50 dresser <= 400<br>int table<br>int dresser"

  //   axios.post('https://hacknroll18.herokuapp.com/math', {
  //     model: model
  //   })
  //   .then(response => {
  //     console.log(response.data)
  //     this.setState({result: Object.entries(response.data), resultLoading: false, loaded: true})
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

    
  // }

  
  
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
    let result = await ImagePicker.launchCameraAsync(this.option)

    if (!result.cancelled) {
      this.setState({resultLoading: true})
        visionText(result.base64).then(res => {
          this.parseAndSolve(res)
      })

    }

  }

  async _openLibraryUpload() {
    let result = await ImagePicker.launchImageLibraryAsync(this.option)

    if (!result.cancelled) {
      this.setState({resultLoading: true})
        visionText(result.base64).then(res => {
          this.parseAndSolve(res)
      })

    }
  }

  parseAndSolve(raw: string) {
    let trimedText = raw.substring(1, raw.length - 1).toLowerCase()
          .replace(/\\n/g,',')
          .replace(/\n/g,',').split(',')
    this.props.navigate('ParamsList', {text: trimedText})
  }




  render() {
    return (
      <Container>  
        <Header title="MathSolver"/>
        <Content keyboardShouldPersistTaps="always">
          <View style={styles.buttonView}>{this.state.resultLoading ? <LineDotsLoader color={secondary.normal}/>: 
          <Button bordered style={styles.button} onPress={() => this.openCamera()}>
            <Icon name="cloud-upload" style={styles.buttonIcon}/>
            <Text style={styles.buttonText}>Solve MILP</Text>
        </Button>}</View>
        </Content>


      </Container>
    );
  }


}

const mapDispatchToProps = (dispatch) => ({
  navigate: (route: string, params: any) => dispatch(navigate(route, params))
})
export default connect(null, mapDispatchToProps)(Math);

