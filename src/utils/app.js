const request = require('request')

const forecast = (location, callback) => {
    const access_key = 'b955fd66072d76092b81e05536e61e07';
    const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${location}`

    request({ url, json: true }, (error, response) => {
        if(error) {
            callback('Unable to get weather service at the moment!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Please try with a different search!', undefined)
        } else {
            const currentWeather = response.body.current
            console.log(currentWeather)
            callback(undefined, currentWeather)
        }
    })
}

module.exports = forecast