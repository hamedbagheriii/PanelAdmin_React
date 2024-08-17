import React from 'react';
import Login from '../../pages/auth/Login/Login';
import { Route, Routes } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className='bg-white w-100  mx-auto' style={{borderRadius:15,maxWidth:550}}>
            <Routes>
                
                <Route path='/Login' element={<Login/>} />
                
                <Route path='*' element={<Login/>} />
                
            </Routes>
        </div>
    );
}

export default AuthLayout;
