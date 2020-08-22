function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`
}

function displayTemperature(response) {

    let temperatureElement = document.querySelector("#current-temperature")
    let windSpeedElement = document.querySelector("#windSpeed")
    let humidityElement = document.querySelector("#humidity")
    let cityElement = document.querySelector("#city")
    let weatherDescriptionElement = document.querySelector("#weatherDescription")
    let currentDayTimeElement = document.querySelector("#current-day-time")
    let weatherIconElement = document.querySelector("#weather-icon")
    celciusTemperature = response.data.main.temp
    temperatureElement.innerHTML = Math.round(response.data.main.temp)
    windSpeedElement.innerHTML = Math.round(response.data.wind.speed)
    humidityElement.innerHTML = Math.round(response.data.main.humidity)
    cityElement.innerHTML = response.data.name
    weatherDescriptionElement.innerHTML = response.data.weather[0].main
    currentDayTimeElement.innerHTML = formatDate(response.data.dt * 1000)
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
}

function formatTime(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`
}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast")
    let forecast = null;

    for (let index = 0; index < 6; index++) {
        forecast = response.data.list[index]
        forecastElement.innerHTML += `<div class=col-2>
        <p class="forecast-hour">${formatTime(forecast.dt * 1000)}</p>
        <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="Forecast Icon">
            <div class="forecast-temperature">${forecast.main.temp}</div>
                </div>
                `
    }
}

function search(city) {
    let apiKey = "667b3c2d5276fd8b0274db2abae287d7";
    let urlDomain = "https://api.openweathermap.org/data/2.5/"
    let apiUrl = `${urlDomain}weather?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayTemperature)
    apiUrl = `${urlDomain}forecast?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayForecast)
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#input-city")
    search(cityInputElement.value)
}

function getForecast(latitude, longitude) {
    let apiKey = "667b3c2d5276fd8b0274db2abae287d7";
    let urlDomain = "https://api.openweathermap.org/data/2.5/"
    let apiUrl = `${urlDomain}forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`

    axios.get(apiUrl).then(displayForecast)
}

function findCity(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "667b3c2d5276fd8b0274db2abae287d7";
    let urlDomain = "https://api.openweathermap.org/data/2.5/";
    let apiUrl = `${urlDomain}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
    getForecast(lat, lon)
}

function showCurrentCityTemp(event) {
    navigator.geolocation.getCurrentPosition(findCity);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let fahrenheitTemperature = (celciusTemperature * 1.8) + 32;
    let temperatureElement = document.querySelector("#current-temperature")
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature)
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active")
}

function displayCelciusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temperature")
    temperatureElement.innerHTML = Math.round(celciusTemperature)
    fahrenheitLink.classList.remove("active");
    celciusLink.classList.add("active");

}

let form = document.querySelector("#search-form")
form.addEventListener("submit", handleSubmit)

let cityButtonElement = document.querySelector("#current-city-button")
cityButtonElement.addEventListener("click", showCurrentCityTemp)


let fahrenheitLink = document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature)
let celciusLink = document.querySelector("#celcius-link")
celciusLink.addEventListener("click", displayCelciusTemperature)


let celciusTemperature = null;

window.onload = showCurrentCityTemp
fahrenheitLink.classList.remove("active");
celciusLink.classList.add("active");
