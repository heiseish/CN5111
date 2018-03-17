// @flow
'use-strict';
const moment = require('moment')

export default (text: string) => {
	text = text.replace('"','').trim().replace('\\n','<br>').replace('\\n\"','<br>')
	let firstBr = text.indexOf('<br>')
	let title = text.substring(0, firstBr)
	let textBody = text.substring(firstBr+ 5).replace('<br>', '            ')
	return {
		title,
		text: textBody,
		time: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
	}
}
