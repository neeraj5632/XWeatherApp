import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "YOUR_API_KEY"; // Replace with your actual WeatherAPI key

  const handleSearch = async () => {
    if (!city.trim()) return;
    setWeatherData(null);
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();

      if (data && data.current) {
        setWeatherData({
          temp: data.current.temp_c,
          humidity: data.current.humidity,
          condition: data.current.condition.text,
          wind: data.current.wind_kph,
        });
      } else {
        alert("Failed to fetch weather data");
      }
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h2>Weather App</h2>
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading data...</p>}

      <div className="weather-cards">
        {weatherData && (
          <>
            <div className="weather-card">
              <h3>Temperature</h3>
              <p>{weatherData.temp} °C</p>
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
              <p>{weatherData.wind} km/h</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
