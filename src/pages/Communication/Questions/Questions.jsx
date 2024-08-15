import React from 'react';
import PageContainer from '../../../components/PageContainer';
import QuestionsTable from './QuestionsTable';


const Questions = () => {
    return (
        <div id="manage_question_section" className="manage_question_section main_section ">
            {/* --- page header --- */}
            <PageContainer title={'مدیریت سوال ها'} />
            
            {/* --- page table --- */}
            <QuestionsTable/>

        </div>
    );
}

export default Questions;
