import React from 'react';
import SpinnerLoad from './SpinnerLoad';

const LoadingAlert = ({bgColor='primary' , isSmall=false}) => {
    return (
        <div className={`w-100 fs-6 fw-bold alert text-center alert-${bgColor}`} >
            <SpinnerLoad isSmall={isSmall ? true : false} />
            <span className='fs-5 mt-1'>
                لطفا کمی صبر کنید . . .
            </span>
        </div>
    );
}

export default LoadingAlert;
