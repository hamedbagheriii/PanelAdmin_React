import { ErrorMessage, FastField } from 'formik';
import React from 'react';
import PersonalError from '../personalComponenet/personalError';

const Textarea = ({name, label, className, placeholder , required=null}) => {
    return (
        <div className={`col-12 mb-2 ${className}`}>
            <div className="input-group mb-2 dir_ltr">
                {required ?
                    <span className="input-group-text text-danger w_1rem text_wrap justify-content-center">اجباری</span>
                : null }
                <FastField as="textarea" name={name} className="form-control" placeholder={placeholder} />
                <span className="input-group-text w_7rem text_wrap justify-content-center"> {label} </span>
            </div>
            <ErrorMessage name={name} className='border' component={PersonalError}/>
        </div>
    );
}

export default Textarea;