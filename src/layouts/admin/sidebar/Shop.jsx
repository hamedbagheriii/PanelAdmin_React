import React from 'react';
import Li from '../../../UI/LI/Li';

const Shop = () => {
    return (
        <>
            <li className="py-1 text-start d-flex justify-content-center no_pointer no_hover ">
                <span className="hiddenable no_wrap group_sidebar_title mt-0">فروشگاه</span>
            </li>

            <Li text={'مدیریت گروه محصول'} id={'manage_product_category'} icon={'fas fa-stream'} />

            <Li text={'مدیریت محصول'} id={'manage_product_section'} icon={'fas fa-cube'} />

            <Li text={'مدیریت برند ها'} id={'manage_brand_section'} icon={'fas fa-copyright'} />
            
            <Li text={'مدیریت گارانتی ها'} id={'manage_guarantee_section'} icon={'fab fa-pagelines'} />

            <Li text={'مدیریت رنگ ها'} id={'manage_color_section'} icon={'fas fa-palette'} />
            
            <Li text={'مدیریت تخفیف ها'} id={'manage_discount_section'} icon={'fas fa-percentage'} />
            
        </>
    );
}

export default Shop;
