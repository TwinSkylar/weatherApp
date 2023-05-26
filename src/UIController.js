import Weather from "./weather.js";

let displayType = 0; // 0 for metric, 1 for imperial
const storedWeather = new Weather();

function renderLocation(locationInfo) {
  const locationDom = document.getElementById("location");
  let degrees; // Sets the text to celcius or farenheight depending on the display type
  if (displayType == 0) {
    degrees = "°C";
  } else {
    degrees = "°F";
  }

  const city = document.getElementById("location_City");
  const time = document.getElementById("location_Time");
  const region = document.getElementById("location_Region");
  const temperature = document.getElementById("location_Temperature");

  city.textContent = locationInfo.name;
  time.textContent = locationInfo.time;
  region.textContent = locationInfo.region;
  temperature.textContent = `${locationInfo.temperature[displayType]} ${degrees}`;
}

function renderWeather(weatherInfo) {
    let degrees, speed;
  if (displayType == 0) {
    degrees = "°C";
    speed = "km/h";
  } else {
    degrees = "°F";
    speed = "mp/h";
  }

  const feels = document.getElementById("weather_Feels");
  const humidity = document.getElementById("weather_humidity");
  const precip = document.getElementById("weather_precip");
  const wind = document.getElementById("weather_wind");

  feels.textContent = `${weatherInfo.feelsLike[displayType]} ${degrees}`;
  humidity.textContent = weatherInfo.humidity;
  precip.textContent = weatherInfo.precip[displayType];
  wind.textContent = `${weatherInfo.wind[displayType]} ${speed}`;
}

async function loadData(city) {
  const weatherData = await storedWeather.getWeather(city);
  renderLocation(weatherData.location);
  renderWeather(weatherData.weather);
  console.log(weatherData);
}

function unitChange(){
    (displayType === 0)? displayType =1: displayType = 0;
    renderLocation (storedWeather.getWeatherInfo().location);
    renderWeather(storedWeather.getWeatherInfo().weather);
}

function init(){

    // Handles the event when someone submits a new city name
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit' , (event)=>{
        event.preventDefault();
        loadData(searchForm.citySearch.value);
    });

    // Handles the event when someone switches the unit type to display
    const toggle = document.getElementById('unitToggle');
    toggle.addEventListener('click',unitChange);
}

init();
//loadData();
