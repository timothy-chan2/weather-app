import '../types/weatherAppTypes';
import type { WeatherData } from '../types/weatherTypes';
import { useState, useEffect } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import Navbar from '../components/navbar';

import styles from '../styles/History.module.css';

const History = () => {
  const [weatherHistory, setWeatherHistory] = useState<WeatherData[]>([]);
  let savedWeatherHistory: JSX.Element[];
  
  if (weatherHistory.length > 0) {
    savedWeatherHistory = weatherHistory.map((weather, index) => {
      return (
        <section key={index} className={styles.log}>
          <h3 className={styles.location}>{weather.city}, {weather.region}</h3>
          <h4 className={styles.date}>{weather.date}</h4>
          <p>{weather.time}</p>
          <p>Temperature: {weather.temp}<sup>°C</sup></p>
          <p className={styles.desc}>Condition: {weather.description}</p>
        </section>
      );
    });
  }

  useEffect(() => {
    const previousHistoryString = localStorage.getItem("weatherHistory");
    let previousHistory = JSON.parse(previousHistoryString);

    if (previousHistory !== undefined && previousHistory !== null) {
      setWeatherHistory(previousHistory.reverse());
    }
  }, []);

  return (
    <>
      <Head>
        <title>Saved Weather History</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={styles.container}>
        <Navbar
          pageTitle='WeatherApp'
          fontColor='dark purple'
        />
        <h2 className={styles.subtitle}>My Weather History</h2>
        {weatherHistory.length > 0 ? (
          savedWeatherHistory
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