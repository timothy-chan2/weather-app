import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <section>
          <h1 className={styles.city}>
            Unknown city
          </h1>
          <p className={styles.date}>October 4, 2023</p>
        </section>
        <section className={styles.conditions}>
          <section className={styles.tempContainer}>
            <h2 className={styles.temp}>0<sup>°C</sup></h2>
            <p>Cloudy</p>
          </section>
          <Image src="" alt="Weather icon" />
        </section>
        <section className={styles.btnContainer}>
          <button className={`${styles.save} ${styles.btn}`}>Save Info</button>
          <Link href="/history">
            <button className={`${styles.history} ${styles.btn}`}>My History</button>
          </Link>
        </section>
      </main>
    </>
  );
}
