import React, { useContext, useEffect } from 'react';
import { adminContext } from '../../../context/adminLayoutContext';
import Dashboard from '../../../pages/Dashboard/Dashboard.jsx';
import Category from '../../../pages/Shop/Category/Category.jsx';
import Product from '../../../pages/Shop/Product/Product.jsx';
import { Route, Routes } from 'react-router-dom';
import Colors from '../../../pages/Shop/Colors/Colors.jsx';
import Guaranties from '../../../pages/Shop/Guaranties/Guaranties.jsx';
import Brands from '../../../pages/Shop/Brands/Brands.jsx';
import Discount from '../../../pages/Shop/Discount/Discount.jsx';
import Carts from '../../../pages/Orders/Carts/Carts.jsx';
import Orders from '../../../pages/Orders/Order/Orders.jsx';
import Deliverys from '../../../pages/Orders/Deliverys/Deliverys.jsx';
import Users from '../../../pages/Users/UsersSection/Users.jsx';
import Roles from '../../../pages/Users/Roles/Roles.jsx';
import Permissions from '../../../pages/Users/Permissions/Permissions.jsx';
import Questions from '../../../pages/Communication/Questions/Questions.jsx';

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

            <Route path='/Discount' element={<Discount/>} />



            {/* ====== Cart ===== */}

            <Route path='/Carts' element={<Carts/>} />

            <Route path='/Orders' element={<Orders/>} />

            <Route path='/Deliverys' element={<Deliverys/>} />



            {/* ====== Users ===== */}
            
            <Route path='/Users' element={<Users/>} />

            <Route path='/Roles' element={<Roles/>} />

            <Route path='/Permissions' element={<Permissions/>} />



            {/* ====== Communication ===== */}

            <Route path='/Questions' element={<Questions/>} />

            <Route path='/Comments' element={<Permissions/>} />




            {/* ====== main page ====== */}

            <Route path='*' element={<Dashboard/>} />

           </Routes>

        </section>
    );
}

export default IndexContent;
