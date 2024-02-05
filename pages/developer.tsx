import projects from '../helpers/projectData';

import Head from 'next/head';
import Image from 'next/image';

import Navbar from '../components/navbar';
import Project from '../components/project';
import FloatingAstronaut from '../components/floatingAstronaut';

import styles from '../styles/Developer.module.css';

// The Developer component shows other projects I have done
// with links to my GitHub page if it is not deloyed
const Developer = () => {
  const projectCards = projects.map(project => {
    return (
      <Project
        key={project.title}
        title={project.title}
        imgUrl={project.imgUrl}
        linkUrl={project.linkUrl}
        description={project.desc}
        priority={project.priority}
        fStack={project.fStack}
        bStack={project.bStack}
      />
    );
  });
  
  return (
    <>
      <Head>
        <title>Developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.developer}>
        <Image
          className={styles.bgImage}
          src='/images/trunk-ring.jpg'
          alt=''
          width='360'
          height='740'
          sizes='(max-width: 850px) 100vw, (min-width: 850px) 85vw'
          priority={true}
        />
      
        <div id='developer-content' className={styles.developerContent}>
          <header>
            <Navbar
              pageTitle='Developer'
              fontColor='dark purple'
            />
            <h2 className={styles.developerName}>Timothy Chan</h2>
            <a href='https://linkedin.com/in/timothychan2' target='_blank' rel='noreferrer'>
              <Image
                src='/images/In-White-34.png'
                alt='LinkedIn logo'
                aria-label='LinkedIn logo'
                width='44'
                height='34'
              />
            </a>
          </header>
          <main>
            <FloatingAstronaut />
            <p className={styles.otherProjects}>My other projects:</p>
            {projectCards}
          </main>
        </div>
      </div>
    </>
  );
};

export default Developer;