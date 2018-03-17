'use-strict'
const { StyleSheet, Dimensions, Platform } = require('react-native');

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
    borderRadius: 5,
    marginLeft: -10
  },
  container: {
    flex: 1
  },
  text : {
    marginLeft: 30
  },
  subject: {
    height: 40,
    // borderColor: 'green',
    borderWidth: 1,
    marginTop: 20
  },
  textInput: {
    height: 300,
    // borderColor: 'green',
    borderWidth: 1,
    marginTop: 20
  },
  btn: {
    width: 300,
    height: 50,
    borderRadius: 150,
    alignSelf:'center',
    alignItems: 'center',
    marginTop: 5
  },
  label: {
    fontSize: 15, 
    fontWeight: 'bold'
  }
};
