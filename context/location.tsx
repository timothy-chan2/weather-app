import type { LocationState, LocationProviderProps } from '../types/locationTypes';

import { createContext, useContext, useState } from 'react';

const Context = createContext<LocationState | null>(null);

export function LocationProvider({ children }: LocationProviderProps) {
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