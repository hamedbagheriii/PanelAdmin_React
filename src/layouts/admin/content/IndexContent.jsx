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
import CategoryOutlet from '../../../pages/Shop/Category/categoryOutlet.jsx';
import AtrrCategory from '../../../pages/Shop/Category/attr/AtrrCategory.jsx';
import AddProduct from '../../../pages/Shop/Product/AddProduct.jsx';
import AddAtrrProduct from '../../../pages/Shop/Product/setAttr/AddAtrProduct.jsx';
import Gallery from '../../../pages/Shop/Product/gallery/gallery.jsx';
import AddDiscount from '../../../pages/Shop/Discount/AddDiscount.jsx';
import AddRole from '../../../pages/Users/Roles/AddRole.jsx';
import AddUser from '../../../pages/Users/UsersSection/AddUser.jsx';
import { useSelector } from 'react-redux';
import PermComponent from '../../../components/permComponent.jsx';
import { useHasPermission } from '../../../hook/permissionHook.js';


const IndexContent = () => {
    const {showSlidebar , showSlidebarSM} = useContext(adminContext)

    // چون این روت فرزند داره از این روش شرطیش میکنیم 
    const hasCategoryPermission = useHasPermission('read_Categories');
    const hasDiscountPermission = useHasPermission('read_discounts');
    const hasUserPermission = useHasPermission('read_users');
    const hasRolePermission = useHasPermission('read_roles');


    return (
        <section id="content_section" className={` py-3 px-3
        ${showSlidebar ? 'with_sidebar' : showSlidebarSM ? 'activeSM' : null}`}>
            
           <Routes>
            
             <Route path='/Dashboard' element={<Dashboard/>} />

            {/* ====== SHOP ===== */}
        
            {hasCategoryPermission ? (
                <Route path='/Category' element={<Category/>} >
                    <Route path=':categoryID' element={<CategoryOutlet/>}/>
                </Route>
            ) : null}

            <Route path='/Category/:categoryID/attributes' element={<PermComponent
            component={<AtrrCategory/>} permTitle={'read_category_attrs'} />}/>


            <Route path='/Product' element={<PermComponent
            component={<Product/>} permTitle={'read_products'} />} />
            <Route path='/Product/Add-Product' element={<PermComponent
            component={<AddProduct/>} permTitle={'create_product'}/>} />
            <Route path='/Product/:ProductID/attributes' element={<PermComponent
            component={<AddAtrrProduct/>} permTitle={'create_product_attr'}/>}/>
            <Route path='/Product/:ProductID/gallery' element={<PermComponent
            component={<Gallery/>} permTitle={'create_product_image'}/>}/>

            <Route path='/Brands' element={<PermComponent
            component={<Brands/>} permTitle={'read_brands'}/>} />

            <Route path='/Guaranties' element={<PermComponent
            component={<Guaranties/>} permTitle={'read_guarantees'}/>} />

            <Route path='/Colors' element={<PermComponent
            component={<Colors/>} permTitle={'read_colors'}/>} />
            
            {hasDiscountPermission ? (
                <Route path='/Discounts' element={<Discount/>} >
                    <Route path='add-discount-code' element={<AddDiscount/>}/>
                </Route>
            ) : null}



            {/* ====== Cart ===== */}

            <Route path='/Carts' element={<PermComponent
            component={<Carts/>} permTitle={'read_carts'}/>} />

            <Route path='/Orders' element={<PermComponent
            component={<Orders/>} permTitle={'read_orders'}/>} />

            <Route path='/Deliverys' element={<PermComponent
            component={<Deliverys/>} permTitle={'read_deliveries'}/>} />



            {/* ====== Users ===== */}
            
            {hasUserPermission ? (
                <Route path='/Users' element={<Users/>} >
                    <Route path='add-user' element={<PermComponent
                    component={<AddUser/>} permTitle={'create_user'}/>} />
                </Route>
            ) : null}

            {hasRolePermission ? (
                <Route path='/Roles' element={<Roles/>} >
                    <Route path='add-role' element={<PermComponent
                    component={<AddRole/>} permTitle={'create_role'} />} />
                </Route>
            ) : null}

            <Route path='/Permissions' element={<PermComponent
            component={<Permissions/>} permTitle={'read_permissions'}/>} />



            {/* ====== Communication ===== */}

            <Route path='/Questions' element={<Questions/>} />

            <Route path='/Comments' element={<Comments/>} />




            {/* ====== main page ====== */}

            <Route path='*' element={<Dashboard/>} />

           </Routes>

        </section>
    );
}

export default IndexContent;
