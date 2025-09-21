import React, { useState } from "react";

function Weather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      const apiKey = "692ac2b9f8e7db862cdbe52fca8f201e"; 
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const result = await response.json();
      setData(result);
      setError("");
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌤 Weather App</h1>

      <div style={styles.inputBox}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.input}
        />
        <button onClick={fetchWeather} style={styles.button}>
          Get Weather
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div style={styles.card}>
          <h2>{data.name}</h2>
          <p style={styles.temp}>🌡 {data.main.temp} °C</p>
          <p style={styles.condition}>☁ {data.weather[0].description}</p>
          <p>💧 Humidity: {data.main.humidity}%</p>
          <p>🌬 Wind: {data.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f1f5f9", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    fontFamily: "Poppins, sans-serif",
  },
  title: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "20px",
  },
  inputBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    width: "200px",
    outline: "none",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  card: {
    background: "white",
    borderRadius: "15px",
    padding: "25px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    textAlign: "center",
    width: "300px",
    marginTop: "20px",
  },
  temp: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#0077b6",
  },
  condition: {
    textTransform: "capitalize",
    fontWeight: "500",
    margin: "10px 0",
  },
};

export default Weather;
