import React, { useEffect } from 'react';
import IndexNavbar from './navbar/IndexNavbar';
import IndexSidebar from './sidebar/IndexSidebar';
import IndexContent from './content/IndexContent';
import AdminContextContainer from '../../context/adminLayoutContext';


const AdminLayout = () => {
    return (
        <AdminContextContainer>
            <div>
                <IndexContent/>
                <IndexNavbar/>
                <IndexSidebar/>
            </div>
        </AdminContextContainer>
    );
}

export default AdminLayout;
