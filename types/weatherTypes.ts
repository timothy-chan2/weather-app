import { Dispatch, SetStateAction } from 'react';

type WeatherProps = {
  weatherSummary: any,
  weatherModalMessage: string,
  setIsWeatherModalOpen: Dispatch<SetStateAction<boolean>>
};

export type { WeatherProps };