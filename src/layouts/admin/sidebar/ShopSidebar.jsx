import React from 'react';
import SidebarLi from '../../../UI/Sidebar/Li';

const ShopSidebar = () => {
    return (
        <>
            <li className="py-1 text-start d-flex justify-content-center no_pointer no_hover ">
                <span className="hiddenable no_wrap group_sidebar_title mt-0">فروشگاه</span>
            </li>

            <SidebarLi ptitle={'read_categories'} targetPatch={'/Category'} text={'مدیریت گروه محصول'} id={'manage_product_category'} icon={'fas fa-stream'} />

            <SidebarLi ptitle={'read_products'} targetPatch={'/Product'} text={'مدیریت محصول'} id={'manage_product_section'} icon={'fas fa-cube'} />

            <SidebarLi ptitle={'read_brands'} targetPatch={'/Brands'} text={'مدیریت برند ها'} id={'manage_brand_section'} icon={'fas fa-copyright'} />
            
            <SidebarLi ptitle={'read_guarantees'} targetPatch={'/Guaranties'} text={'مدیریت گارانتی ها'} id={'manage_guarantee_section'} icon={'fab fa-pagelines'} />

            <SidebarLi ptitle={'read_colors'} targetPatch={'/Colors'} text={'مدیریت رنگ ها'} id={'manage_color_section'} icon={'fas fa-palette'} />
            
            <SidebarLi ptitle={'read_discounts'} targetPatch={'/Discounts'} text={'مدیریت تخفیف ها'} id={'manage_discount_section'} icon={'fas fa-percentage'} />
            
        </>
    );
}

export default ShopSidebar;
