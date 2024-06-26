import '../types/loadingDotsTypes';
import styles from '../styles/LoadingDots.module.css';

// The LoadingDots component shows three dots that grow and shrink
// at different times while the project cards are loading
const LoadingDots = (props: LoadingDotsProps) => {
  let loaderDotStyles: string;
  
  if (props.dotColor === 'purple') {
    loaderDotStyles = `${styles.loaderDot} ${styles.purpleDot}`;
  } else if (props.dotColor === 'light blue') {
    loaderDotStyles = `${styles.loaderDot} ${styles.blueDot}`;
  }
  
  return (
    <article className={styles.loader}>
      <span className={loaderDotStyles} />
      <span className={loaderDotStyles} />
      <span className={loaderDotStyles} />
    </article>
  );
};

export default LoadingDots;