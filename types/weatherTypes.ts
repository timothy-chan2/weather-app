import { Dispatch, SetStateAction } from 'react';

type WeatherProps = {
  weatherSummary: WeatherSummary,
  weatherModalMessage: string,
  setIsWeatherModalOpen: Dispatch<SetStateAction<boolean>>
};

type WeatherData = {
  date: string,
  time: string,
  city: string,
  region: string,
  temp: number,
  description: string
};

export type { WeatherProps, WeatherData };