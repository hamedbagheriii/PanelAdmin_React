import React, { useEffect, useState } from 'react';
import ModalsContainer from '../../../components/ModalsContainer';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ErrorMessage, Form, Formik } from 'formik';
import SubmitBTN from '../../../components/form/SubmitBTN';
import FormikControl from '../../../components/form/FormikControl';
import PersonalError from '../../../components/form/personalComponenet/personalError';
import { getAllRolesService } from '../../../services/Users/role/roles';
import { initialValues, onSubmit, validationSchema } from './core';

const AddUser = () => {
    const navigate = useNavigate();
    const [mainRoles , setMainRoles] = useState([]);
    const {handleGetUsers} = useOutletContext()





    // This is for get Roles
    const handleGetRoles = async ()=>{
        try {
            const res = await getAllRolesService();
            if (res.status == 200) {
                setMainRoles(res.data.data.map(s=>{return {id : s.id , value : s.title}}));
            }
        } catch (error) {
            // set error in httpService
        }
    }






    // This is for calling get Roles function
    useEffect(() => {
        handleGetRoles();
    }, []);

    // initalProps
    const gender = [
        {id : 0 , value : 'خانم'},
        {id : 1 , value : 'آقا'},
    ]
    // initalProps

    return (
        <ModalsContainer
        className='show d-block animate__animated animate__fadeInDown animate__fast'
        id={'add_user_modal'}
        fullscreen={true}
        title={'افزودن کاربر'}
        closeFunction={()=>navigate(-1)}
        >
            <Formik 
            initialValues={initialValues}
            onSubmit={(values,submitProps)=>onSubmit(values , submitProps , navigate , handleGetUsers)}
            validationSchema={validationSchema}
            validateOnMount
            >
                {(formik)=>{
                    return (
                        <Form className="container">
                            <div className="row justify-content-center">

                                <FormikControl 
                                control='input'
                                label='نام کاربری'
                                type='text'
                                placeholder="فقط از حروف استفاده شود ."
                                name='user_name'
                                required={true}
                                />
                          
                                <FormikControl 
                                control='input'
                                label='نام'
                                type='text'
                                placeholder="فقط از حروف استفاده شود ."
                                name='first_name'
                                required={true}
                                />
                                
                                <FormikControl 
                                control='input'
                                label='نام خانوادگی'
                                type='text'
                                placeholder="فقط از حروف استفاده شود ."
                                name='last_name'
                                required={true}
                                />      

                                <FormikControl 
                                control='input'
                                label='کد ملی'
                                type='number'
                                placeholder="فقط از عدد استفاده شود ."
                                name='national_code'
                                required={true}
                                />   

                                <FormikControl 
                                control='input'
                                label='شماره موبایل'
                                type='number'
                                placeholder="فقط از عدد استفاده شود ."
                                name='phone'
                                required={true}
                                />   

                                <FormikControl 
                                control='input'
                                label='ایمیل'
                                type='text'
                                placeholder="فقط فرمت ایمیل (email@yourhost.com) استفاده شود ."
                                name='email'
                                required={true}
                                />

                                <FormikControl 
                                control='input'
                                label='رمز عبور'
                                type='text'
                                placeholder="حداقل 6 کاراکتر بنویسید ."
                                name='password'
                                required={true}
                                />

                                <FormikControl 
                                 control='date'
                                 name='birth_date'
                                 label='تاریخ تولد'
                                 required={true}
                                 formik={formik}
                                 initialDate={undefined}
                                />
                                <div>
                                    <ErrorMessage className='border' name={'birth_date'}
                                    component={PersonalError} />
                                </div>

                                <FormikControl 
                                control='select'
                                options={gender}
                                name='gender'
                                label='جنسیت'
                                firstItem='جنسیت را انتخاب کنید . . .'
                                required={true}
                                />

                                <div className='w-100' style={{height:350}}>
                                <FormikControl 
                                    control='searchableSelect'
                                    options={mainRoles}
                                    label={'نقش ها'}
                                    formik={formik}
                                    name={'roles_id'}
                                    firstItem=' نقش ها را انتخاب کنید . . .'
                                    required={true}
                                    resultType={'array'}
                                    />
                                </div>

                            </div>

                            <SubmitBTN formik={formik} closeModal={true}  />
                        </Form>
                    )
                }}
            </Formik>
        </ModalsContainer>
    );
}

export default AddUser;
