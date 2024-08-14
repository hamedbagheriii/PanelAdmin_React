import React from 'react';
import PageContainer from '../../../components/PageContainer';
import DiscountTable from './DiscountTable';

const Discount = () => {
    return (
        <div id="manage_discount_section" className="manage_discount_section main_section ">
            {/* --- page header --- */}
            <PageContainer title={'مدیریت تخفیف ها'} />
            
            {/* --- page table --- */}
            <DiscountTable/>

        </div>
    );
}

export default Discount;
