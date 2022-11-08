import React from 'react';

import { Modal } from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';
import classes from './PizzaBuilder.module.scss';
import PizzaBuilderModal from '../PizzaBuilderModal/PizzaBuilderModal';

const PizzaBuilder: React.FC = () => {
    const { isShown, toggle } = useModal();
    return (
        <>
            <button className={classes.button} onClick={toggle}>
                Create Your Own Pizza
            </button>
            <Modal
                isShown={isShown}
                hide={toggle}
                headerText='Create Your Own Pizza'
                modalContent={<PizzaBuilderModal />}
            />
        </>
    );
};

export default PizzaBuilder;
