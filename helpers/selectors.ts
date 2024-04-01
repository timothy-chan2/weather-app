import { NextRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import type { WeatherData } from '../types/weatherTypes';

const getLongDate = (dateObject = new Date()) => {
  const day = dateObject.getDate();
  const monthName = dateObject.toLocaleString('default', { month: 'long' });
  const year = dateObject.getFullYear();
  const longDate = `${monthName} ${day}, ${year}`;

  return longDate;
};

const getShortDate = (dateObject = new Date()) => {
  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const year = dateObject.getFullYear();
  const monthNumber = padTo2Digits(dateObject.getMonth() + 1);
  const day = padTo2Digits(dateObject.getDate());
  const shortDate = `${year}-${monthNumber}-${day}`;

  return shortDate;
};

const getCurrentTime = () => {
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString();
 
  return currentTime;
};

const getUserWeatherDataWithIp = async (router: NextRouter, setHasApiError: Dispatch<SetStateAction<boolean>>) => {
  try {
    const ipifyResponse = await fetch('https://api.ipify.org/?format=json');
    const userIp = await ipifyResponse.json();
    if (userIp.ip) {
      router.replace(`/?ip=${userIp.ip}`, '/');
    } else {
      getUserWeatherDataWithIp(router, setHasApiError);
    }
  } catch {
    setHasApiError(true);
    console.log('API error 1');
  }
};

const getUserWeatherDataWithCoord = (router: NextRouter, userLat: number, userLon: number) => {
  router.replace(`/?ip=yes&coordLat=${userLat}&coordLon=${userLon}`, '/');
};

const saveWeather = (
  weatherData: WeatherData,
  weatherModalMessage: string,
  setIsWeatherModalOpen: Dispatch<SetStateAction<boolean>>
) => {
  const previousDataString = localStorage.getItem('weatherHistory');
  let previousData = JSON.parse(previousDataString);

  if (previousData === null) {
    previousData = [];
  }

  if (weatherModalMessage === 'Weather saved successfully!') {
    previousData.push(weatherData);
    localStorage.setItem('weatherHistory', JSON.stringify(previousData));
  }

  setIsWeatherModalOpen(true);
};

export {
  getLongDate,
  getShortDate,
  getCurrentTime,
  getUserWeatherDataWithIp,
  getUserWeatherDataWithCoord,
  saveWeather
};