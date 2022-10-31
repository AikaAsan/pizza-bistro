import React from 'react';

import { Modal } from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';
import classes from './PizzaBuilder.module.scss';
import BuilderContent from '../PizzaBuilderModal/PizzaBuilderModal';

const PizzaBuilder: React.FC = () => {
    const { isShown, toggle } = useModal();
    return (
        <>
            <button className={classes.button} onClick={toggle}>
                Build Your Own Pizza
            </button>
            <Modal
                isShown={isShown}
                hide={toggle}
                headerText='Build Your Own Pizza'
                modalContent={<BuilderContent />}
            />
        </>
    );
};

export default PizzaBuilder;
