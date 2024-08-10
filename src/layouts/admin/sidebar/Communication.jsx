import React from 'react';
import Li from '../../../UI/LI/Li';

const Communication = () => {
    return (
        <>
            <li className="py-1 text-start d-flex justify-content-center no_pointer no_hover ">
                <span className="hiddenable no_wrap group_sidebar_title ">ارتباطات</span>
            </li>
            
            <Li text={'سوال ها'} id={'manage_question_section'} icon={'fas fa-question-circle'} />

            <Li text={'نظرات'} id={'manage_comments_section'} icon={'fas fa-comment'} />
            
        </>
    );
}

export default Communication;
