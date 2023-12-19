import Image from 'next/image';

import styles from '../styles/Loading.module.css';

// The Loading component shows a spinning wheel while
// fetching the data from the NASA API
const Loading = () => {
  return (
    <article>
      <Image
        className={styles.loadingImage}
        src='/images/loading.png'
        alt='Loading'
        width='75'
        height='75'
      />
      <h3>Loading...</h3>
    </article>
  );
};

export default Loading;