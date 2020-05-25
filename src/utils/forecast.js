const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4d41339d09d99d88f33b13f514f872de&query=${latitude},${longitude}`

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service', undefined)
        } else if (body.error) {
            callback('Unable to find the location', undefined)
        } else {
            console.log(body)
            callback(undefined, `The local time is ${body.location.localtime}. It's ${body.current.weather_descriptions[0]} outside.
            The temperature is ${body.current.temperature} degrees celsius, but it feels like ${body.current.feelslike} degree celsius.`)
        }
    })
}

module.exports = forecast