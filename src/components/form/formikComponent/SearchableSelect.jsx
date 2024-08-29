import React, { useEffect, useRef, useState } from 'react';
import LoadingAlert from '../../../UI/All/LoadingAlert';
import { Field } from 'formik';
import SpinnerLoad from '../../../UI/All/SpinnerLoad';

const SearchableSelect = ({options , name , label , firstItem , chipsName='دسته' ,
    className , formik , resultType='string'}) => {

    const [selectedArray , setSelectedArray] = useState([]);
    const [copyOptions , setCopyOptions] = useState('waiting');
    const [isActive , setIsActive] = useState(false);
    const searchINP = useRef();

    // this is for set selected handleSelectItem
    const handleSelectItem = (value , formik)=>{
        setIsActive(false);
        setCopyOptions(options);
        searchINP.current.value='';

        if (value > 0 && selectedArray.findIndex(d=>d.id == value) == -1) {
                const newData = [...selectedArray , options.filter(i=>i.id == value)[0]];
                setSelectedArray(newData)
                
                const selectedIds = newData.map(s=>s.id);
                const nameValue = resultType == 'string' ? selectedIds.join('-') : selectedIds ;

                formik.setFieldValue(name , nameValue)
        }
    }



    // this is for delede selected itme
    const handleDeleteSelected = (itemId , formik)=>{
        let newData = selectedArray.filter(i=>i.id !== itemId)
        setSelectedArray(newData)

        const selectedIds = newData.map(s=>s.id)
        const nameValue = resultType == 'string' ? selectedIds.join('-') : selectedIds ;
        formik.setFieldValue(name , nameValue)
    }


    // this is for search itme
    let interval = null;
    const handleSetSearch = (target)=>{
        clearTimeout(interval);
        interval = setTimeout(() => {
            setCopyOptions(options.filter(d=>d.value.includes(target)))
        }, 500);
    }

    useEffect(() => {
        setCopyOptions(options);
        setIsActive(false);
    }, [options]);


    // this is for remove active for click in body
    useEffect(() => {
        document.body.addEventListener('click',()=>{
            setIsActive(false)
        })
    }, []);

    return (
        <Field>
            {({form})=>{
                return (
                    <>
                        {options == 'waiting' ?
                            <div className='w-100 '>
                                <LoadingAlert />
                            </div>
                        : options !== null  ?
                            <div className="col-12 ">
                                <div className={`col-12 mb-2 ${className}`} style={{position:'relative'}}>
                                    <div className="input-group mb-2 dir_ltr" >
                                        {/* select */}
                                        <div className={`form-control select_search pointer ${isActive ? 'border-primary' : ''}`}
                                        onClick={(e)=>{
                                            e.stopPropagation();
                                            setIsActive(!isActive)}
                                        }>
                                            <span className='pointer'>{firstItem}</span>
                                        </div>
                                        {/* select */}
                                        <span className="input-group-text w_6rem justify-content-center">{label}</span>
                                    </div>
                                    <div className={`bg-dark text-white w-100 select_search_content
                                    ${isActive ? 'd-flex' : 'd-none'}`} onClick={(e)=>e.stopPropagation()}>
                                        <ul className='list-unstyled w-100 p-0'>
                                            <li className='mb-2'>
                                                <input type="text" ref={searchINP} className='form-control border-0 border-bottom 
                                                rounded-0 mt-1 pb-2' placeholder='قسمتی از عنوان را جستجو کنید . . . ' 
                                                onChange={(e)=>handleSetSearch(e.target.value)}/>
                                            </li>
                                            {copyOptions == 'waiting' ?
                                                <SpinnerLoad />
                                            : copyOptions.length ?
                                                copyOptions.map(i=>(
                                                    <li key={i.id} className='py-1 mt-1 pe-3' onClick={()=>handleSelectItem(i.id,form)}>
                                                        {i.value}
                                                    </li>
                                                ))
                                            : 
                                                <div className='text-center mt-3 w-100 py-2 bg-primary'>آیتمی یافت نشد .</div>
                                            }
                                        </ul>
                                    </div>
                                </div>
                                        
                                {selectedArray.length ?
                                    <div className="col-12 mt-3 mb-2 d-flex flex-wrap gap-2">
                                        {selectedArray.map(item=>(
                                            <span key={item.id} className="chips_elem bg-primary text-white text-center">
                                                <i className="fas fa-times ms-2 text-danger"
                                                onClick={()=>handleDeleteSelected(item.id , form)}></i>
                                                {chipsName} {item.value}
                                            </span>
                                        ))}
                                    </div>
                                : null}
                            </div>  
                        : null }  
                    </>
                )
            }} 
        </Field>
    );

}

export default SearchableSelect;
