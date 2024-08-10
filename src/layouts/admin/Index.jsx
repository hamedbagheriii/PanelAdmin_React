import React, { useEffect } from 'react';
import IndexNavbar from './navbar/IndexNavbar';
import IndexSidebar from './sidebar/IndexSidebar';
import IndexContent from './content/IndexContent';
import AdminContextContainer from '../../context/adminLayoutContext';


const Index = () => {
    
    // this for render js file
    // برای رندر کردن فایل های js که قبل از ایجاد دام کار میکنن
    // useEffect(() => {
        // require('URL')
    // }, []);


    return (
        <AdminContextContainer>
            <div>
                <IndexNavbar/>
                <IndexSidebar/>
                <IndexContent/>
            </div>
        </AdminContextContainer>
    );
}

export default Index;
