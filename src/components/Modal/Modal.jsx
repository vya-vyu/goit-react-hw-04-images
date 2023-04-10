import s from './Modal.module.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, imageAlt, imageUrl }) => {
  // const handleKeyDown = e => {
  //   if (e.code === 'Escape') {
  //     onClose();
  //   }
  // };
  const handleBackDrop = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.currentTarget === e.target) {
        onClose();
      }
    });
    return () => {
      window.removeEventListener('keydown', e => {
        if (e.currentTarget === e.target) {
          onClose();
        }
      });
    };
  }, []);

  return createPortal(
    <div className={s.Overlay} onClick={handleBackDrop}>
      <div className={s.Modal}>
        <img src={imageUrl} alt={imageAlt} width="600" />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
