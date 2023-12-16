import { useState, useEffect, Fragment } from 'react';

// The ScrollTopBtn component shows that button to scroll to the top of the page
const ScrollTopBtn = () => {
  const [showScrollTopBtn, setShowScrollTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        setShowScrollTopBtn(true);
      } else {
        setShowScrollTopBtn(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Fragment>
      {showScrollTopBtn &&
        <button
          aria-label='Scroll to the top of the page'
          onClick={scrollToTop}
          className='scroll-top-btn'
          type='button'
        >
          &#11014;
        </button>
      }
    </Fragment>
  );
};

export default ScrollTopBtn;