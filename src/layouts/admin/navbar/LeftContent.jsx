import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Confirm } from '../../../utils/confirm';
import { useSelector } from 'react-redux';

const LeftContent = () => {
    const navigate = useNavigate();
    const {user  , error} = useSelector((state)=>state.userReducer)

    const handleLogout = async ()=> {
        const res = await Confirm("آیا میخواهید از حساب خارج شوید ؟");
        if (res) {
            navigate('/Logout')
        }
    }

    return (
        <div className="left_content d-flex flex-row-reverse">
            <i className="fas fa-grip-vertical fa-2x me-3 pointer" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></i>
            <ul className="dropdown-menu mini_menu " aria-labelledby="dropdownMenuButton1">
                <li className="my-2"><span className="dropdown-item d-block text-center">
                {`${user.first_name || ''} ${user.last_name || user.user_name
                || user.phone}`} </span></li>
                <Link to={'/'} className="my-2 d-flex justify-content-center dropdown-item py-0 align-items-center px-2">
                    <i className="fas fa-tachometer-alt"></i>
                    <span className="dropdown-item w-100 d-flex justify-content-start" href="#">داشبورد</span>
                </Link>
                <Link to={'/'} className="my-2 d-flex justify-content-center dropdown-item py-0 align-items-center px-2">
                    <i className="fas fa-paper-plane"></i>
                    <span className="dropdown-item w-100 d-flex justify-content-start" href="#">تیکت ها</span>
                </Link>
                <Link to={'/'} className="my-2 d-flex justify-content-center dropdown-item align-items-center px-2">
                    <i className="fas fa-envelope"></i>
                    <span className="dropdown-item w-100 d-flex justify-content-start" href="#">پیام ها</span>
                </Link>
                <hr/>
                <Link onClick={handleLogout}  
                className="d-flex justify-content-center dropdown-item py-0 align-items-center px-2">
                    <i className="fas fa-power-off"></i>
                    <span className="dropdown-item w-100 d-flex justify-content-start" href="#">خروج</span>
                </Link>
            </ul>
            <i className="far fa-bell fa-2x mx-3 pointer position-relative">
                <span className="alarm_count">4</span>
            </i>
            <i className="fas fa-search fa-2x mx-3 pointer"></i>
        </div>
    );
}

export default LeftContent;
