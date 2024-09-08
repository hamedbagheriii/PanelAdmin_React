import React, { useEffect, useState } from 'react';
import ModalsContainer from '../../../components/ModalsContainer';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { Form, Formik } from 'formik';
import SpinnerLoad from '../../../UI/All/SpinnerLoad';
import FormikControl from '../../../components/form/FormikControl';
import { getAllPermissionsService } from '../../../services/Users/permission/permissions';
import { initialValues, onSubmit, validationSchema } from './core';
import { getOneRoleService } from '../../../services/Users/role/roles';



const AddRole = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const roleToEdit = location.state?.roleToEdit;
    const editType = location.state?.editType;
    const {handleGetRoles} = useOutletContext()
    const [permissions , setPermissions] = useState([])
    const [reinitalValues , setReinitalValues] = useState(null)

    // This is for get permissons
    const handleGetPermissons = async ()=>{
        try {
            const res = await getAllPermissionsService();
            if (res.status == 200) {
                setPermissions(res.data.data.map(i=>{ return {id : i.id , title : i.description}}));
            }
        } catch (error) {
            // set error in httpService
        }
    }

    // This is for calling get permissons function
    useEffect(() => {
        // شرط یک خطی
        editType != 'role' && handleGetPermissons() ;
        roleToEdit && handleGetRoleData()
    }, []);


    const handleGetRoleData = async ()=>{
        try {
                const res = await getOneRoleService(roleToEdit)
                if (res.status == 200) {
                    if (editType == 'role') {
                        setReinitalValues({
                            title: res.data.data.title,
                            description: res.data.data.description,
                        }) 
                    }
                    else {
                        const permissionIDS = res.data.data.permissions.map(i=>`${i.id}`)
                        setReinitalValues({
                            permissions_id: permissionIDS ,
                            editPermissions : true ,
                            title: res.data.data.title,
                        })
                    }
                }
        } catch (error) {
        }
    }


    return (
        <>
            <ModalsContainer
            className='show d-block animate__animated animate__fadeInDown animate__fast'
            id={'add_role_modal'}
            fullscreen={true}
            title={editType == 'permission' ? `ویرایش دسترسی های ${reinitalValues?.title}` :
            editType == 'role' ? `ویرایش نقش ${reinitalValues?.title}` :
            'افزودن نقش'}
            closeFunction={()=>navigate(-1)}
            >
                <Formik
                initialValues={reinitalValues || initialValues}
                onSubmit={(values , submitProps)=>onSubmit(values , submitProps , navigate  , setReinitalValues ,
                handleGetRoles , roleToEdit , editType)}
                validationSchema={validationSchema}
                validateOnMount
                enableReinitialize
                >
                    {(formik)=>{
                        console.log(formik);
                        return (
                            <Form className="container">
                                <div className="row justify-content-center">

                                    {editType != 'permission' ? (
                                        <>
                                            <FormikControl 
                                             name='title'
                                             type='text'
                                             className=''
                                             label='عنوان نقش'
                                             control='input'
                                             placeholder="فقط از حروف فارسی و لاتین استفاده کنید . ."
                                            required={true}
                                            />

                                            <FormikControl 
                                             name='description'
                                             className=''
                                             label='توضیحات'
                                             control='textarea'
                                             placeholder="فقط از حروف فارسی و لاتین استفاده کنید . ."
                                             required={true}
                                            />
                                        </>
                                    ) : null}

                                    {editType != 'role' ? (
                                        <FormikControl 
                                        name='permissions_id'
                                        className=''
                                        label='دسترسی ها'
                                        control='checkbox'
                                        required={true}
                                        id={'permissions_ids'}
                                        options={permissions}
                                        />
                                    )  : null}
                                        
                                    <hr className='w-100 pt-1 mt-4' />
                                    <div className=" w-100 d-flex justify-content-around" >
                                        <button type="button" className="btn btn-danger modal-btn w-25"
                                        onClick={()=>navigate(-1)} data-bs-dismiss="modal">انصراف</button>
                                        <button type='submit' className="btn btn-primary modal-btn w-25" 
                                        disabled={formik.isSubmitting || (!formik.dirty)}>
                                            {formik.isSubmitting ?
                                                <SpinnerLoad colorClass={'text-white'} inline={true} isSmall />
                                            : 'ذخیره'}
                                        </button>
                                    </div>  
                                </div>

                            </Form>
                        )
                    }}
                </Formik>
            </ModalsContainer>
        </>
    );
}

export default AddRole;
