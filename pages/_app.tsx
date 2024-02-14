import type { AppProps } from 'next/app';

import { LocationProvider } from '../context/location';

import '../styles/variables.css';
import '../styles/global.css';

// Override the default App component
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <LocationProvider>
      <Component {...pageProps} />
    </LocationProvider>
  );
}

export default App;