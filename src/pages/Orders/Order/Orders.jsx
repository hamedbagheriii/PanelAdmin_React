import React from 'react';
import PageContainer from '../../../components/PageContainer';
import OrdersTable from './OrdersTable';

const Orders = () => {
    return (
        <div id="manage_orders_section" className="manage_orders_section main_section ">
            {/* --- page header --- */}
            <PageContainer title={'مدیریت سفارشات'} />
            
            {/* --- page table --- */}
            <OrdersTable/>

        </div>
    );
}

export default Orders;
