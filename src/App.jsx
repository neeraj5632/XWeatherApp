import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "879fa0a8db0b481f91d102735250111"; // Replace with actual WeatherAPI key

  const handleSearch = async () => {
    if (!city.trim()) return;

    setWeatherData(null);
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      const data = await res.json();

      if (data.error) {
        alert("Failed to fetch weather data");
      } else {
        setWeatherData({
          temperature: data.current.temp_c,
          humidity: data.current.humidity,
          condition: data.current.condition.text,
          windSpeed: data.current.wind_kph,
        });
      }
    } catch (err) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading data...</p>}

      <div className="weather-cards">
        {weatherData && (
          <>
            <div className="weather-card">
              <h3>Temperature</h3>
              <p>{weatherData.temperature} °C</p>
            </div>
            <div className="weather-card">
              <h3>Humidity</h3>
              <p>{weatherData.humidity} %</p>
            </div>
            <div className="weather-card">
              <h3>Condition</h3>
              <p>{weatherData.condition}</p>
            </div>
            <div className="weather-card">
              <h3>Wind Speed</h3>
              <p>{weatherData.windSpeed} km/h</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
