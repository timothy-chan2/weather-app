type WeatherSummary = {
  temp: number,
  description: string,
  icon: string
};

type Props = {
  weatherSummary: WeatherSummary,
  city: string,
  region: string,
  lat: number,
  lon: number
};