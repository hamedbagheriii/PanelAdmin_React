import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert } from '../../../utils/alert';

const Logout = () => {
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        const tokenData = JSON.parse(localStorage.getItem('loginToken'))
        
        if (tokenData) {
            axios.get('https://ecomadminapi.azhadev.ir/api/auth/logout' , {
                headers : {
                    'Authorization' : `Bearer ${tokenData.token}`
                }
            }).then(res=>{
                if(res.status == 200){
                    Alert('با موفقیت خارج شدید .' , '' , 'success')
                    localStorage.removeItem('loginToken');
                }
                else{
                    Alert('یک مشکل به وجود آمده است .' , '' , 'error')
                }
                setLoading(false);
            }).catch(err=>{
                setLoading(false);
                if (!tokenData) {
                    Alert('خطا در ارتباط با سرور !' , '' , 'error')
                }
            })
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
