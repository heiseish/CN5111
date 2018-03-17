'use-strict'
const { StyleSheet, Dimensions, Platform } = require('react-native');
import { secondary, primary } from '../common'
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default {
  listItem: {
    height:70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 5,
    marginLeft: -5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    width: deviceWidth,
    height: 20,
    marginTop: -50,
    paddingBottom: 50
  },
  btn: {
    width: 300,
    height: 50,
    borderRadius: 150,
    alignSelf:'center',
    alignItems: 'center',
    marginTop: 5
  },
};
