import React from 'react';

const Dashbord = () => {
    return (
        <>
            <li className="py-1 text-start pe-4 sidebar_menu_item mt-2 active" data-section-id="dashboard_section" >
                <i className="ms-3 icon pe-2 fas fa-tachometer-alt text-light"></i>
                <span className="hiddenable no_wrap font_08">داشبورد</span>
            </li>
        </>
    );
}

export default Dashbord;
