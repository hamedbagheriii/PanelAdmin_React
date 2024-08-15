import React from 'react';
import PageContainer from '../../../components/PageContainer';
import RolesTable from './RolesTable';

const Roles = () => {
    return (
        <div id="manage_role_section" className="manage_role_section main_section ">
            {/* --- page header --- */}
            <PageContainer title={'مدیریت نقش ها'} />
            
            {/* --- page table --- */}
            <RolesTable/>

        </div>
    );
}

export default Roles;
