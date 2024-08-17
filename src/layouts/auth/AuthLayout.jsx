import React from 'react';
import Login from '../../pages/auth/Login/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useInLogin } from '../../hook/authHook';

const AuthLayout = () => {

    const {isLogin , loading} = useInLogin();


    return (
        <div className='bg-white w-100  mx-auto' style={{borderRadius:15,maxWidth:550}}>
            {loading ? (
                <div className='w-100 vh-100 text-white d-flex flex-column align-items-center
                justify-content-center '>
                    <span className='mx-auto fs-4 fw-bold'>لطفا صبر کنید . . .</span>
                </div>
            ) : !isLogin ? (
                <Routes>
                
                    <Route path='/auth/login' element={<Login/>} />
                
                </Routes>
            ) : (
                <Navigate to={'/'} />
            )}
        </div>
    );
}

export default AuthLayout;
