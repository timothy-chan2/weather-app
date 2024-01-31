import projects from '../helpers/projectData';

import Head from 'next/head';

import Navbar from '../components/navbar';

import styles from '../styles/Developer.module.css';

// The Developer component shows other projects I have done
// with links to my GitHub page if it is not deloyed
const Developer = () => {
  return (
    <>
      <Head>
        <title>Developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.developer}>
        <img
          className={styles.bgImage}
          src='images/trunk-ring.jpg'
          alt=''
        />
      
        <div className={styles.developerContent}>
          <header>
            <Navbar
              pageTitle='Developer'
              fontColor='dark purple'
            />
            <h2 className={styles.developerName}>Timothy Chan</h2>
            <a href='https://linkedin.com/in/timothychan2' target='_blank' rel='noreferrer'>
              <img
                src='images/In-White-34.png'
                aria-label='LinkedIn logo'
              />
            </a>
          </header>
          <main>

            <p className={styles.otherProjects}>My other projects:</p>

          </main>
        </div>
      </div>
    </>
  );
};

export default Developer;