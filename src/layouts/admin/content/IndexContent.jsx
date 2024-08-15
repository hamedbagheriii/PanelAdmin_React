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
import Comments from '../../../pages/Communication/Comments/Comments.jsx';

const IndexContent = () => {
    const {showSlidebar} = useContext(adminContext)
    
  

    
    return (
        <section id="content_section" className={` py-3 px-3
        ${showSlidebar ? 'with_sidebar' : null}`}>
            
           <Routes>
            
             <Route path='/Dashboard' element={<Dashboard/>} />

            {/* ====== SHOP ===== */}

            <Route path='/Shop/Category' element={<Category/>} />

            <Route path='/Shop/Product' element={<Product/>} />

            <Route path='/Shop/Brands' element={<Brands/>} />

            <Route path='/Shop/Guaranties' element={<Guaranties/>} />

            <Route path='/Shop/Colors' element={<Colors/>} />

            <Route path='/Shop/Discount' element={<Discount/>} />



            {/* ====== Cart ===== */}

            <Route path='/Cart/Carts' element={<Carts/>} />

            <Route path='/Cart/Orders' element={<Orders/>} />

            <Route path='/Cart/Deliverys' element={<Deliverys/>} />



            {/* ====== Users ===== */}
            
            <Route path='/Users/Users' element={<Users/>} />

            <Route path='/Users/Roles' element={<Roles/>} />

            <Route path='/Users/Permissions' element={<Permissions/>} />



            {/* ====== Communication ===== */}

            <Route path='/Communication/Questions' element={<Questions/>} />

            <Route path='/Communication/Comments' element={<Comments/>} />




            {/* ====== main page ====== */}

            <Route path='*' element={<Dashboard/>} />

           </Routes>

        </section>
    );
}

export default IndexContent;
