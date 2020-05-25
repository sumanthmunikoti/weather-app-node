const request = require('postman-request')

const geoCode = (location, callback) => {

    const address = encodeURIComponent(location)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic211bmlrb3RpIiwiYSI6ImNrYWlqdXdzcjAxcmYycXJ4NXd6ZjluMjEifQ.HG0kw4rsTt7s_jcrEBQPUg`
    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Could not connect to the web service', undefined)
        } else if (body.features.length === 0) {
            callback(`Please give the correct location name. This place could not be found`, undefined)
        } else {
            callback(undefined,
                {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
        }
    })
}

module.exports = geoCode

