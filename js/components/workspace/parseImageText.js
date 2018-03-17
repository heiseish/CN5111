// @flow
'use-strict';
const moment = require('moment')

export default (text: string) => {
	text = text.substring(1, text.length - 1).toLowerCase()
          .replace(/\\n/g,',')
          .replace(/\n/g,',')
	let firstBr = text.indexOf(',')
	let title = text.substring(0, firstBr)
	let textBody = text.substring(firstBr+ 5).replace(',', '            ')
	return {
		title,
		text: textBody,
		time: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
	}
}
