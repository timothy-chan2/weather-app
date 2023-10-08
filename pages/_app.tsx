import type { AppProps } from 'next/app'

import '../styles/global.css'

// The following lines of code is used to override the default App component
// Added a custom layout that includes a footer on all pages
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Component {...pageProps} />
  )
}

export default App