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
  } else if (props.fontColor === 'dark purple rel') {
    navStyles = `${styles.navbar} ${styles.navbarRel} ${styles.darkPurple}`;
  }
  
  const showLoading = () => {
    setIsLoading(true);
  };

  /*To make the menu disappear when scrolling down*/
  let lastScrollTop = 0;

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {  
      let st = window.scrollY || document.documentElement.scrollTop;  
      if (st > lastScrollTop){
        document.getElementById('nav-bar').style.top = '-100%';
      } else {
        document.getElementById('nav-bar').style.top = '0';
      }
      lastScrollTop = st;
    });
  }

  return (
    <header id='nav-bar' className={navStyles}>
      <h1 className={styles.pageTitle}>{props.pageTitle}</h1>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          {props.pageTitle !== 'WeatherApp' &&
            <li className={styles.menuItem}>
              <Link href="/" onClick={showLoading}>
                WeatherApp
              </Link>
            </li>
          }
          {props.pageTitle !== 'Spacestagram' &&
            <li className={styles.menuItem}>
              <Link href="/spacestagram" onClick={showLoading}>
                Spacestagram
              </Link>
            </li>
          }
          {isLoading && <LoadingDots />}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;