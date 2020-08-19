function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current-temperature")
    temperatureElement.innerHTML = Math.round(response.data.main.temp)
    let windSpeedElement = document.querySelector("#windSpeed")
    windSpeedElement.innerHTML = Math.round(response.data.wind.speed)
    let humidityElement = document.querySelector("#humidity")
    humidityElement.innerHTML = Math.round(response.data.main.humidity)
    console.log(response.data)
    let cityElement = document.querySelector("#city")
    cityElement.innerHTML = response.data.name
    let weatherDescriptionElement = document.querySelector("#weatherDescription")
    weatherDescriptionElement.innerHTML = response.data.weather[0].main
}


let apiKey = "667b3c2d5276fd8b0274db2abae287d7";
let urlDomain = "https://api.openweathermap.org/data/2.5/"
let city = "Lisbon"
let apiUrl = `${urlDomain}weather?q=${city}&appid=${apiKey}&units=metric`

axios.get(apiUrl).then(displayTemperature)