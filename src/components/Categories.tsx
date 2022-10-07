import React from 'react';

type CategoriesProps = {
    categoryId: number;
    categoryIdHandler: (index: number) => void;
};

export const Categories: React.FC<CategoriesProps> = React.memo(
    ({ categoryId, categoryIdHandler }) => {
        const categories = ['All', 'Meat', 'Veggie'];

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
    }
);
