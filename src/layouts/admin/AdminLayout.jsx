import React from 'react';
import IndexNavbar from './navbar/IndexNavbar';
import IndexSidebar from './sidebar/IndexSidebar';
import IndexContent from './content/IndexContent';
import AdminContextContainer from '../../context/adminLayoutContext';
import { Link, Navigate} from 'react-router-dom';
import { useInLogin } from '../../hook/authHook';
import { useSelector } from 'react-redux';


const AdminLayout = () => {

    const {isLogin , loading , isAdmin} = useInLogin();


    return (
        <AdminContextContainer>
            {loading ? (
                <div className='w-100 vh-100 text-white d-flex flex-column align-items-center
                justify-content-center '>
                    <span className='mx-auto mb-5 fs-3 fw-bold'>در حال انتقال به <span className='text-primary'>پنل</span></span>
                    <span className='mx-auto fs-4 fw-bold'>لطفا صبر کنید . . .</span>
                </div>
            ) : isLogin && isAdmin ? (
                <div>
                    <IndexContent/>
                    <IndexNavbar/>
                    <IndexSidebar/>
                </div>
            ) : isLogin && !isAdmin ? (
                <div className='w-100 d-flex flex-column bg-Error'>
                    <span className='mx-auto fw-bold text-danger' style={{fontSize:100}}>404</span>
                    <span className='mx-auto mb-3 fs-2 fw-bold text-white'>کاربر گرامی</span>
                    <span className='mx-auto mb-3 fs-5 w-75 text-center fw-bold text-primary'>با عرض پوزش از شما ، پنل کاربران در حال توسعه میباشد .</span>
                    <span className='mx-auto mb-3 fs-5 w-100 mt-1 text-center fw-bold text-primary'>از <span className='text-white'>صبر و شکیبایی</span> شما متشکریم .</span>
                    <hr className='bg-white w-75 mx-auto'/>
                    <Link to={'/Logout'} className='mx-auto fs-6 mt-3 btn btn-outline-danger text-center fw-bold '>
                        خروج از حساب . . .
                    </Link>
                </div>
            ) : (
                <Navigate to={'/auth/login'}/>
            )}
        </AdminContextContainer>
    );
}

export default AdminLayout;
