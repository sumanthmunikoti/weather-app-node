const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4d41339d09d99d88f33b13f514f872de&query=${latitude},${longitude}`

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service', undefined, undefined)
        } else if (body.error) {
            callback('Unable to find the location', undefined, undefined)
        } else {
            // console.log(body)
            callback(undefined, `The local time is ${body.location.localtime}. 
            The temperature is ${body.current.temperature} degrees celsius, and it feels like ${body.current.feelslike} degree celsius.`,
            body.current.weather_icons[0])
        }
    })
}

module.exports = forecast