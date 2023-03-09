import { Component } from "react";
import { createPortal } from 'react-dom';
import { Backdrop, ModalView } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {

    componentDidMoun() {
        window.addEventListener('keydown', this.handleKeyEsc)
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyEsc)
    }
    handleKeyEsc = evt => {

        if (evt === 'Escape') {
            this.props.onClose();
        }
    }
    handleBackdropClick = evt => {
        if (evt.currentTarget === evt.target) {
            this.props.onClose();
        }
    }
    render() {
        return createPortal(<Backdrop onClick={this.handleBackdropClick}>
            <ModalView>
                {this.props.children}
            </ModalView>
        </Backdrop>, modalRoot)
    }
};


