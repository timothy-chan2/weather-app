import type { GetServerSideProps } from 'next';
import '../types/weatherAppTypes';
import '../types/indexTypes';

import { useState, useEffect } from 'react';
import { useLocationContext } from '../context/location';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Navbar from '../components/navbar';
import LoadingDots from '../components/loadingDots';
import ApiErrorMessage from '../components/apiErrorMessage';
import WeatherPopup from '../components/weatherPopup';

import {
  getLongDate,
  getCurrentTime,
  getCurrentDateInMilliseconds,
  getUserWeatherDataWithIp,
  getUserWeatherDataWithCoord,
  saveWeather
} from '../helpers/selectors';

import styles from '../styles/Home.module.css';

export default function Home({ weatherSummary, city, region, lat, lon }) {
  const router = useRouter();
  const [hasApiError, setHasApiError] = useState(false);
  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false);
  const [weatherModalMessage, setWeatherModalMessage] = useState('Weather saved successfully!');
  const {
    userCity, setUserCity,
    userRegion, setUSerRegion,
    userLat, setUserLat,
    userLon, setUserLon
  } = useLocationContext();

  const currentLongDate = getLongDate();
  const currentTime = getCurrentTime();
  const currentDateInMilliseconds = getCurrentDateInMilliseconds();
  const roundedTemp = Math.round(weatherSummary.temp);

  const weatherData: WeatherData = {
    fullDate: currentDateInMilliseconds,
    date: currentLongDate,
    time: currentTime,
    city: userCity,
    region: userRegion,
    temp: roundedTemp,
    description: weatherSummary.description
  };

  useEffect(() => {
    if (region) {
      setUserCity(city);
      setUSerRegion(region);
      setUserLat(lat);
      setUserLon(lon);
    }
  }, [region]);

  useEffect(() => {
    if (city === 'error2') {
      setHasApiError(true);
      console.log('API error 2');
    } else if (city === 'error3') {
      setHasApiError(true);
      console.log('API error 3');
    }
  }, [city]);

  useEffect(() => {
    if (userLat) {
      getUserWeatherDataWithCoord(router, userLat, userLon);
    } else {
      getUserWeatherDataWithIp(router, setHasApiError);
    }
  }, []);

  return (
    <>
      <Head>
        <title>WeatherApp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WeatherPopup
        isOpen={isWeatherModalOpen}
        setIsOpen={setIsWeatherModalOpen}
        setModalMessage={setWeatherModalMessage}
      >
        <p>{ weatherModalMessage }</p>
      </WeatherPopup>
      <main className={styles.container}>
        <Navbar
          pageTitle='WeatherApp'
          fontColor='dark purple'
        />
        {/* Source: https://images.unsplash.com/photo-1585508889431-a1d0d9c5a324 */}
        <Image
          src='/images/mobile-bg-image-resized-compressed.jpg'
          alt='Background image: Mist in the forest'
          className={styles.backgroundImg}
          fill
          sizes='(max-width: 600px) 100vw'
        />
        {/* Source: https://images.unsplash.com/photo-1561484930-998b6a7b22e8 */}
        <Image
          src='/images/desktop-bg-image-resized-compressed.jpg'
          alt='Background image: A mountain behind a calm lake'
          className={styles.backgroundImg2}
          fill
          sizes='(min-width: 600px) 100vw, (min-width: 850px) 100vw'
        />
        <section className={styles.textContainer}>
          {hasApiError &&
            <ApiErrorMessage apiName='weather' />
          }
          {hasApiError === false &&
            <>
              <section>
                {userCity ? (
                  <h2 className={styles.city}>{ userCity }, { userRegion }</h2>
                ) : (
                  <h2 className={styles.city}>...</h2>
                )}
                <p className={styles.date}>{ currentLongDate }</p>
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
                <button
                  onClick={() => saveWeather(
                    weatherData,
                    currentDateInMilliseconds,
                    weatherModalMessage,
                    setIsWeatherModalOpen
                  )}
                  className={`${styles.save} ${styles.btn}`}
                >
                  Save Info
                </button>
                <Link href="/history">
                  <button className={`${styles.history} ${styles.btn}`}>My History</button>
                </Link>
              </section>
            </>
          }
        </section>
        
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { ip, coordLat, coordLon } = context.query;

  const placeholderWeatherData = {
    temp: 0,
    description: 'Loading...',
    icon: ''
  };

  let city = '', region = '', lat = 0, lon = 0;
  let weatherSummary = placeholderWeatherData;

  if (ip) {
    if (coordLat) {
      lat = +coordLat;
      lon = +coordLon;
    } else {
      try {
        const ipRequest = await fetch(`http://ip-api.com/json/${ip}`);
        const ipData = await ipRequest.json();
        city = ipData.city;
        region = ipData.regionName;
        lat = ipData.lat;
        lon = ipData.lon;
      } catch {
        city = 'error2';
      }
    }

    if (city !== 'error2') {
      const apiKey = process.env.WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
     
      try {
        const weatherRequest = await fetch(url);
        const weatherInfo = await weatherRequest.json();
  
        weatherSummary = {
          temp: weatherInfo.main.temp,
          description: weatherInfo.weather[0].description,
          icon: weatherInfo.weather[0].icon
        };
      } catch {
        city = 'error3';
      }
    }
  }

  const props: Props = {
    weatherSummary,
    city,
    region,
    lat,
    lon
  };

  return {
    props
  };
}
