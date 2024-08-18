import React from 'react';
import Login from '../../pages/auth/Login/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useInLogin } from '../../hook/authHook';
import Register from '../../pages/auth/Register/Register';

const AuthLayout = () => {

    const {isLogin , loading} = useInLogin();


    return (
        <>
            {loading ? (
                <div className='w-100 vh-100 text-white d-flex flex-column align-items-center
                justify-content-center '>
                    <span className='mx-auto fs-4 fw-bold'>لطفا صبر کنید . . .</span>
                </div>
            ) : !isLogin ? (
                <div className='bg-white w-100  mx-auto' style={{borderRadius:15,maxWidth:550}}>
                    <Routes>
                    
                        <Route path='/auth/login' element={<Login/>} />

                        <Route path='/auth/register' element={<Register/>} />
                    
                    </Routes>
                </div>
            ) : (
                <Navigate to={'/'} />
            )}
        </>
    );
}

export default AuthLayout;
