import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert } from '../../../utils/alert';
import { logoutService } from '../../../services/auth';
import { useInLogin } from '../../../hook/authHook';


const Logout = () => {
    const [loadings , setLoading] = useState(true);
    const {isLogin , loading} = useInLogin();

    const handleLogout = async ()=>{
        try {
            const res = await logoutService();
            if(res.status == 200){
                Alert('با موفقیت خارج شدید .' , '' , 'success')
                localStorage.removeItem('loginToken');
            }
            setLoading(false);
        }
        catch (err) {
            setLoading(false);
        }
    }

    useEffect( () => {
        const tokenData = JSON.parse(localStorage.getItem('loginToken'));

        if (tokenData  && isLogin) {
            handleLogout();
        }
        else if(!isLogin , !loading){
            setLoading(false);
        }
    }, [isLogin]);

    return (
        <>
            {loading || loadings ? (
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
