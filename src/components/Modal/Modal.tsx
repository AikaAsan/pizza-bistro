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
                    <div className={styles.styledModal}>
                        <div className={styles.header}>
                            <h3>{headerText}</h3>
                            <button
                                className={styles.closeButton}
                                onClick={hide}
                                data-dismiss='modal'
                                aria-label='Close'
                            >
                                X
                                {/* <img src={cancelSvg} alt='cancel button' /> */}
                            </button>
                        </div>
                        <div className={styles.content}>{modalContent}</div>
                    </div>
                </div>
            </FocusLock>
        </>
    );
    return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
