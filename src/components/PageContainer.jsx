import React from 'react';

const PageContainer = ({title , styleClass}) => {
    return (
        <div className='flex'>
            <h4 className={`text-center fw-bolder my-3 mb-4 ${styleClass}`} style={{color:'#fff'}}>{title}</h4>
        </div>
    );
}

export default PageContainer;
