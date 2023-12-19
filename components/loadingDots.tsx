// The LoadingDots component shows three dots that grow and shrink
// at different times while the project cards are loading
const LoadingDots = () => {
  return (
    <article className='loader'>
      <span className='loader-dot' />
      <span className='loader-dot' />
      <span className='loader-dot' />
    </article>
  );
};

export default LoadingDots;