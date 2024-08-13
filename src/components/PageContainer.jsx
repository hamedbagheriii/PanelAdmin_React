import React from 'react';

const PageContainer = ({title}) => {
    return (
        <div className='flex'>
            <h4 className="text-center my-3 text-white">{title}</h4>
        </div>
    );
}

export default PageContainer;
