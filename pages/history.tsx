import { useState, useEffect } from 'react';
import '../types/types';

import Head from 'next/head';
import Link from 'next/link';

import styles from '../styles/History.module.css';

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
      <Head>
        <title>Saved Weather History</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.container}>
        <h1>My Weather History</h1>
        {weatherHistory !== null ? (
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
        <Link href="/">
          <button className={`${styles.history} ${styles.btn}`}>Back</button>
        </Link>
      </main>
    </>
  );
}

export default History;