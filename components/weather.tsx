import type { WeatherProps, WeatherData } from '../types/weatherTypes';
import { useLocationContext } from '../context/location';

import Link from 'next/link';
import Image from 'next/image';

import LoadingDots from '../components/loadingDots';

import {
  getLongDate,
  getCurrentTime,
  saveWeather
} from '../helpers/selectors';

import styles from '../styles/Weather.module.css';

const Weather = (props: WeatherProps) => {
  const {
    userCity, userRegion
  } = useLocationContext();
  
  const currentLongDate = getLongDate();
  const currentTime = getCurrentTime();
  const roundedTemp = Math.round(props.weatherSummary.temp);

  const weatherData: WeatherData = {
    date: currentLongDate,
    time: currentTime,
    city: userCity,
    region: userRegion,
    temp: roundedTemp,
    description: props.weatherSummary.description
  };
  
  return (
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
          <p className={styles.desc}>{ props.weatherSummary.description }</p>
        </section>
        {props.weatherSummary.icon === '' ? (
          <LoadingDots dotColor='light blue' />
        ) : (
          <Image
            src={`https://openweathermap.org/img/wn/${props.weatherSummary.icon}@4x.png`}
            alt={`${ props.weatherSummary.description } icon`}
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
            props.weatherModalMessage,
            props.setIsWeatherModalOpen
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
  );
};

export default Weather;