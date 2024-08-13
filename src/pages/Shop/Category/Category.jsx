import React from 'react';
import CategoryTable from './CategoryTable';
import AddCategory from './AddCategory';
import PageContainer from '../../../components/PageContainer';

const Category = () => {
    return (
        <div id="manage_product_category" className="manage_product_category main_section">
            {/* --- page header --- */}
            <PageContainer title={'مدیریت دسته بندی محصولات'} />


            {/* --- page table --- */}
            <CategoryTable/>
            
        </div>
    );
}

export default Category;
