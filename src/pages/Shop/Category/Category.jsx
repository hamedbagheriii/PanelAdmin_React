import React from 'react';
import CategoryTable from './CategoryTable';
import PageContainer from '../../../components/PageContainer';
import AddAtrrCategory from './AddAtrrCategory';
import { Outlet, useLocation, useOutlet, useParams } from 'react-router-dom';
import CategoryContextContainer from '../../../context/categoryContext';

const Category = () => {
    return (
        <CategoryContextContainer>
            <div id="manage_product_category" className="manage_product_category main_section">
                {/* --- page header --- */}
                <PageContainer title={`مدیریت دسته بندی محصولات`} />
                <Outlet/>
        
                {/* --- page table --- */}
                <CategoryTable/>
        
                <AddAtrrCategory />
            </div>  
        </CategoryContextContainer>
    );
}

export default Category;
