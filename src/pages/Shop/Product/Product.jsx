import React from 'react';
import ProductTable from './ProductTable';
import PageContainer from '../../../components/PageContainer';

const Product = () => {
    return (
        <div id="manage_product_section" className="manage_product_section main_section ">
            {/* --- page header --- */}
            <PageContainer title={'مدیریت محصولات'} />
            
            {/* --- page table --- */}
            <ProductTable/>

        </div>
    );
}

export default Product;
