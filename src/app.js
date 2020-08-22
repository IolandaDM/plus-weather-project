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
    console.log(response.data)
    let temperatureElement = document.querySelector("#current-temperature")
    temperatureElement.innerHTML = Math.round(response.data.main.temp)
    let windSpeedElement = document.querySelector("#windSpeed")
    windSpeedElement.innerHTML = Math.round(response.data.wind.speed)
    let humidityElement = document.querySelector("#humidity")
    humidityElement.innerHTML = Math.round(response.data.main.humidity)
    let cityElement = document.querySelector("#city")
    cityElement.innerHTML = response.data.name
    let weatherDescriptionElement = document.querySelector("#weatherDescription")
    weatherDescriptionElement.innerHTML = response.data.weather[0].main
    let currentDayTimeElement = document.querySelector("#current-day-time")
    currentDayTimeElement.innerHTML = formatDate(response.data.dt * 1000)
    let weatherIconElement = document.querySelector("#weather-icon")
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
}

function search(city) {
    let apiKey = "667b3c2d5276fd8b0274db2abae287d7";
    let urlDomain = "https://api.openweathermap.org/data/2.5/"
    let apiUrl = `${urlDomain}weather?q=${city}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayTemperature)
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#input-city")
    search(cityInputElement.value)
}

function findCity(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "667b3c2d5276fd8b0274db2abae287d7";
    let urlDomain = "https://api.openweathermap.org/data/2.5/";
    let apiUrl = `${urlDomain}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}
function showCurrentCityTemp(event) {
    navigator.geolocation.getCurrentPosition(findCity);
}

let form = document.querySelector("#search-form")
form.addEventListener("submit", handleSubmit)

let cityButtonElement = document.querySelector("#current-city-button")
cityButtonElement.addEventListener("click", showCurrentCityTemp)

window.onload = showCurrentCityTemp