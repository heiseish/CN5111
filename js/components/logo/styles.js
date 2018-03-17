'use-strict'
const { StyleSheet, Dimensions, Platform } = require('react-native');
import { secondary, primary } from '../common'
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default {
  buttonView: {
    marginTop: 50,
    width: deviceWidth,
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  button: {
    borderColor: secondary.normal,
    width: 100,
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  buttonIcon: {
    fontSize: 40,
    color: secondary.normal
  },
  buttonText: {
    color: secondary.normal
  },
  result: {
    width: deviceWidth,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    flexDirection: 'column'
  },
  resultText: {
    color: primary.normal,
    fontSize: 40,
    marginTop: 40,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  listItem: {
    height:150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 5,
    marginLeft: -5,
    flexDirection: 'column'
  },
};
