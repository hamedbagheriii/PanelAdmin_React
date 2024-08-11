import React, { useContext } from 'react';
import { adminContext } from '../../../context/adminLayoutContext';
import Dashboard from '../../../pages/Dashboard/Dashboard';
import Category from '../../../pages/Shop/Category/Category';
import Product from '../../../pages/Shop/Product/Product';

const IndexContent = () => {
    const {showSlidebar} = useContext(adminContext)
    

    return (
        <section id="content_section" className={` py-3 px-3
        ${showSlidebar ? 'with_sidebar' : null}`}>
            
            <Dashboard/>

            {/* ====== SHOP ===== */}

            {/* <Category/> */}

            {/* <Product/> */}

            

        </section>
    );
}

export default IndexContent;
