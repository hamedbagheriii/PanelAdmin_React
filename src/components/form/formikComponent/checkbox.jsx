import { ErrorMessage, FastField, Field } from 'formik';
import React, { Fragment } from 'react';
import PersonalError from '../personalComponenet/personalError';

const Checkbox = ({label , name , id , options}) => {
    return (
        <div className={'form-check col-12 mx-auto  w-100 ps-0 h-100 mb-2 '}>
            <label htmlFor={id} className='form-check-label d-block'>{label} :</label>
            <hr className='w-75  pt-1' />
            <Field className='form-control' name={name} id={id} >
                {({field})=>{
                    return(
                        options.map(i=>(
                            <div className='col-12 mx-auto rounded-2 col-md-5 my-2 m-md-2 border py-1 pt-2 d-inline-block' key={i.id}>
                                <input type="checkbox" checked={field.value.includes(''+i.id)} id={`${name}_${i.id}`} className='me-3 ' {...field}
                                value={i.id}   />
                                <label className='pe-1' htmlFor={`${name}_${i.id}`}>{i.title}</label>
                            </div>
                        ))
                    )
                }}
            </Field>
            <ErrorMessage name={name} component={PersonalError} />
        </div>
    );
}

export default Checkbox;