import Image from 'next/image';

import styles from '../styles/Post.module.css';
import projectStyles from '../styles/Project.module.css';

// The Project component shows an image, title, and
// description of a project I previously worked on
const Project = (props) => {
  return (
    <article className={styles.post}>
      {props.linkUrl &&
        <a href={props.linkUrl} target='_blank' rel='noreferrer'>
          {props.priority ? (
            <Image
              src={`/${props.imgUrl}`}
              alt={props.title}
              aria-label={props.title}
              className={styles.postImg}
              sizes='(max-width: 992px) 90vw, (min-width: 992px) 70vw'
              width='350'
              height='360'
              priority
            />
          ) : (
            <Image
              src={`/${props.imgUrl}`}
              alt={props.title}
              aria-label={props.title}
              className={styles.postImg}
              sizes='(max-width: 992px) 90vw, (min-width: 992px) 70vw'
              width='350'
              height='360'
            />
          )}
        </a>
      }
      {props.videoUrl &&
        <iframe
          src={props.videoUrl}
          aria-labelledby={props.title}
          className={`${styles.postImg} ${styles.postVid}`}
          title={props.title}
          loading='lazy'
        >
          <p>Your browser does not support iframes.</p>
        </iframe>
      }
      <h3 className={styles.postTitle}>{props.title}</h3>
      <p className={`${styles.postDesc} ${projectStyles.projectDesc}`}>{props.description}</p>
    </article>
  );
};

export default Project;