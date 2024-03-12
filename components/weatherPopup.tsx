import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import styles from '../styles/WeatherPopup.module.css';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

const WeatherPopup = ({ isOpen, setIsOpen, children }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  
  const handleCloseModal = () => {
    setIsOpen(false);
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
    <dialog ref={modalRef} onKeyDown={handleKeyDown} className='modal'>
      {children}
      <button className='modal-close-btn' onClick={handleCloseModal}>
        Close
      </button>
    </dialog>
  );
};

export default WeatherPopup;