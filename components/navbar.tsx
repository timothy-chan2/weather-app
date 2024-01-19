import { useState } from 'react';

import Link from 'next/link';

import LoadingDots from '../components/loadingDots';

import styles from '../styles/Navbar.module.css';

type Props = {
  pageTitle: string,
  fontColor: string
};

const Navbar = (props: Props) => {
  let navStyles: string;
  const [isLoading, setIsLoading] = useState(false);
  
  if (props.fontColor === 'dark purple') {
    navStyles = `${styles.navbar} ${styles.darkPurple}`;
  }
  
  const showLoading = () => {
    setIsLoading(true);
  };

  return (
    <header className={navStyles}>
      <h1>{props.pageTitle}</h1>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          {props.pageTitle !== 'WeatherApp' &&
            <li><Link href="/" onClick={showLoading}>
              WeatherApp
            </Link></li>
          }
          {props.pageTitle !== 'Spacestagram' &&
            <li><Link href="/spacestagram" onClick={showLoading}>
              Spacestagram
            </Link></li>
          }
          {isLoading && <LoadingDots />}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;