import React, { useContext } from 'react';
import { adminContext } from '../../../context/adminLayoutContext';
import Dashboard from '../../../pages/Dashboard/Dashboard';

const IndexContent = () => {
    const {showSlidebar} = useContext(adminContext)
    

    return (
        <section id="content_section" className={` py-2 px-3
        ${showSlidebar ? 'with_sidebar' : null}`}>
            
            <Dashboard/>

        </section>
    );
}

export default IndexContent;
