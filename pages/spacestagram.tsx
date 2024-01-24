import { useState, useEffect } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import Navbar from '../components/navbar';
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
  const [posts, setPosts] = useState(apodInfo);
  const [loadingIcon, setLoadingIcon] = useState('dots');

  const images = posts.map(post => {
    return (
      <Post
        key={post.date}
        id={post.date}
        url={post.url}
        title={post.title}
        description={post.explanation}
        media={post.media_type}
      />
    );
  });

  useEffect(() => {
    const selectedDate = getShortDate(date);

    router.replace(`/spacestagram?date=${selectedDate}`, '/spacestagram');
  }, [date]);

  useEffect(() => {
    setPosts(apodInfo.reverse());
  }, [apodInfo.length]);
  
  return (
    <>
      <Head>
        <title>Spacestagram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.app}>
        <header>
          <Navbar
            pageTitle='Spacestagram'
            fontColor='dark purple'
          />
        </header>
        <main>
          <h2 className={styles.tagline}>Brought to you by NASA's Astronomy Picture of the Day (APOD) API</h2>
          {posts.length === 0 &&
            loadingIcon === 'dots' && <LoadingDots />
          }
          {posts.length === 0 &&
            loadingIcon === 'wheel' && <Loading />
          }
          {posts.length > 0 &&
            <LoadingIconPicker
              loadingIcon={loadingIcon}
              setLoadingIcon={setLoadingIcon}
            />
          }
          {posts.length > 0 &&
            <StartDatePicker
              date={date}
              setDate={setDate}
              setPosts={setPosts}
            />
          }
          {images}
          <ScrollTopBtn />
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