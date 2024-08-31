import React from 'react';
import SpinnerLoad from './SpinnerLoad';

const LoadingAlert = ({bgColor='primary' , isSmall=false , title=null , spinner=true , children=null}) => {
    return (
        <div className={`w-100 fs-6 fw-bold alert text-center alert-${bgColor}`} >
            {spinner ? 
                <SpinnerLoad isSmall={isSmall ? true : false} />
            : null}
            <span className='fs-5 mt-1'>
                {title || 'لطفا کمی صبر کنید . . .'}
            </span>
            {children}
        </div>
    );
}

export default LoadingAlert;
