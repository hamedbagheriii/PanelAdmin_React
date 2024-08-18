import React from 'react';
import {FastField, Form, Formik } from 'formik';
import * as Yup from 'yup';
import AuthFormikControl from '../../../components/authForm/formikComponent/AuthFormikControl';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from '../../../utils/alert';
import { registerService } from '../../../services/auth';

// ============== initial props ===============
const initialValues = {
    phone : "" ,
    password : "" ,
    c_password : "" ,
}

const onSubmit = async (values , submitProps , navigate)=>{
    try {
        const res = await registerService(values);
        if (res.status === 200) {
            Alert('ثبت نام با موفقیت انجام شد .' , '' , 'success')
            localStorage.removeItem('loginToken');
            localStorage.removeItem('rememberData');
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
    c_password : Yup.string().required('لطفا مقداری بنویسید .').oneOf([Yup.ref('password' , '')] , 'پسرود ها مطابقت ندارند  .') ,
})
// ============== initial props ===============


const Register = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className='header w-75 mx-auto pt-5 d-flex flex-column border-bottom border-1 pb-4 '>
                <i className='fa fa-user text-primary mx-auto' style={{fontSize:90}}></i>
                <span className='mx-auto mt-4 fs-4 fw-bold'>ثبت نام</span>
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

                            <AuthFormikControl type='password' name='c_password' control='input' label='تکرار رمز عبور' />              


                            <div className='d-flex w-100 mt-5'>
                                <button className='btn btn-primary w-50 mx-auto' disabled={!formik.isValid || formik.isSubmitting}>
                                    {formik.isSubmitting ?
                                        <div className="spinner-border text-light mt-1" style={{width:20,height:20}}>
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    : 'ثبت نام' }
                                </button>
                            </div>
                            <div className='d-flex w-100 mt-4 mb-1'>
                                <Link to={'/auth/login'} className='mx-auto text-dark fw-bold' style={{fontSize:14,textDecoration:'none'}}>
                                    حساب کاربری دارد ؟ <span className='text-primary'>ورود به حساب . . .</span>
                                </Link>
                            </div>
                        </Form>
                    )
                }}
            </Formik>   
        </>
    );
}

export default Register;
