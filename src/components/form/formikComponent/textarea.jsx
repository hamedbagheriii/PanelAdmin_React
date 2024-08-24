import { ErrorMessage, FastField } from 'formik';
import React from 'react';
import PersonalError from '../personalComponenet/personalError';

const Textarea = ({name, label, className, placeholder}) => {
    return (
        <div className={`col-12 mb-2 ${className}`}>
            <div className="input-group mb-2 dir_ltr">
                <FastField as="textarea" name={name} className="form-control" placeholder={placeholder} />
                <span className="input-group-text justify-content-center"> {label} </span>
            </div>
            <ErrorMessage name={name} className='border' component={PersonalError}/>
        </div>
    );
}

export default Textarea;