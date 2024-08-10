import React, { useContext } from 'react';
import { adminContext } from '../../../context/adminLayoutContext';

const IndexContent = () => {
    const {showSlidebar} = useContext(adminContext)


    return (
        <section id="content_section" className={`bg-light py-2 px-3 ${showSlidebar ? 'with_sidebar' : null}`}>

        </section>
    );
}

export default IndexContent;
