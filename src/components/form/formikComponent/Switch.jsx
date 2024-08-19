import { ErrorMessage, FastField } from 'formik';
import React from 'react';
import PersonalError from '../personalComponenet/personalError';

const Switch = ({label , name }) => {
    return (
        <div className='mt-4 w-100 form-check form-switch d-flex  justify-content-around'>
            <label htmlFor={name+`-id`} className=' pb-2 pe-1 fw-bold'>{label} :</label>
            <FastField name={name} type={'checkbox'} className='form-check-input mb-2' id={name+`-id`} />
            <ErrorMessage name={name} component={PersonalError} /> 
        </div>
    );
}

export default Switch;
