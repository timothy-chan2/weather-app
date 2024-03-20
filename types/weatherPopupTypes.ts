import { Dispatch, SetStateAction } from 'react';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setModalMessage: Dispatch<SetStateAction<string>>;
  children: React.ReactNode;
};

export type { ModalProps };