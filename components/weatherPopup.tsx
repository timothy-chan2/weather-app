import { useEffect, useRef, Dispatch, SetStateAction } from 'react';
import styles from '../styles/WeatherPopup.module.css';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setModalMessage: Dispatch<SetStateAction<string>>;
  children: React.ReactNode;
};

const WeatherPopup = ({ isOpen, setIsOpen, setModalMessage, children }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  
  const handleCloseModal = () => {
    setIsOpen(false);
    setModalMessage('Weather data is already saved.');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isOpen]);

  return (
    <dialog ref={modalRef} onKeyDown={handleKeyDown} className={styles.modal}>
      {children}
      <button className={styles.modalCloseBtn} onClick={handleCloseModal}>
        Close
      </button>
    </dialog>
  );
};

export default WeatherPopup;