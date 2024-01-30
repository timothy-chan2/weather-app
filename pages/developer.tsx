import projects from '../helpers/projectData';

import Head from 'next/head';

import Navbar from '../components/navbar';

// The Developer component shows other projects I have done
// with links to my GitHub page if it is not deloyed
const Developer = () => {
  return (
    <>
      <Head>
        <title>Developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default Developer;