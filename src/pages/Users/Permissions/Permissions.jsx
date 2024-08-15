import React from 'react';
import PageContainer from '../../../components/PageContainer';
import PermissionsTable from './PermissionsTable';

const Permissions = () => {
    return (
        <div id="manage_permission_section" className="manage_role_section main_section ">
            {/* --- page header --- */}
            <PageContainer title={'مدیریت مجوز ها'} />
            
            {/* --- page table --- */}
            <PermissionsTable/>

        </div>
    );
}

export default Permissions;
