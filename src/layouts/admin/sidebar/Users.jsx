import React from 'react';
import Li from '../../../UI/LI/Li';

const Users = () => {
    return (
        <>
            <li className="py-1 text-start d-flex justify-content-center no_pointer no_hover ">
                <span className="hiddenable no_wrap group_sidebar_title ">کاربران و همکاران</span>
            </li>
            
            <Li text={'مشاهده کاربران'} id={'manage_user_section'} icon={'fas fa-users'} />

            <Li text={'نقش ها'} id={'manage_role_section'} icon={'fas fa-user-tag'} />

            <Li text={'مجوز ها'} id={'manage_permission_section'} icon={'fas fa-shield-alt'} />
            
        </>
    );
}

export default Users;
