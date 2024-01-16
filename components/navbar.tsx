import Link from 'next/link';

import styles from '../styles/Navbar.module.css';

const Navbar = (props) => {
  return (
    <header className={styles.navbar}>
      <h1>{props.title}</h1>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          <li><Link href="/spacestagram">Spacestagram</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;