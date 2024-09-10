import { ErrorMessage, FastField, Field } from 'formik';
import React, { useState } from 'react';
import PersonalError from '../personalComponenet/personalError';

const Input = ({label , type , name , className , placeholder , inputLabel=true , required=false
    , password=false}) => {
    const [showPassword , setShowPassword] = useState(false);
        

    return (
        <div className={`col-12 mb-2 ${className}`}>
            <div className={` ${inputLabel ? 'input-group' : null} mb-2 dir_ltr`}>
                {required ?
                    <span className="input-group-text text-danger w_1rem h-100 text_wrap justify-content-center">اجباری</span>
                : null }
                {password ?
                    <span className="input-group-text text-danger pointer w_1rem h-100
                    text_wrap justify-content-center" onClick={()=>setShowPassword(!showPassword)}>
                        <span className='d-flex w-100 align-items-center py-1 '>
                            <i className={`h-100 w-100 text-center ${showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}`}></i>
                        </span>
                    </span>
                : null }
                <Field name={name} type={showPassword ? 'text' : type} className='form-control' id={name+`-id`} placeholder={placeholder} />
                {inputLabel ? 
                    <span className="input-group-text w_7rem h-100 text_wrap justify-content-center">{label}</span>
                : null}
            </div>
            <ErrorMessage className='border' name={name} component={PersonalError} /> 
        </div>
    );
}

export default Input;
