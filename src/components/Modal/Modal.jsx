import { Component } from 'react';
import { createPortal } from 'react-dom';

import css from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    // ================== COMPONENT LIFECYCLE
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }
    // ================== /COMPONENT LIFECYCLE

    // ================== LOGIC
    handleKeyDown = event => {
        event.code === 'Escape' && this.props.onClose();
    };

    handleBackdropClick = event => {
        console.log(this.props.largeImage);
        event.currentTarget === event.target && this.props.onClose();
    };
    // ================== /LOGIC

    render() {
        return createPortal(
            <div onClick={this.handleBackdropClick} className={css.overlay}>
                <div className={css.modal}>
                <img src={this.props.largeImage} alt="Item gallery" />
                </div>
            </div>,
            modalRoot
        );
    };
};

export default Modal;
