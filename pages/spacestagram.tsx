import Head from 'next/head';

const Spacestagram = ({ apodInfo }) => {
  console.log(apodInfo);
  
  return (
    <>
      <Head>
        <title>Spacestagram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h2>Brought to you by NASA's Astronomy Picture of the Day (APOD) API</h2>
      </header>
      <main>
        
      </main>
      <footer>
        <p>Made with ❤️ by Timothy Chan in Quebec, Canada</p>
      </footer>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const apiKey = process.env.NASA_API_KEY;
  const url = `https://api.nasa.gov/planetary/apod?start_date=2023-12-14&api_key=${apiKey}`;
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