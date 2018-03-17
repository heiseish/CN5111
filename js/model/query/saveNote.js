//@flow
'use-strict';
import firebase from '../';
import { getTimeUnix } from '../../lib/timeUtil'
const noteRef = firebase.database().ref('notes/')
export const saveNote  = (title: string, text: string, time: string) => {
	return new Promise((response,reject) => {
		if (!title || !text)
			reject({message: 'Please fill in all the blanks!'})
		else {
			noteRef.push({title, text, time}).then(() => response())		
		}
		
	})
}
