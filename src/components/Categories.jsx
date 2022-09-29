import React, { useContext } from 'react';
import ActiveSortOptionContext from '../store/ActiveSortOptionContext';
function Categories() {
    const categories = ['All', 'Meat', 'Veggie'];

    const { categoryId, categoryIdHandler } = useContext(
        ActiveSortOptionContext
    );

    const onClickHandler = (index) => {
        categoryIdHandler(index);
    };
    return (
        <div className='categories'>
            <ul>
                {categories.map((category, index) => {
                    return (
                        <li
                            key={index}
                            onClick={() => onClickHandler(index)}
                            className={index === categoryId ? 'active' : ''}
                        >
                            {category}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Categories;
