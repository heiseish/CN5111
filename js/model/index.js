//@flow
'use-strict';
import * as firebase from 'firebase';

// Initialize Firebase
const { firebaseConfig }  = require('./credential');
console.log(firebaseConfig)

export default firebase.initializeApp(firebaseConfig);