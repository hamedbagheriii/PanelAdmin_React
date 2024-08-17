import React from 'react';
import AdminLayout from './layouts/admin/AdminLayout';
import { BrowserRouter } from 'react-router-dom';
import AuthLayout from './layouts/auth/AuthLayout';


const App = ()=>{


    
    return (
        <div className={` App  d-flex align-items-center justify-content-center`}>
            
                <AuthLayout/>

                {/* <AdminLayout/> */}
                
        </div>
    ) 
}


export default App;  