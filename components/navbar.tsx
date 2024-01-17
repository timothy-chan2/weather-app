import Link from 'next/link';

import styles from '../styles/Navbar.module.css';

const Navbar = (props) => {
  let navStyles;
  
  if (props.fontColor === 'dark purple') {
    navStyles = `${styles.navbar} ${styles.darkPurple}`;
  }
  
  return (
    <header className={navStyles}>
      <h1>{props.pageTitle}</h1>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          {props.pageTitle !== 'WeatherApp' &&
            <li><Link href="/">WeatherApp</Link></li>
          }
          {props.pageTitle !== 'Spacestagram' &&
            <li><Link href="/spacestagram">Spacestagram</Link></li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;