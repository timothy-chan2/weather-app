import type { GetServerSideProps } from 'next';
import '../types/types';

import { useEffect } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Navbar from '../components/navbar';
import LoadingDots from '../components/loadingDots';

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
  const router = useRouter();
  // Get the current date
  const date = new Date();
  const milliseconds = Date.parse(date.toString());
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const time = date.toLocaleTimeString();

  // Calculate the temperature rounded to the nearest integer
  const roundedTemp = Math.round(weatherSummary.temp);
  
  useEffect(() => {
    const getUserWeatherData = async () => {
      const ipifyResponse = await fetch('https://api.ipify.org/?format=json');
      const userIp = await ipifyResponse.json();

      router.replace(`/?ip=${userIp.ip}`, '/');
    };
    
    getUserWeatherData();
  }, []);

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
        <Navbar
          pageTitle='WeatherApp'
          fontColor='dark purple'
        />
        <Image
          src='https://images.unsplash.com/photo-1585508889431-a1d0d9c5a324'
          alt='Background image: Mist in the forest'
          className={styles.backgroundImg}
          fill
          sizes='(max-width: 600px) 100vw'
        />
        <Image
          src='https://images.unsplash.com/photo-1561484930-998b6a7b22e8'
          alt='Background image: A mountain behind a calm lake'
          className={styles.backgroundImg2}
          fill
          sizes='(min-width: 600px) 100vw, (min-width: 850px) 100vw'
        />
        <section className={styles.textContainer}>
          <section>
            {city === '...' ? (
              <h2 className={styles.city}>{ city }</h2>
            ) : (
              <h2 className={styles.city}>{ city }, { region }</h2>
            )}
            <p className={styles.date}>{ month + " " + day + ", " + year }</p>
          </section>
          <section className={styles.conditions}>
            <section className={styles.tempContainer}>
              <h3 className={styles.temp}>
                { roundedTemp }<sup className={styles.celcius}>°C</sup>
              </h3>
              <p className={styles.desc}>{ weatherSummary.description }</p>
            </section>
            {weatherSummary.icon === '' ? (
              <LoadingDots dotColor='light blue' />
            ) : (
              <Image
                src={`https://openweathermap.org/img/wn/${weatherSummary.icon}@4x.png`}
                alt={`${ weatherSummary.description } icon`}
                className={styles.descImg}
                width='150'
                height='150'
                priority
              />
            )}
          </section>
          <section className={styles.btnContainer}>
            <button onClick={saveWeather} className={`${styles.save} ${styles.btn}`}>Save Info</button>
            <Link href="/history">
              <button className={`${styles.history} ${styles.btn}`}>My History</button>
            </Link>
          </section>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { ip } = context.query;

  let city: string, region: string;
  let weatherSummary: WeatherSummary;

  if (ip === undefined) {
    city='...';
    region='';

    weatherSummary = {
      temp: 0,
      description: 'Loading...',
      icon: ''
    };
  } else {
    const ipRequest = await fetch(`http://ip-api.com/json/${ip}`);
    const ipData = await ipRequest.json();
    city = ipData.city;
    region = ipData.regionName;
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},&appid=${apiKey}&units=metric`;
    const weatherRequest = await fetch(url);
    const weatherInfo = await weatherRequest.json();

    weatherSummary = {
      temp: weatherInfo.main.temp,
      description: weatherInfo.weather[0].description,
      icon: weatherInfo.weather[0].icon
    };
  }

  const props: Props = {
    weatherSummary,
    city,
    region
  };

  return {
    props
  };
}
