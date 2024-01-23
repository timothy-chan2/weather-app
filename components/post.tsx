import { useState, useMemo } from 'react';

import Image from 'next/image';

import { getLongDate, getCurrentTime } from '../helpers/selectors';

import space from '../styles/Spacestagram.module.css';
import styles from '../styles/Post.module.css';

// The Post component shows an image and the title, date,
// description, and like or unlike button related to it
const Post = (props) => {
  let likeStatus = typeof window !== 'undefined' ? localStorage.getItem(`like-status-${props.id}`) : null;
  const [buttonText, setButtonText] = useState(likeStatus || 'Like');

  const longDate = useMemo(
    () => getLongDate(new Date(`${props.id} ${getCurrentTime()}`)),
    [props.id]
  );

  const clickLikeUnlike = () => {
    buttonText === 'Like' ? setButtonText('Unlike') : setButtonText('Like');

    if (likeStatus === null || likeStatus === 'Like') {
      likeStatus = 'Unlike';
      localStorage.setItem(`like-status-${props.id}`, 'Unlike');
    } else if (likeStatus === 'Unlike') {
      likeStatus = 'Like';
      localStorage.setItem(`like-status-${props.id}`, 'Like');
    }
  };
  
  return (
    <article className={styles.post}>
      {props.media === 'image' &&
        <Image
          src={props.url}
          alt={props.title}
          aria-labelledby={props.id}
          className={styles.postImg}
          data-testid='image'
          sizes='(max-width: 992px) 90vw, (min-width: 992px) 70vw'
          width='350'
          height='360'
        />
      }
      {props.media === 'video' &&
        <iframe
          src={props.url}
          aria-labelledby={props.id}
          className={`${styles.postImg} ${styles.postVid}`}
          title={props.title}
          loading='lazy'
          data-testid='video'
        >
          <p>Your browser does not support iframes.</p>
        </iframe>
      }
      <h3 className={styles.postTitle}>
        {props.title} - {longDate}
        {likeStatus === 'Unlike' && <span id={`${props.id}-like`}> ❤️</span>}
      </h3>
      <p id={props.id} className={styles.postDesc}>{props.description}</p>
      <button
        aria-label='Like or unlike the picture'
        onClick={() => clickLikeUnlike()}
        className={`${styles.postLikeBtn} ${space.spaceButton}`}
        type='button'
        aria-controls={`${props.id}-like`}
      >
        {buttonText}
      </button>
    </article>
  );
};

export default Post;