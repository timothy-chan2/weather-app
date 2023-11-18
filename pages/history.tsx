import '../types/types';
import { useState, useEffect } from 'react';

const History = () => {
  const [weatherHistory, setWeatherHistory] = useState<WeatherData[]>([]);

  useEffect(() => {
    const previousHistoryString = localStorage.getItem("weatherHistory");
    let previousHistory = JSON.parse(previousHistoryString);

    if (previousHistory !== undefined) {
      setWeatherHistory(previousHistory);
    }
  }, []);

  return (
    <>
      <h1>My Weather History</h1>
      {weatherHistory.length > 0 ? (
        weatherHistory.map((weather, index) => {
          return (
            <section key={index}>
              <h2>{weather.city}, {weather.region}</h2>
              <h3>{weather.date}</h3>
              <p>{weather.time}</p>
              <p>Temperature: {weather.temp}<sup>°C</sup></p>
              <p>Condition: {weather.description}</p>
            </section>
          );
        })
      ) : (
        <p>No saved weather data</p>
      )}
    </>
  );
}

export default History;