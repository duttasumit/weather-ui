console.log('Client side javascript file is loaded!')

const form = document.querySelector('form')
const search = document.querySelector('input')
const weather_icon = document.querySelector('#weather_icon')
const locationMessage = document.querySelector('#location')
const temperature = document.querySelector('#temperature')
const feelslike = document.querySelector('#feelslike')
const precipitation = document.querySelector('#precipitation')
const humidity = document.querySelector('#humidity')
const wind = document.querySelector('#wind')
const uv_index = document.querySelector('#uv_index')
const cloudcover = document.querySelector('#cloud_cover')
const visibility = document.querySelector('#visibility')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const address = search.value
    locationMessage.textContent = "Loading...."
    weather_icon.innerHTML = ""
    temperature.innerHTML = ""
    feelslike.innerHTML = ""
    precipitation.innerHTML = ""
    humidity.innerHTML = ""
    wind.innerHTML = ""
    uv_index.innerHTML = ""
    cloudcover.innerHTML = ""
    visibility.innerHTML = ""

    fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if(data.error) {
                locationMessage.textContent = data.error
            } else {
                locationMessage.textContent = `Location: ${data.location}`
                weather_icon.innerHTML = `<img class="portrait" src="${data.data.weather_icons[0]}">`
                temperature.innerHTML = `Temperature: <strong>${data.data.temperature} Degrees Celsius</strong>`
                feelslike.innerHTML = `Feels like: <strong>${data.data.feelslike} Degrees Celcius</strong>`
                precipitation.innerHTML = `Precipitation: <strong>${data.data.precip}%</strong>`
                humidity.innerHTML = `Humidity: <strong>${data.data.humidity}%</strong>`
                wind.innerHTML = `Wind: <strong>${data.data.wind_speed} km/h</strong>`
                uv_index.innerHTML = `UV Index: <strong>${data.data.uv_index}</strong>`
                cloudcover.innerHTML = `Cloud cover: <strong>${data.data.cloudcover}</strong>`
                visibility.innerHTML = `Visibility: <strong>${data.data.visibility}</strong>`
            }
        })
    })
})