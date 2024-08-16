import React from 'react';
import ProductTable from './ProductTable';
import AddProduct from './AddProduct';
import ModalsContainer from '../../../components/ModalsContainer';
import PageContainer from '../../../components/PageContainer';
import AddAtrrProduct from './AddAtrProduct';

const Product = () => {
    return (
        <div id="manage_product_section" className="manage_product_section main_section ">
            {/* --- page header --- */}
            <PageContainer title={'مدیریت محصولات'} />
            
            {/* --- page table --- */}
            <ProductTable/>

            <AddAtrrProduct/>

        </div>
    );
}

export default Product;
