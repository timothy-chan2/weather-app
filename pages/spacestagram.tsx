import Head from 'next/head';

const Spacestagram = () => {
  return (
    <>
      <Head>
        <title>Spacestagram</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        
      </main>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const apiKey = process.env.NASA_API_KEY;
  const url = `https://api.nasa.gov/planetary/apod?start_date=${startDate}&api_key=${apiKey}`;
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