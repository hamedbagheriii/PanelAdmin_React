import React from 'react';
import IndexNavbar from './navbar/IndexNavbar';
import IndexSidebar from './sidebar/IndexSidebar';
import IndexContent from './content/IndexContent';

const Index = () => {
    return (
        <div>
            <IndexNavbar/>
            <IndexSidebar/>
            <IndexContent/>
        </div>
    );
}

export default Index;
