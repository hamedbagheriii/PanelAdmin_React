import React from 'react';
import AdminLayout from './layouts/admin/AdminLayout';
import { BrowserRouter, useLocation } from 'react-router-dom';
import AuthLayout from './layouts/auth/AuthLayout';
import  './assets/style/bootstrap.min.css';
import  './assets/fontawesome/css/all.css';
import  './assets/style/style.css';
import Logout from './pages/auth/Logout/Logout';
import { Provider } from 'react-redux';
import store from './redux/store/store';


const App = ()=>{
    const location = useLocation();
    
    return (
        <Provider store={store}>
            <div className={` App  d-flex align-items-center justify-content-center`}>
                {location.pathname.includes('/auth') ?(
                    <AuthLayout/>
                ) : location.pathname.includes('/Logout') ? (
                    <Logout/>
                ) : 
                <AdminLayout/>
            }
            </div>
        </Provider>
    ) 
}


export default App;  