import React, { useContext } from 'react';

type CategoriesProps = {
    categoryId: number;
    categoryIdHandler: (index: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({
    categoryId,
    categoryIdHandler,
}) => {
    const categories = ['All', 'Meat', 'Veggie'];


    console.log('categoryId', categoryId);


    const onClickHandler = (index: number) => {
        categoryIdHandler(index);
    };
    return (
        <div className='categories'>
            <ul>
                {categories.map((category, index: number) => {
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
};

export default Categories;
