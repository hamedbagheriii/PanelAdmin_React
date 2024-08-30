import { ErrorMessage, FastField } from 'formik';
import React from 'react';
import PersonalError from '../personalComponenet/personalError';

const Input = ({label , type , name , className , placeholder , inputLabel=true , required=false}) => {
    return (
        <div className={`col-12 mb-2 ${className}`}>
            <div className={` ${inputLabel ? 'input-group' : null} mb-2 dir_ltr`}>
                {required ?
                    <span className="input-group-text text-danger w_1rem h-100 text_wrap justify-content-center">اجباری</span>
                : null }
                <FastField name={name} type={type} className='form-control' id={name+`-id`} placeholder={placeholder} />
                {inputLabel ? 
                    <span className="input-group-text w_7rem h-100 text_wrap justify-content-center">{label}</span>
                : null}
            </div>
            <ErrorMessage className='border' name={name} component={PersonalError} /> 
        </div>
    );
}

export default Input;
