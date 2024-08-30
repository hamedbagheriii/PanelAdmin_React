import { ErrorMessage, FastField, Field } from 'formik';
import React from 'react';
import PersonalError from '../personalComponenet/personalError';

const Select = ({label , name , className , options , firstItem , handleOnChange=null , required=false }) => {
    return (
        <div className={`col-12 mb-2 ${className}`}>
            <div className="input-group mb-2 dir_ltr" >
                {required ?
                    <span className="input-group-text text-danger w_1rem h-100 text_wrap justify-content-center">اجباری</span>
                : null }
                <Field >
                    {({form})=>{
                        return (
                            <Field component='select' className='form-control' id={name} name={name}
                            onChange={handleOnChange ? (e)=>handleOnChange(e.target.value , form) 
                            : (e)=>form.setFieldValue(name,e.target.value)}> 
                                <option value=" ">{firstItem}</option>
                                {
                                    options.map((i)=>(
                                        <option key={i.id} value={i.id}>{i.value}</option>
                                    ))
                                }
                            </Field>
                        )
                    }}
                </Field>
                <span className="input-group-text w_7rem text_wrap justify-content-center">{label}</span>
            </div>
            <ErrorMessage name={name} component={PersonalError} />
        </div>
    );
}

export default Select;