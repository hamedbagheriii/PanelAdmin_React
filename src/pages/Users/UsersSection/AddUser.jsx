import React, { useEffect, useState } from 'react';
import ModalsContainer from '../../../components/ModalsContainer';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { ErrorMessage, Form, Formik } from 'formik';
import SubmitBTN from '../../../components/form/SubmitBTN';
import FormikControl from '../../../components/form/FormikControl';
import PersonalError from '../../../components/form/personalComponenet/personalError';
import { getAllRolesService } from '../../../services/Users/role/roles';
import { initialValues, onSubmit, validationSchema } from './core';
import { getOneUserService } from '../../../services/Users/user/users';
import { convertDate } from '../../../utils/convertDate';

const AddUser = () => {
    const navigate = useNavigate();
    const locaion = useLocation()
    const [mainRoles , setMainRoles] = useState([]);
    const {handleGetUsers} = useOutletContext()
    const userID = locaion.state?.userID
    const [reinitalValues , setReinitalValues] = useState(null);
    const [editRoles , setEdutRoles] = useState([]);





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

    const handleSetToEdit = async ()=>{
        try {
            const res = await getOneUserService(userID);
            if (res.status == 200) {
                setReinitalValues({
                roles_id : res.data.data.roles?.map(s=> s.id) || [] ,
                birth_date : res.data.data.birth_date ? convertDate(res.data.data.birth_date) : '',
                user_name: res.data.data.user_name || '',
                first_name: res.data.data.first_name || '',
                last_name: res.data.data.last_name || '',
                phone: res.data.data.phone || '',
                national_code: res.data.data.national_code || '',
                email: res.data.data.email || '',
                password: '',
                gender: res.data.data.gender || 1,
                });
                setEdutRoles(res.data.data.roles?.map(s=>{return {id : s.id , value : s.title}}));
            }
        }
        catch (error) {
            // set error in httpService
        }
    }





    // This is for calling get Roles function
    useEffect(() => {
        handleGetRoles();
    }, []);

    // This is for calling get Roles function
    useEffect(() => {
        if (userID) {
           handleSetToEdit()
        }
    }, [userID]);

    
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
            initialValues={reinitalValues || initialValues}
            onSubmit={(values,submitProps)=>onSubmit(values , submitProps , navigate , handleGetUsers
            , setReinitalValues , userID)}
            validationSchema={validationSchema}
            validateOnMount
            enableReinitialize
            >
                {(formik)=>{
                    console.log(formik);
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
                                type='password'
                                placeholder="حداقل 6 کاراکتر بنویسید ."
                                name='password'
                                required={true}
                                password={true}
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
                                    selectedToEdit={editRoles}
                                    />
                                </div>

                            </div>

                            <SubmitBTN formik={formik} closeModal={true} isValid={false} />
                        </Form>
                    )
                }}
            </Formik>
        </ModalsContainer>
    );
}

export default AddUser;
