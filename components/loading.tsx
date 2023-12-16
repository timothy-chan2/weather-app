import Image from 'next/image';

// The Loading component shows a spinning wheel while
// fetching the data from the NASA API
const Loading = () => {
  return (
    <article>
      <Image
        className='loading-image'
        src='images/loading.png'
        alt='Loading'
      />
      <h3>Loading...</h3>
    </article>
  );
};

export default Loading;