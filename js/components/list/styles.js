'use-strict'
const { StyleSheet, Dimensions, Platform } = require('react-native');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default {
  listItem: {
    height:150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginBottom: 5,
    borderRadius: 5,
    marginLeft: -10
  },
  title: {
    width: deviceWidth,
    height: 20,
    marginTop: -50,
    paddingBottom: 50
  }
};
