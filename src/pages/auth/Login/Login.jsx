import React from 'react';
import {FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';
import AuthFormikControl from '../../../components/authForm/formikComponent/AuthFormikControl';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

// ============== initial props ===============
const initialValues = {
    phone : "" ,
    password : "" ,
    remember : false ,
}

const onSubmit = (values , submitProps , navigate)=>{
    axios.post('https://ecomadminapi.azhadev.ir/api/auth/login' , {
        ...values ,
        remember :values.remember ? 1 : 0
    }).then(res=>{
        console.log(res);
        if (res.status === 200) {
            swal('با موفقیت وارد شدید .');
            localStorage.setItem('loginToken',JSON.stringify(res.data));
            navigate('/')
        }else{
            swal(res.data.message || res.data.phone[0])
        }
    }).catch(err=>{
        console.log(err.data[0]);
        swal('مشکل در اتصال به سرور .')
    })
    

    setTimeout(() => {
        submitProps.resetForm();
        submitProps.setSubmitting(false);
    }, 3000);
}

const validationSchema = Yup.object({
    phone : Yup.number().required('لطفا مقداری بنویسید .') ,
    password : Yup.string().required('لطفا مقداری بنویسید .').min(4,'حداقل 4 کاراکتر وارد کنید .') ,
    remember : Yup.boolean() ,
})
// ============== initial props ===============


const Login = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className='header w-75 mx-auto pt-5 d-flex flex-column border-bottom border-1 pb-4 '>
                <i className='fa fa-user text-primary mx-auto' style={{fontSize:90}}></i>
                <span className='mx-auto mt-4 fs-4 fw-bold'>ورود به پنل</span>
            </div>
            <Formik
             initialValues={initialValues}
             onSubmit={(values , submitProps)=>onSubmit(values , submitProps , navigate)}
             validationSchema={validationSchema}
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
                            {/* <div className='d-flex w-100 mt-4 mb-1'>
                                <Link to={'/.....'} className='mx-auto text-dark fw-bold' style={{fontSize:14,textDecoration:'none'}}>
                                    حساب کاربری ندارید ؟ <span className='text-primary'>ثبت نام . . .</span>
                                </Link>
                            </div> */}
                        </Form>
                    )
                }}
            </Formik>   
        </>
    );
}

export default Login;
