export default class Weather {

  weatherInfo;

  async getWeather(search) {
    const key = "730a2999fe4a45b6b04191509232505";
    const weatherData = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${key}&q=${search}&aqi=no`,
      { mode: "cors" }
    );
    const weatherResponse = await weatherData.json();
    return this.loadData(weatherResponse);
  }

  loadData(weatherData) {
    const location = {
      time: weatherData.location.localtime,
      name: weatherData.location.name,
      region: weatherData.location.region,
      country: weatherData.location.country,
      temperature: [weatherData.current.temp_c, weatherData.current.temp_f],
      icon: [
        weatherData.current.condition.text,
        weatherData.current.condition.icon,
      ],
    };

    const weather = {
      feelsLike: [
        weatherData.current.feelslike_c,
        weatherData.current.feelslike_f,
      ],
      humidity: weatherData.current.humidity,
      precip: [weatherData.current.precip_in, weatherData.current.precip_mm],
      wind: [weatherData.current.wind_kph, weatherData.current.wind_mph],
    };

    this.weatherInfo = {
      location: location,
      weather: weather,
    };
    return this.weatherInfo;
  }

  getWeatherInfo(){
    return this.weatherInfo;
  }
}
