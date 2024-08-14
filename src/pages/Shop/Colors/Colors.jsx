import React from 'react';
import PageContainer from '../../../components/PageContainer';
import ColorsTable from './ColorsTable';

const Colors = () => {
    return (
        <div id="manage_color_section" className="add_color_section main_section ">

            <PageContainer title={'مدیریت رنگ ها'} />            

            <ColorsTable/>
        </div>
    );
}

export default Colors;
