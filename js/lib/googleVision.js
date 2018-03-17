//@flow
'use-strict'
process.env.GOOGLE_APPLICATION_CREDENTIALS="./js/lib/MVPapp-bc4c478a8b84.json"
const _ = require('lodash/core')
// Imports the Google Cloud client library
const vision = require('react-cloud-vision-api')
vision.init({auth: 'AIzaSyCyXWuLnv_GmGAL3szA1h1n1DPBWVSBego'})

export const visionText = (image: string) => {
	return new Promise((resolve, reject) => {
		const req = new vision.Request({
		  image: new vision.Image({
		    base64: image,
		  }),
		  features: [
		    new vision.Feature('TEXT_DETECTION', 4)
		  ]
		})

		vision.annotate(req).then((res) => {
		  // handling response
		  if (res.responses[0])
		  	resolve(JSON.stringify(res.responses[0].textAnnotations[0].description))
		}, (e) => {
		  reject(e)
		})
	})
}

export const visionLogo = (image: string) => {
	return new Promise((resolve, reject) => {
		const req = new vision.Request({
		  image: new vision.Image({
		    base64: image,
		  }),
		  features: [
		  	new vision.Feature('LOGO_DETECTION', 10)
		  ]
		})

		vision.annotate(req).then((res) => {
		  // handling response
		  if (!_.isEmpty(res.responses[0])) {
		  	console.log(res.responses[0].logoAnnotations[0])
		  	resolve(JSON.stringify(res.responses[0].logoAnnotations[0].description))
		  } else resolve(null)
		}, (e) => {
		  reject(e)
		})
	})
}