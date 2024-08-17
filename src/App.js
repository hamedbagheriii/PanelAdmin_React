import React from 'react';
import AdminLayout from './layouts/admin/AdminLayout';
import { BrowserRouter, useLocation } from 'react-router-dom';
import AuthLayout from './layouts/auth/AuthLayout';
import  './assets/style/bootstrap.min.css';
import  './assets/fontawesome/css/all.css';
import  './assets/style/style.css';


const App = ()=>{
    // دسترسی به مقادیر روت صفحه
    const location = useLocation();
    
    return (
        <div className={` App  d-flex align-items-center justify-content-center`}>
            
            {location.pathname.includes('/auth') ?(
                <AuthLayout/>
            ) :
                <AdminLayout/>
            }

        </div>
    ) 
}


export default App;  