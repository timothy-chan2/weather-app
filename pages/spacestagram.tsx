import { useState, useEffect } from 'react';

import Head from 'next/head';
import { useRouter } from "next/router";

import Post from '../components/post';
import Loading from '../components/loading';
import LoadingDots from '../components/loadingDots';
import LoadingIconPicker from '../components/loadingIconPicker';
import StartDatePicker from '../components/startDatePicker';
import ScrollTopBtn from '../components/scrollTopBtn';

import { getShortDate } from '../helpers/selectors';

import styles from '../styles/Spacestagram.module.css';

const Spacestagram = ({ apodInfo }) => {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const selectedDate = getShortDate(date);

    router.replace(`/spacestagram?date=${selectedDate}`, '/spacestagram');
    console.log(apodInfo);
  }, [date]);
  
  return (
    <>
      <Head>
        <title>Spacestagram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.app}>
        <header>
          <h2 className={styles.tagline}>Brought to you by NASA's Astronomy Picture of the Day (APOD) API</h2>
        </header>
        <main>
          
        </main>
        <footer>
          <p>Made with ❤️ by Timothy Chan in Quebec, Canada</p>
        </footer>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  let  { date } = context.query;

  if (date === undefined) {
    const todaysDate = getShortDate(new Date());
    date = todaysDate;
  }

  const apiKey = process.env.NASA_API_KEY;
  const url = `https://api.nasa.gov/planetary/apod?start_date=${date}&api_key=${apiKey}`;
  const apodData = await fetch(url);
  const apodInfo = await apodData.json();

  const props = {
    apodInfo
  };

  return {
    props
  };
}

export default Spacestagram;