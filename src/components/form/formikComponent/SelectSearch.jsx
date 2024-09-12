import { ErrorMessage, Field } from 'formik';
import React from 'react';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css';
import PersonalError from '../personalComponenet/personalError';


const SelectSearch1 = ({label , name , onChange , className , placeholder='محصول' , inputLabel=true , required=false
    , disabled=false , options , isSearch}) => {
    return (
        <div className={`col-12 mb-2 ${className}`}>
            <div className={`row p-0 d-flex mx-auto w-100 input-group mb-2 dir_ltr`}>
                {required ?
                    <span className="input-group-text input_required text-danger col-2 text_wrap justify-content-center">اجباری</span>
                : null }
                <Field name={name}>
                    {(formik)=>{
                        return (
                            <div className='col-8 d-flex p-0  input_dark'>
                            <SelectSearch options={options} search={isSearch}
                            placeholder={`${placeholder} مورد نظر را انتخاب کنید ...`}
                            onChange={onChange} disabled={disabled} />
                            </div>
                        )
                    }}
                </Field>
                {inputLabel ? 
                    <span className="input-group-text col-2  h-100 text_wrap justify-content-center">{label}</span>
                : null}
            </div>
            <ErrorMessage className='border' name={name} component={PersonalError} /> 
        </div>
    );
}

export default SelectSearch1;
