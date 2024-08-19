import React, { useContext } from 'react';
import { adminContext } from '../../../context/adminLayoutContext';
import { Link } from 'react-router-dom';

const RightContent = () => {
    const {showSlidebar , setShowSlidebar , showSlidebarSM , setShowSlidebarSM} = useContext(adminContext)

    return (
        <div className="right_content h-100 py-1 bg-dark">
            <Link className="navbar-brand h-100" to={"/"}>
                <img src="/assets/images/logo.png" className="h-100" />
            </Link>
            <div className={`form-check form-switch mx-4 d-flex justify-content-between
             w-100 ${!showSlidebar ? 'd-none' : null} d-md-flex`}>
                <label htmlFor="handle_toggle_sidemenu ">قفل</label>
                <input id="handle_toggle_sidemenu" className="form-check-input pointer mx-1"
                type="checkbox" onChange={(e)=>setShowSlidebar(e.target.checked)} />
                <label htmlFor="handle_toggle_sidemenu ">باز</label>
            </div>
            <div className='d-md-none d-flex h-100 px-3 align-items-center justify-content-center'>
                <i className={`${!showSlidebarSM ? 'fas fa-bars' : 'bi bi-x-lg mt-2'} pointer`}
                 onClick={()=>setShowSlidebarSM(!showSlidebarSM)}></i>
            </div>
        </div>
    );
}

export default RightContent;
