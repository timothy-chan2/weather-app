import type { ReactNode } from 'react';

import { createContext, useContext, useState } from 'react';

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

type Props = {
  children: ReactNode;
};

const Context = createContext<LocationState | null>(null);

export function LocationProvider({ children }: Props) {
  const [userCity, setUserCity] = useState(undefined);
  const [userRegion, setUSerRegion] = useState(undefined);
  const [userLat, setUserLat] = useState(undefined);
  const [userLon, setUserLon] = useState(undefined);
  
  const value = {
    userCity,
    setUserCity,
    userRegion,
    setUSerRegion,
    userLat,
    setUserLat,
    userLon,
    setUserLon
  };

  return (
    <Context.Provider value={value}>{children}</Context.Provider>
  );
}

export function useLocationContext() {
  return useContext(Context);
}