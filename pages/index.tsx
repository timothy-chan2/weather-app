import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/Home.module.css';

type WeatherSummary = {
  temp: number,
  description: string,
  icon: string
}

type Props = {
  weatherSummary: WeatherSummary,
  city: string,
  region: string
}

export default function Home({ weatherSummary, city, region }) {
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
          <p className={styles.date}>October 4, 2023</p>
        </section>
        <section className={styles.conditions}>
          <section className={styles.tempContainer}>
            <h2 className={styles.temp}>{ Math.round(weatherSummary.temp) }<sup className={styles.celcius}>°C</sup></h2>
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

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},&appid=${process.env.WEATHER_API_KEY}&units=metric`;
  const weatherRequest = await fetch(url);
  const weatherInfo = await weatherRequest.json();

  const weatherSummary: WeatherSummary = {
    temp: weatherInfo.main.temp,
    description: weatherInfo.weather[0].description,
    icon: weatherInfo.weather[0].icon
  }

  // console.log(weatherSummary);

  const props: Props = {
    weatherSummary,
    city,
    region
  }

  return {
    props
  };
}
