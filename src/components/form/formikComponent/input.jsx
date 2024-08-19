import { ErrorMessage, FastField } from 'formik';
import React from 'react';
import PersonalError from '../personalComponenet/personalError';

const Input = ({label , type , name , className , placeholder}) => {
    return (
        <div className={`col-12 mb-2 ${className}`}>
            <div className='input-group mb-2 dir_ltr'>
                <FastField name={name} type={type} className='form-control' id={name+`-id`} placeholder={placeholder} />
                <span className="input-group-text h-100 w_6rem justify-content-center">{label}</span>
            </div>
            <ErrorMessage className='border' name={name} component={PersonalError} /> 
        </div>
    );
}

export default Input;
