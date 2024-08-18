import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert } from '../../../utils/alert';
import { logoutService } from '../../../services/auth';

const Logout = () => {
    const [loading , setLoading] = useState(true);

    const handleLogout = async (tokenData)=>{
        try {
            const res = await logoutService();
            if(res.status == 200){
                Alert('با موفقیت خارج شدید .' , '' , 'success')
                localStorage.removeItem('loginToken');
            }
            else{
                Alert('یک مشکل به وجود آمده است .' , '' , 'error')
            }
            setLoading(false);
        }
        catch (err) {
            setLoading(false);
            if (!tokenData) {
                Alert('خطا در ارتباط با سرور !' , '' , 'error')
            }
        }
    }

    useEffect( () => {
        const tokenData = JSON.parse(localStorage.getItem('loginToken'));

        if (tokenData) {
            handleLogout(tokenData);
        }else{
            setLoading(false);
        }
    }, []);

    return (
        <>
            {loading ? (
                <div className='w-100 vh-100 text-white d-flex flex-column align-items-center
                justify-content-center '>
                    <span className='mx-auto mb-3 fs-3 fw-bold'>لطفا صبر کنید . . .</span>
                    <span className='mx-auto fs-5 fw-bold'>در حال خروج از <span className='text-danger'>حساب</span></span>
                </div>
            ) : (
                <Navigate to={'/auth/login'} />
            )}
        </>
    );
}

export default Logout;
