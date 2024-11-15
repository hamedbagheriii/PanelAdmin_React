import React from 'react';
import SidebarLi from '../../../UI/Sidebar/Li';

const CommunicationSidebar = () => {
    return (
        <>
            <li className="py-1 text-start d-flex justify-content-center no_pointer no_hover ">
                <span className="hiddenable no_wrap group_sidebar_title ">ارتباطات</span>
            </li>
            
            <SidebarLi ptitle='read'  targetPatch={'/Questions'} text={'سوال ها'} id={'manage_question_section'} icon={'fas fa-question-circle'} />

            <SidebarLi ptitle='read'  targetPatch={'/Comments'} text={'نظرات'} id={'manage_comments_section'} icon={'fas fa-comment'} />
            
        </>
    );
}

export default CommunicationSidebar;
