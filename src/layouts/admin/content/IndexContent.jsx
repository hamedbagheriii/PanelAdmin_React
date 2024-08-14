import React, { useContext, useEffect } from 'react';
import { adminContext } from '../../../context/adminLayoutContext';
import Dashboard from '../../../pages/Dashboard/Dashboard';
import Category from '../../../pages/Shop/Category/Category';
import Product from '../../../pages/Shop/Product/Product';
import { Route, Routes } from 'react-router-dom';
import Colors from '../../../pages/Shop/Colors/Colors';
import Guaranties from '../../../pages/Shop/Guaranties/Guaranties';
import Brands from '../../../pages/Shop/Brands/Brands';

const IndexContent = () => {
    const {showSlidebar} = useContext(adminContext)
    
  

    
    return (
        <section id="content_section" className={` py-3 px-3
        ${showSlidebar ? 'with_sidebar' : null}`}>
            
           <Routes>
            
             <Route path='/Dashboard' element={<Dashboard/>} />

            {/* ====== SHOP ===== */}

            <Route path='/Category' element={<Category/>} />

            <Route path='/Product' element={<Product/>} />

            <Route path='/Brands' element={<Brands/>} />

            <Route path='/Guaranties' element={<Guaranties/>} />

            <Route path='/Colors' element={<Colors/>} />



            {/* ====== main page ====== */}

            <Route path='*' element={<Dashboard/>} />

           </Routes>

        </section>
    );
}

export default IndexContent;
