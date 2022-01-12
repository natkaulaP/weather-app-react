import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";
import FormattedDate from "./FormattedDate"
export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
      city: response.data.name,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    searchCity();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function searchCity() {
    const apiKey = "8fc44c5f5ff712285df808b01c3aa136";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  if (weatherData.ready) {
    return (
      <div className="card">
        <form className="search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="City name"
            autocomplete="off"
            autoFocus="on"
            className="search-input"
            onChange={handleCityChange}
          />
          <button className="submit-button">Search</button>
        </form>

        <div className="weather" class="col-9">
          <h2 className="city">{weatherData.city}</h2>
          <h3 className="date-and-time"><FormattedDate/></h3>
          <div className="clearfix weather-temperature">
            <img
              src="https://openweathermap.org/img/wn/10d@2x.png"
              alt="weather-icon"
              className="w-icon float-left"
            />
            <div className="float-left">
              <h1 className="temp">{Math.round(weatherData.temperature)}</h1>
              <span className="units">°C</span>
            </div>
          </div>
          <div className="col-3"></div>
        </div>

        <div className="description text-capitalize">{weatherData.description}</div>
        <div className="pressure">Pressure: {weatherData.pressure} mb</div>
        <div className="humidity">Humidity: {weatherData.humidity}%</div>
        <div className="wind">Wind speed: {Math.round(weatherData.wind)} km/h</div>

        <div className="weather-forecast"></div>
      </div>
    );
  } else {
    searchCity();
    return "Loading...";
  }
}
