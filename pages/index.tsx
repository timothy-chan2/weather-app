import type { GetServerSideProps } from 'next';
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
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const time = date.toLocaleTimeString();

  // Calculate the temperature rounded to the nearest integer
  const roundedTemp = Math.round(weatherSummary.temp);
  
  const saveWeather = () => {
    const weatherData = {
      date: `${ month + " " + day + ", " + year }`,
      time: time,
      city: city,
      temp: roundedTemp,
      description: weatherSummary.description
    };

    const previousDataString = localStorage.getItem("weatherHistory");
    let previousData = JSON.parse(previousDataString);

    if (previousData === null) {
      previousData = [];
    }

    previousData.push(weatherData);
    localStorage.setItem("weatherHistory", JSON.stringify(previousData));
    alert("Weather saved successfully!");
  };

  return (
    <>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <section>
          <h1 className={styles.city}>
            { city }, { region }
          </h1>
          <p className={styles.date}>{ month + " " + day + ", " + year }</p>
        </section>
        <section className={styles.conditions}>
          <section className={styles.tempContainer}>
            <h2 className={styles.temp}>
              { roundedTemp }<sup className={styles.celcius}>°C</sup>
            </h2>
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
          <button className={`${styles.save} ${styles.btn}`}>Save Info</button>
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
