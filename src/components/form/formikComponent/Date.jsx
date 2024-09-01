import { ErrorMessage, FastField } from 'formik';
import React, { useEffect, useState } from 'react';
import jMoment, { max } from 'moment-jalaali';
import PersonalError from '../personalComponenet/personalError';


const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
const months = [
    {id : 1 , value : 'فروردین'},
    {id : 2 , value : 'اردیبهشت'},
    {id : 3 , value : 'خرداد'},
    {id : 4 , value : 'تیر'},
    {id : 5 , value : 'مرداد'},
    {id : 6 , value : 'شهریور'},
    {id : 7 , value : 'مهر'},
    {id : 8 , value : 'آذر'},
    {id : 9 , value : 'آبان'},
    {id : 10 , value : 'دی'},
    {id : 11 , value : 'بهمن'},
    {id : 12 , value : 'اسفند'},
]

const Date = ({formik,name,label,required,yearsLimit,initialDate}) => {
    const [day , setDay] = useState();
    const [month , setMonth] = useState();
    const [year , setYear] = useState();
    const [years , setYears] = useState();
    const [showConfig , setShowConfig] = useState(false);


    useEffect(() => {
        let now = jMoment(initialDate)

        setDay(now.jDate());

        setMonth(now.jMonth()+1);

        setYear(now.jYear());
    }, []);


    const handleShowDateConfig =()=>{
        // get now years =>
        let arr = []
        for (let i = year-(yearsLimit?.from || 20) ; i <= year+(yearsLimit?.to || 20) ; i++) {
            arr = [...arr , i]
        }
        setYears(arr)

        setShowConfig(true);
    }

    const handleSetInputDate =(e)=>{
        e.stopPropagation();
        // set value =>
        formik.setValues({...formik.values , [name] : `${day} / ${month} / ${year}` })
        setShowConfig(false);
    }


    return (
        <div style={{position:'relative'}} className='w-100 h-100'>
            <div className="input-group mb-2 dir_ltr" >
                {required ?
                    <span className="input-group-text w_1rem text_wrap justify-content-center">اجباری</span>
                : null }
                {/* ========= select ========= */}
                    <div className={`form-control select_search  pointer`}
                    onClick={handleShowDateConfig} style={{overflowX:'hidden'}}>
                        <span className='pointer w-100 h-100' style={{textWrap:'nowrap',fontSize:14}}>{formik.values[name] || 'جهت انتخاب تاریخ کلیک کنید .'}</span>
                    </div>
                {/* ========= select ========= */}
                <span className="input-group-text w_7rem text_wrap justify-content-center">{label}</span>
            </div>
            {showConfig ?
                <div className={`bg-dark text-white w-100 select_Data_content mx-auto p-0
                ${showConfig ? 'd-flex' : 'd-none'}`}>
                    <ul className='list-unstyled w-100 p-0'>
                        <li className='mb-2 row w-100 m-0 p-0 pt-2 text-primary'>
                            <div className='col-3 mx-auto border-0 d-flex justify-content-center align-items-center  p-0' >
                                <select className='form-select bg-dark text-primary border-0' value={day} onChange={(e)=>setDay(e.target.value)}>
                                   {days.map(d=>(
                                       <option value={d} key={d} >{d}</option>
                                   ))}
                                </select>
                            </div>
                            <div className='col-3 mx-auto d-flex justify-content-center align-items-center  p-0'>
                                <select className='form-select bg-dark border-0 text-primary ' value={month} onChange={(e)=>setMonth(e.target.value)}>
                                   {months.map(m=>(
                                       <option value={m.id} key={m.id} >{m.value}</option>
                                   ))}
                                </select>
                            </div>
                            <div className='col-3 mx-auto d-flex justify-content-center align-items-center  p-0'>
                                <select className='form-select bg-dark border-0 text-primary ' value={year} onChange={(e)=>setYear(e.target.value)}>
                                   {years.map(y=>(
                                       <option value={y} key={y} >{y}</option>
                                   ))}
                                </select>
                            </div>
                        </li>
                        <li className='mt-0 d-flex align-items-center flex-column justify-content-center '>
                            <hr className='w-100 p-0 m-0 mb-3 mx-auto bg-white mx-auto' />
                            <button type='button' className='btn btn-success px-3 py-1'
                            onClick={handleSetInputDate} >تایید</button>
                        </li>
                    </ul>
                </div>
            : null}
        </div>
    );
}

export default Date;