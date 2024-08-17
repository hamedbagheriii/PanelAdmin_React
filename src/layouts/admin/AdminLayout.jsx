import React, { useEffect, useState } from 'react';
import IndexNavbar from './navbar/IndexNavbar';
import IndexSidebar from './sidebar/IndexSidebar';
import IndexContent from './content/IndexContent';
import AdminContextContainer from '../../context/adminLayoutContext';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useInLogin } from '../../hook/authHook';


const AdminLayout = () => {

    const {isLogin , loading} = useInLogin();

    return (
        <AdminContextContainer>
            {loading ? (
                <div className='w-100 vh-100 text-white d-flex flex-column align-items-center
                justify-content-center '>
                    <span className='mx-auto mb-5 fs-3 fw-bold'>در حال انتقال به <span className='text-primary'>پنل</span></span>
                    <span className='mx-auto fs-4 fw-bold'>لطفا صبر کنید . . .</span>
                </div>
            ) : isLogin ? (
                <div>
                    <IndexContent/>
                    <IndexNavbar/>
                    <IndexSidebar/>
                </div>
            ) : (
                <Navigate to={'/auth/login'}/>
            )}
        </AdminContextContainer>
    );
}

export default AdminLayout;
