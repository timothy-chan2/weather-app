import type { ReactNode } from 'react';

type City = string | undefined;
type Region = string | undefined;
type Lat = number | undefined;
type Lon = number | undefined;

type LocationState = {
  userCity: City;
  setUserCity(userCity: City): void;
  userRegion: Region;
  setUSerRegion(userRegion: Region): void;
  userLat: Lat;
  setUserLat(userLat: Lat): void;
  userLon: Lon;
  setUserLon(userLon: Lon): void;
};

type LocationProviderProps = {
  children: ReactNode;
};

export type { LocationState, LocationProviderProps };