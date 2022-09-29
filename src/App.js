import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import './scss/app.scss';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { FullPizza } from './pages/FullPizza';
import SearchValueContext from './store/SearchValueContext';

function App() {
    const [searchValue, setSearchValue] = useState('');

    const searchInputChangeHandler = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <div className='wrapper'>
            <SearchValueContext.Provider
                value={{ searchValue, searchInputChangeHandler }}
            >
                <Header />

                <div className='content'>
                    <Routes>
                       
                            <Route path='/' element={<Home />} />
                      

                        <Route path='/cart' element={<Cart />} />
                        <Route path='/pizza/:d' element={<FullPizza />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </div>
            </SearchValueContext.Provider>
        </div>
    );
}

export default App;
