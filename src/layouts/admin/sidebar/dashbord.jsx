import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashbord = () => {
    return (
        <>
            <NavLink to={'/Dashboard'}  className={`py-1 text-start pe-4 sidebar_menu_item mt-2 `}  >
                <i className="ms-3 icon pe-2 fas fa-tachometer-alt text-light"></i>
                <span className="hiddenable no_wrap font_08">داشبورد</span>
            </NavLink>
        </>
    );
}

export default Dashbord;
