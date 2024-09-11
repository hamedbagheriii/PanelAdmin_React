import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHasPermission } from '../../hook/permissionHook';

const SidebarLi = ({id , icon , text , targetPatch , ptitle=''}) => {
    const hasPermission = useHasPermission(ptitle)
    // شرط جدید :
    // در غیر این صورت هیچی برنمیگرداند
    return hasPermission && (
        <NavLink to={targetPatch} className={`py-1 text-start pe-4 sidebar_menu_item `} data-section-id={`${id}`}>
            <i className={`ms-3 icon pe-2 ${icon}  text-light`}></i>
            <span className="hiddenable no_wrap font_08">{text}</span>
        </NavLink>
    );
}

export default SidebarLi;