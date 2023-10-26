import '../types/types';
import { useState } from 'react';

const History = () => {
  const [weatherHistory, setWeatherHistory] = useState<WeatherData[]>([]);
  
  return (
    <>
      <h1>My Weather History</h1>
      <section>
        <h2>Montreal, Quebec</h2>
        <h3>October 23, 2023</h3>
        <p>11:00 PM</p>
        <p>Temperature: 30<sup>°C</sup></p>
        <p>Condition: Cloudy</p>
      </section>
    </>
  );
}

export default History;