//@flow
'use-strict';
const navigation = require('./navigation');
const notes = require('./notes')
module.exports =  {
	...navigation,
	...notes
}