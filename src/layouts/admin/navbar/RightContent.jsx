import React, { useContext } from 'react';
import { adminContext } from '../../../context/adminLayoutContext';

const RightContent = () => {
    const {showSlidebar , setShowSlidebar} = useContext(adminContext)

    return (
        <div className="right_content h-100 py-1 bg-dark">
            <a className="navbar-brand h-100" href="/">
                <img src="/assets/images/logo.png" className="h-100" />
            </a>
            <div className={`form-check form-switch mx-4 d-flex justify-content-between
             w-100 ${!showSlidebar ? 'd-none' : null} d-md-flex`}>
                <label htmlFor="handle_toggle_sidemenu ">قفل</label>
                <input id="handle_toggle_sidemenu" className="form-check-input pointer mx-1"
                type="checkbox" onChange={(e)=>setShowSlidebar(e.target.checked)} />
                <label htmlFor="handle_toggle_sidemenu ">باز</label>
            </div>
        </div>
    );
}

export default RightContent;
