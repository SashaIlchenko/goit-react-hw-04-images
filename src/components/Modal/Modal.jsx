import { useEffect } from "react";
import { createPortal } from 'react-dom';
import { Backdrop, ModalView } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, src, alt }) => {
    const handleKeyEsc = evt => {
        if (evt === 'Escape') {
            onClose();
        }
    }
    const handleBackdropClick = evt => {
        if (evt.currentTarget === evt.target) {
            onClose();
        }
    }
    useEffect(() => {
        window.addEventListener('keydown', handleKeyEsc)
        return () => {
            window.removeEventListener('keydown', handleKeyEsc)
        }
    })
    return createPortal(<Backdrop onClick={handleBackdropClick}>
        <ModalView>
            <img src={src} alt={alt} />
        </ModalView>
    </Backdrop>, modalRoot)
}



