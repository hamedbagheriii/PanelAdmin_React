import React from 'react';
import PageContainer from '../../../components/PageContainer';
import BrandsTable from './BrandsTable';

const Brands = () => {
    return (
        <div id="manage_brand_section" className="manage_brand_section main_section">
            <PageContainer title={'مدیریت برند ها'} />            

            <BrandsTable />
        </div>
    );
}

export default Brands;
