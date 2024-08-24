import { ErrorMessage, FastField } from 'formik';
import React from 'react';
import PersonalError from '../personalComponenet/personalError';

const Input = ({label , type , name , className , placeholder , inputBTN=true}) => {
    return (
        <div className={`col-12 mb-2 ${className}`}>
            <div className={` ${inputBTN ? 'input-group' : null} mb-2 dir_ltr`}>
                <FastField name={name} type={type} className='form-control' id={name+`-id`} placeholder={placeholder} />
                {inputBTN ? 
                    <span className="input-group-text h-100 justify-content-center">{label}</span>
                : null}
            </div>
            <ErrorMessage className='border' name={name} component={PersonalError} /> 
        </div>
    );
}

export default Input;
