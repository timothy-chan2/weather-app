import { useState } from 'react';

import space from '../styles/Spacestagram.module.css';
import styles from '../styles/LoadingIconPicker.module.css';

const LoadingIconPicker = (props) => {
  const { loadingIcon, setLoadingIcon } = props;
  const [visible, setVisible] = useState(false);

  const toggleLoadingIconDropdown = () => setVisible(prev => !prev);

  const handleDropdownSelect = (choice) => {
    setLoadingIcon(choice);
    setVisible(false);
  };

  return (
    <article className={styles.loadingDropdown}>
      <button
        aria-label='Switch to a different loading icon'
        onClick={toggleLoadingIconDropdown}
        className={`${styles.loadingDropdownBtn} ${space.spaceButton}`}
        type='button'
        aria-controls='loading-choices'
      >
        Pick Loading Icon
      </button>
      {visible ? (
        <section id={styles.loadingChoices}>
          <button
            aria-label='Switch to the dots loading icon'
            onClick={() => handleDropdownSelect('dots')}
            className={loadingIcon === 'dots' ? (
                `${styles.loadingOptionBtnSelected} ${space.spaceButton}`
              ) : (
                `${styles.loadingOptionBtn} ${space.spaceButton}`
              )} 
            type='button'
          >
            Dots
          </button>
          <button
            aria-label='Switch to the wheel loading icon'
            onClick={() => handleDropdownSelect('wheel')}
            className={loadingIcon === 'wheel' ? (
                `${styles.loadingOptionBtnSelected} ${space.spaceButton}`
              ) : (
                `${styles.loadingOptionBtn} ${space.spaceButton}`
              )}
            type='button'
          >
            Wheel
          </button>
        </section>
      ) : null}
    </article>
  );
};

export default LoadingIconPicker;