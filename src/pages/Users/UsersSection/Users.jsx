import React from 'react';
import PageContainer from '../../../components/PageContainer';
import UsersTable from './UsersTable';

const Users = () => {
    return (
        <div id="manage_user_section" className="manage_user_section main_section ">
            {/* --- page header --- */}
            <PageContainer title={'مدیریت کاربران'} />
            
            {/* --- page table --- */}
            <UsersTable/>

        </div>
    );
}

export default Users;
