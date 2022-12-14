import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setsortBy } from '../../redux/slices/filterSlice';

type PopupClick = MouseEvent & {
    path: Node[];
};

type SortProps = {
    sortBy: string;
};
export const Sort: React.FC<SortProps> = React.memo(({ sortBy }) => {
    const sortBys: string[] = ['rating', 'price', 'title'];

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const dispatch = useDispatch();
    const sortElementRef = useRef<HTMLDivElement>(null);

    const onClicksortBy = (sortProperty: string) => {
        dispatch(setsortBy(sortProperty));
        setIsOpen(false);
    };

    useEffect(() => {
        const clickOutsideHandler = (event: MouseEvent) => {
            const _event = event as PopupClick;
            if (
                sortElementRef.current &&
                !_event.path.includes(sortElementRef.current)
            ) {
                setIsOpen(false);
            }
        };
        document.body.addEventListener('click', clickOutsideHandler);

        return () =>
            document.body.removeEventListener('click', clickOutsideHandler);
    }, []);

    return (
        <div className='sort' ref={sortElementRef}>
            <div className='sort__label'>
                <svg
                    width='20'
                    height='10'
                    viewBox='0 0 10 6'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
                        fill='#2C2C2C'
                    />
                </svg>
                <h3>
                    <b>Sort by:</b>
                </h3>
                <span
                    onClick={() => {
                        return setIsOpen(!isOpen);
                    }}
                >
                    {sortBy}
                </span>
            </div>
            {isOpen && (
                <div className='sort__popup'>
                    <ul>
                        {sortBys.map((option, index) => {
                            return (
                                <li
                                    key={index}
                                    className={
                                        option === sortBy ? 'active' : ''
                                    }
                                    onClick={() =>
                                        onClicksortBy(sortBys[index])
                                    }
                                >
                                    {option}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
});
