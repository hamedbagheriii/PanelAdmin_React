import React from 'react';
import PageContainer from '../../../components/PageContainer';
import CartTable from './CartsTable';

const Carts = () => {
    return (
        <div id="manage_cart_section" className="manage_cart_section main_section ">
            {/* --- page header --- */}
            <PageContainer title={'مدیریت سبد خرید'} />
            
            {/* --- page table --- */}
            <CartTable/>

        </div>
    );
}

export default Carts;
