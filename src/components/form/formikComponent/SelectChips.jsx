import React, { useState } from 'react';
import LoadingAlert from '../../../UI/All/LoadingAlert';
import {Field } from 'formik';

const SelectChips = ({options , name , label , firstItem , chipsName='دسته' ,
    className , formik , resultType='string'}) => {
    const [selectedArray , setSelectedArray] = useState([]);

    // this is for set selected handleSelectItem
    const handleSelectItem = (value , formik)=>{
        if (value > 0) {
            setSelectedArray(prevState=>{
                if (prevState.findIndex(d=>d.id == value) == -1) {
                    const newData = [...prevState , options.filter(i=>i.id == value)[0]];
                    
                    const selectedIds = newData.map(s=>s.id);
                    const nameValue = resultType == 'string' ? selectedIds.join('-') : selectedIds ;
                    formik.setFieldValue(name , nameValue)
                    
                    return newData;
                }
                else{
                    return prevState;
                }
            })
        }
    }


    // this is for delede selected itme
    const handleDeleteSelected = (itemId , formik)=>{
        setSelectedArray(prevState=>{
            let newData = prevState.filter(i=>i.id !== itemId)

            const selectedIds = newData.map(s=>s.id)
            const nameValue = resultType == 'string' ? selectedIds.join('-') : selectedIds ;
            formik.setFieldValue(name , nameValue)

            return newData;
        })
    }


    return (
        <>
            {options == 'waiting' ?
                <div className='w-100 '>
                    <LoadingAlert />
                </div>
            : options !== null  ?
                <div className="col-12 ">
                    <div className={`col-12 mb-2 ${className}`}>
                        <div className="input-group mb-2 dir_ltr" >
                            <Field component='select' className='form-control' id={name+'-select'}
                            onChange={(e)=>handleSelectItem(e.target.value , formik)} name={name+'-select'}> 
                                <option value=" ">{firstItem}</option>
                                {
                                    options.map((i)=>(
                                        <option key={i.id} value={i.id}>{i.value}</option>
                                    ))
                                }
                            </Field>
                            <span className="input-group-text w_7rem text_wrap justify-content-center">{label}</span>
                        </div>
                    </div>
                    
                    {selectedArray.length ?
                        <div className="col-12 mt-4 d-flex flex-wrap gap-2">
                            {selectedArray.map(item=>(
                                <span key={item.id} className="chips_elem bg-primary text-white text-center">
                                    <i className="fas fa-times ms-2 text-danger"
                                    onClick={()=>handleDeleteSelected(item.id , formik)}></i>
                                    {chipsName} {item.value}
                                </span>
                            ))}
                        </div>
                    : null}
                </div>  
            : null }   
        </>
    );
}

export default SelectChips;
