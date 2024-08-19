import React, { useEffect, useState } from 'react';
import {FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';
import AuthFormikControl from '../../../components/authForm/AuthFormikControl';
import axios from 'axios';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from '../../../utils/alert';
import { loginService } from '../../../services/auth';

// ============== initial props ===============
const initialValues = {
    phone : "" ,
    password : "" ,
    remember : false ,
}

const onSubmit = async (values , submitProps , navigate)=>{
    try {
        const res = await loginService(values);

        if (res.status === 200) {
            Alert('با موفقیت وارد شدید .' , '' , 'success')
            localStorage.setItem('loginToken',JSON.stringify(res.data));
            if (values.remember) {
                localStorage.setItem('rememberData',JSON.stringify({...values}));                
            }
            else{
                localStorage.removeItem('rememberData');
            }
            submitProps.resetForm();
            navigate('/')
        }else{
            Alert('یک مشکل به وجود آمده است .' ,
            `${res.data.message || res.data.phone[0]}`
            , 'error')
        }
        submitProps.setSubmitting(false);
    }
    catch (err) {
        Alert('یک مشکل به وجود آمده است .' , `${err.data[0]}` , 'error')
        submitProps.setSubmitting(false);
    }
}

const validationSchema = Yup.object({
    phone : Yup.number().required('لطفا مقداری بنویسید .') ,
    password : Yup.string().required('لطفا مقداری بنویسید .').min(4,'حداقل 4 کاراکتر وارد کنید .') ,
    remember : Yup.boolean() ,
})
// ============== initial props ===============


const Login = () => {
    // remData : remember Data
    const [remData , setRemData] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const LocalData = JSON.parse(localStorage.getItem('rememberData'));
        if (LocalData) {
            setRemData(LocalData);
        }
    }, []);

    return (
        <>
            <div className='header w-75 mx-auto pt-5 d-flex flex-column border-bottom border-1 pb-4 '>
                <i className='fa fa-user text-primary mx-auto' style={{fontSize:90}}></i>
                <span className='mx-auto mt-4 fs-4 fw-bold'>ورود به پنل</span>
            </div>
            <Formik
             initialValues={remData || initialValues}
             onSubmit={(values , submitProps)=>onSubmit(values , submitProps , navigate)}
             validationSchema={validationSchema}
             enableReinitialize
             validateOnMount
            >
                {formik=>{
                    return(
                        <Form className='w-100 px-4 pt-1 pb-4 mt-2'>
                            
                            <AuthFormikControl type='text' name='phone' control='input' label='شماره موبایل' />
                            
                            <AuthFormikControl type='password' name='password' control='input' label='رمز عبور' />              

                            <AuthFormikControl type='checkbox' name='remember' control='switch' label='مرا به خاطر بسپار' />              


                            <div className='d-flex w-100 mt-5'>
                                <button className='btn btn-primary w-50 mx-auto' disabled={!formik.isValid || formik.isSubmitting}>
                                    {formik.isSubmitting ?
                                        <div className="spinner-border text-light mt-1" style={{width:20,height:20}}>
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    : 'ورود به حساب' }
                                </button>
                            </div>
                            <div className='d-flex w-100 mt-4 mb-1'>
                                <Link to={'/auth/register'} className='mx-auto text-dark fw-bold' style={{fontSize:14,textDecoration:'none'}}>
                                    حساب کاربری ندارید ؟ <span className='text-primary'>ثبت نام . . .</span>
                                </Link>
                            </div>
                        </Form>
                    )
                }}
            </Formik>   
        </>
    );
}

export default Login;
