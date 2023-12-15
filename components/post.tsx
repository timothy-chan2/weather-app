import { useState, useMemo } from 'react';
import { getLongDate, getCurrentTime } from '../helpers/selectors';

// The Post component shows an image and the title, date,
// description, and like or unlike button related to it
const Post = (props) => {
  let likeStatus = localStorage.getItem(`like-status-${props.id}`);
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
    <article className='post'>
      {props.media === 'image' &&
        <img
          src={props.url}
          aria-labelledby={props.id}
          className='post-img'
          data-testid='image'
        />
      }
      {props.media === 'video' &&
        <iframe
          src={props.url}
          aria-labelledby={props.id}
          className='post-img post-vid'
          title={props.title}
          loading='lazy'
          data-testid='video'
        >
          <p>Your browser does not support iframes.</p>
        </iframe>
      }
      <h3 className='post-title'>
        {props.title} - {longDate}
        {likeStatus === 'Unlike' && <span id={`${props.id}-like`}> ❤️</span>}
      </h3>
      <p id={props.id} className='post-desc'>{props.description}</p>
      <button
        aria-label='Like or unlike the picture'
        onClick={() => clickLikeUnlike()}
        className='post-like-btn'
        type='button'
        aria-controls={`${props.id}-like`}
      >
        {buttonText}
      </button>
    </article>
  );
};

export default Post;