import type { AppProps } from 'next/app';

import '../styles/variables.css';
import '../styles/global.css';

// The following lines of code is used to override the default App component
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Component {...pageProps} />
  );
}

export default App;