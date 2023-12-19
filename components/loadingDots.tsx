import styles from '../styles/LoadingDots.module.css';

// The LoadingDots component shows three dots that grow and shrink
// at different times while the project cards are loading
const LoadingDots = () => {
  return (
    <article className={styles.loader}>
      <span className={styles.loaderDot} />
      <span className={styles.loaderDot} />
      <span className={styles.loaderDot} />
    </article>
  );
};

export default LoadingDots;