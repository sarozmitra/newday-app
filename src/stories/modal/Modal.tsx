import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx'
import style from './Modal.module.css';

interface ModalProps {
  /** Class name or array of class names that are applied to the control route */
  className?: string
  /** Indicate if the modal should be rendered or not */
  isOpen: boolean;
  /** Action event handler for closing Modal */
  onClose: () => void;
  /** Indicate of the close button should be rendered */
  showCloseButton?: boolean
  /** Children is the text or content to be rendered */
  children: React.ReactNode
  /** Disable body scroll of page when modal is open */
  disableBodyScroll?: boolean
  /** Modal Data Test Id for automation testing */
  dataTestIdPrefix?: string
  /** Used to control predefined sizing small & large. Adaptive size will fit width to the content of modal */
  size?: 'small' | 'large' | 'x-large' | 'adaptive'
  /** Set aria Label by for Modal */
  ariaLabelledBy?: string;
  /** Set aria described by for Modal */
  ariaDescribedBy?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  disableBodyScroll = true,
  showCloseButton = true,
  size = 'small',
  ariaLabelledBy,
  ariaDescribedBy,
  dataTestIdPrefix = 'modal',
  ...props
}) => {
  const modalRoot = document.getElementById('modal-root') || document.body; // Fallback to body if modal-root doesn't exist
  const modalRef = useRef<HTMLDivElement | null>(null);
  const firstFocusableRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (disableBodyScroll) {
      if (isOpen) document.body.style.overflow = 'hidden';
      else document.body.style.overflow = '';

      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [disableBodyScroll, isOpen]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const trapFocus = (e: KeyboardEvent) => {
    if (!modalRef.current) return;

    const focusableContent = modalRef.current.querySelectorAll(
      'button, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableContent[0] as HTMLElement;
    const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement;

    if (e.key === 'Tab' && e.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else if (e.key === 'Tab') {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    };

    if (isOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }

    window.addEventListener('keydown', handleEsc);
    window.addEventListener('keydown', trapFocus);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('keydown', trapFocus);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={style.Modal} onClick={handleOutsideClick} data-testid='modal-overlay' >
      <div
        ref={modalRef}
        aria-modal="true"
        role="dialog"
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        className={clsx(style.modalContent, style[size])}
        data-testid={dataTestIdPrefix}
        {...props}
      >
        {showCloseButton && (
          <button
            aria-label="Close modal"
            onClick={onClose}
            ref={firstFocusableRef}
            className={style.closeButton}
          >
            X
          </button>
        )}
        {children}
      </div>
    </div>,
    modalRoot
  );
};

