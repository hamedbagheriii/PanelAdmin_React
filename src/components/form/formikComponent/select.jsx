import { ErrorMessage, FastField } from 'formik';
import React from 'react';
import PersonalError from '../personalComponenet/personalError';

const Select = ({label , name , className , options , firstItem , handleOnChange }) => {
    return (
        <div className={`col-12 mb-2 ${className}`}>
            <div className="input-group mb-2 dir_ltr" >
                <FastField >
                    {({form})=>{
                        return (
                            <FastField component='select' className='form-control' id={name} name={name}
                            onChange={handleOnChange ? (e)=>handleOnChange(e.target.value , form) : null}> 
                                <option value=" ">{firstItem}</option>
                                {
                                    options.map((i)=>(
                                        <option key={i.id} value={i.id}>{i.value}</option>
                                    ))
                                }
                            </FastField>
                        )
                    }}
                </FastField>
                <span className="input-group-text w_6rem justify-content-center">{label}</span>
            </div>
            <ErrorMessage name={name} component={PersonalError} />
        </div>
    );
}

export default Select;