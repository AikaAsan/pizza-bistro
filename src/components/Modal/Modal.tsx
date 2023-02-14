import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import FocusLock from 'react-focus-lock';
// import cancelSvg from '../../assets/img/icons8-cancel-67.png';
import styles from './Modal.module.scss';

export interface ModalProps {
    isShown: boolean;
    hide: () => void;
    headerText: string;
    modalContent: JSX.Element;
}
export const Modal: React.FC<ModalProps> = ({
    isShown,
    hide,
    headerText,
    modalContent,
}) => {
    const onKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.keyCode === 27 && isShown) {
                hide();
            }
        },
        [isShown, hide]
    );

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown, false);
        isShown
            ? (document.body.style.overflow = 'hidden')
            : (document.body.style.overflow = 'unset');
        document.addEventListener('keydown', onKeyDown, false);

        return () => {
            document.addEventListener('keydown', onKeyDown, false);
            document.removeEventListener('keydown', onKeyDown, false);
        };
    }, [isShown, onKeyDown]);

    const modal = (
        <>
            <div className={styles.backdrop}></div>
            <FocusLock>
                <div
                    className={styles.wrapper}
                    aria-modal
                    aria-labelledby={headerText}
                    tabIndex={-1}
                    role='dialog'
                >
                    <div className={styles.container}>
                        <div className={styles.styledModal}>
                            {/* <div className={styles.header}>
                            <h3>{headerText}</h3>
                            <button
                                className={styles.closeButton}
                                onClick={hide}
                                data-dismiss='modal'
                                aria-label='Close'
                            >
                                X
                                {/* <img src={cancelSvg} alt='cancel button' /> */}
                            {/* </button> */}
                            {/* </div> */}

                            <div className={styles.content}>{modalContent}</div>
                        </div>
                        <div>
                            <button
                                className={styles.closeButton}
                                onClick={hide}
                                data-dismiss='modal'
                                aria-label='Close'
                            >
                                <svg
                                    width='25'
                                    height='25'
                                    viewBox='0 0 25 25'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        fill-rule='evenodd'
                                        clip-rule='evenodd'
                                        d='M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z'
                                        fill='white'
                                    ></path>
                                </svg>
                                {/* <img src={cancelSvg} alt='cancel button' /> */}
                            </button>
                        </div>
                    </div>
                </div>
            </FocusLock>
        </>
    );
    return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
