import React from 'react';
import PageContainer from '../../../components/PageContainer';
import GuarantiesTable from './GuarantiesTable';

const Guaranties = () => {
    return (
        <div id="manage_guarantee_section" className="manage_guarantee_section main_section">
            <PageContainer title={'مدیریت گارانتی ها'} />            

            <GuarantiesTable />
        </div>
    );
}

export default Guaranties;
