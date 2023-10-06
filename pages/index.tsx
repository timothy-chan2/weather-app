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
        <section>
          <button>Save Info</button>
          <Link href="/history">
            <button>My History</button>
          </Link>
        </section>
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}
