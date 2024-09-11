import React from 'react';
import PageContainer from '../../../components/PageContainer';
import DeliverysTable from './DeliverysTable';

const Deliverys = () => {
    return (
        <div id="manage_deliveries_section" className="manage_deliveries_section main_section ">
            {/* --- page header --- */}
            <PageContainer title={'مدیریت نحوه ارسال'} />
            
            {/* --- page table --- */}
            <DeliverysTable/>
        </div>
    );
}

export default Deliverys;
