import { useState, useEffect, useRef } from 'react';
import styles from '../styles/WeatherPopup.module.css';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
};

const WeatherPopup = ({ isOpen, children }: ModalProps) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null);
  
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

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