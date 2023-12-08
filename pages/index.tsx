import type { GetServerSideProps } from 'next';
import '../types/types';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/Home.module.css';

type WeatherSummary = {
  temp: number,
  description: string,
  icon: string
};

type Props = {
  weatherSummary: WeatherSummary,
  city: string,
  region: string
};

export default function Home({ weatherSummary, city, region }) {
  // Get the current date
  const date = new Date();
  const milliseconds = Date.parse(date.toString());
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const time = date.toLocaleTimeString();

  // Calculate the temperature rounded to the nearest integer
  const roundedTemp = Math.round(weatherSummary.temp);
  
  const saveWeather = () => {
    const weatherData: WeatherData = {
      fullDate: milliseconds,
      date: `${ month + " " + day + ", " + year }`,
      time: time,
      city: city,
      region: region,
      temp: roundedTemp,
      description: weatherSummary.description
    };

    const previousDataString = localStorage.getItem("weatherHistory");
    let previousData = JSON.parse(previousDataString);
    let isDuplicate = false;

    if (previousData === null) {
      previousData = [];
    }

    if (previousData.length > 0) {
      const lastWeatherData = previousData[previousData.length - 1];
      
      if (lastWeatherData.fullDate === milliseconds) {
        isDuplicate = true;
        alert("Weather data is already saved.");
      }
    }
    
    if (isDuplicate === false) {
      previousData.push(weatherData);
      localStorage.setItem("weatherHistory", JSON.stringify(previousData));
      alert("Weather saved successfully!");
    }
  };

  return (
    <>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.navbar}>
          <h1>WeatherApp</h1>
          <nav className={styles.nav}>
            <ul className={styles.menu}>
              <li><Link href="/spacestagram">Spacestagram</Link></li>
            </ul>
          </nav>
        </header>
        <section>
          <h2 className={styles.city}>
            { city }, { region }
          </h2>
          <p className={styles.date}>{ month + " " + day + ", " + year }</p>
        </section>
        <section className={styles.conditions}>
          <section className={styles.tempContainer}>
            <h3 className={styles.temp}>
              { roundedTemp }<sup className={styles.celcius}>°C</sup>
            </h3>
            <p className={styles.desc}>{ weatherSummary.description }</p>
          </section>
          <Image
            src={`http://openweathermap.org/img/wn/${weatherSummary.icon}@4x.png`}
            alt={`${ weatherSummary.description } icon`}
            width="150"
            height="150"
          />
        </section>
        <section className={styles.btnContainer}>
          <button onClick={saveWeather} className={`${styles.save} ${styles.btn}`}>Save Info</button>
          <Link href="/history">
            <button className={`${styles.history} ${styles.btn}`}>My History</button>
          </Link>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const ipRequest = await fetch(`http://ip-api.com/json/`);
  const ipData = await ipRequest.json();
  const city = ipData.city;
  const region = ipData.regionName;

  const apiKey = process.env.WEATHER_API_KEY;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},&appid=${apiKey}&units=metric`;
  const weatherRequest = await fetch(url);
  const weatherInfo = await weatherRequest.json();

  const weatherSummary: WeatherSummary = {
    temp: weatherInfo.main.temp,
    description: weatherInfo.weather[0].description,
    icon: weatherInfo.weather[0].icon
  };

  const props: Props = {
    weatherSummary,
    city,
    region
  };

  return {
    props
  };
}
