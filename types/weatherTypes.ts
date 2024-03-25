import { Dispatch, SetStateAction } from 'react';

type WeatherSummary = {
  temp: number,
  description: string,
  icon: string
};

type WeatherProps = {
  weatherSummary: WeatherSummary,
  weatherModalMessage: string,
  setIsWeatherModalOpen: Dispatch<SetStateAction<boolean>>
};

export type { WeatherProps };