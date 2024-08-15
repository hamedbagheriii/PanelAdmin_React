import React from 'react';
import PageContainer from '../../../components/PageContainer';
import CommentsTable from './CommentsTable';



const Comments = () => {
    return (
        <div id="manage_comments_section" className="manage_comments_section main_section ">
            {/* --- page header --- */}
            <PageContainer title={'مدیریت نظرات'} />
            
            {/* --- page table --- */}
            <CommentsTable/>

        </div>
    );
}

export default Comments;
