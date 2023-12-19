import { useState } from 'react';

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
        className={styles.loadingDropdownBtn}
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
            className={loadingIcon === 'dots' ?
              styles.loadingOptionBtnSelected : styles.loadingOptionBtn}
            type='button'
          >
            Dots
          </button>
          <button
            aria-label='Switch to the wheel loading icon'
            onClick={() => handleDropdownSelect('wheel')}
            className={loadingIcon === 'wheel' ?
              styles.loadingOptionBtnSelected : styles.loadingOptionBtn}
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