import React from 'react';
import SidebarLi from '../../../UI/Sidebar/Li';

const Users = () => {
    return (
        <>
            <li className="py-1 text-start d-flex justify-content-center no_pointer no_hover ">
                <span className="hiddenable no_wrap group_sidebar_title ">کاربران و همکاران</span>
            </li>
            
            <SidebarLi text={'مشاهده کاربران'} id={'manage_user_section'} icon={'fas fa-users'} />

            <SidebarLi text={'نقش ها'} id={'manage_role_section'} icon={'fas fa-user-tag'} />

            <SidebarLi text={'مجوز ها'} id={'manage_permission_section'} icon={'fas fa-shield-alt'} />
            
        </>
    );
}

export default Users;
