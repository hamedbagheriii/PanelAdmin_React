import React from 'react';
import SidebarLi from '../../../UI/Sidebar/Li';

const Orders = () => {
    return (
        <>
            <li className="py-1 text-start d-flex justify-content-center no_pointer no_hover ">
                <span className="hiddenable no_wrap group_sidebar_title">سفارشات و سبد</span>
            </li>

            <SidebarLi targetPatch={'/test'} text={'مدیریت سبد ها'} id={'manage_cart_section'} icon={'fas fa-shopping-basket'} />
            
            <SidebarLi targetPatch={'/test'} text={'مدیریت سفارشات'} id={'manage_orders_section'} icon={'fas fa-luggage-cart'} />

            <SidebarLi targetPatch={'/test'} text={'مدیریت نحوه ارسال'} id={'manage_deliveries_section'} icon={'fas fa-truck-loading'} />

        </>
    );
}

export default Orders;
