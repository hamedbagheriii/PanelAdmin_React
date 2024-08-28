import React, { useContext, useEffect, useState } from 'react';
import '../../../assets/style/UiStyle.css'
import ModalsContainer from '../../../components/ModalsContainer';
import BtnModal from '../../../UI/pages/btnModal';
import { Form, Formik } from 'formik';
import FormikControl from '../../../components/form/FormikControl';
import { getCategoriesService, getSingleCategoryService } from '../../../services/shop/categorories/category';
import {useNavigate, useParams } from 'react-router-dom';
import SubmitBTN from '../../../components/form/SubmitBTN';
import { categoryContext } from '../../../context/categoryContext';
import { initialValues, onSubmit, validationSchema } from './core';


const AddCategory = () => {
    // ========== inital params ==========
    const [parents , setParents] = useState([]);
    const [reInitialValues , setReInitialValues] = useState(null);
    const [editCategory , setEditCategory] = useState(null);
    const {editId , setEditId} = useContext(categoryContext);
    const navigate = useNavigate();
    const params = useParams();

    // This is for get parents categories
    const handleGetParentsCategories = async ()=>{
        try {
            const res = await getCategoriesService();
            
            if (res.status == 200) {
                setParents(()=>res.data.data.map(i=>{
                    return  {id : i.id , value : i.title}
                })) 
            }
            // ارور ها در http تنظیم شده است .
        }
        catch (error) {
        }
    }

    // This is for get Single category Data
    const handleGetSingleCategory = async ()=>{
        try {
            const res = await getSingleCategoryService(editId);
            if (res.status == 200) {
                const oldCategory = res.data.data;
                setEditCategory(oldCategory);
            }
        } catch (error) {
            // set error in httpService
        }
    }

    // This is for calling get parents Cateogry function
    useEffect(() => {
        handleGetParentsCategories();
    }, []);

    // This is for set ReInitialValues
    useEffect(() => {
        if (editCategory) {
            setReInitialValues({
                // ' ' به معنی ولیو خالی است که در سلکلت ما ولیو خالی را به عنوان ایتم اول ست کردیم
                parent_id : editCategory.parent_id || ' ',
                title  : editCategory.title  ,
                image : null ,
                descriptions : editCategory.descriptions ,
                is_active : (editCategory.is_active ? true : false) ,
                show_in_menu : (editCategory.show_in_menu ? true : false) ,
            })
        }
        else if(params.categoryID){
            setReInitialValues({
                ...initialValues ,
                parent_id : params.categoryID
            });
        }
        else{
            setReInitialValues(null);
        }
    }, [params.categoryID , editCategory]);

    // This is for calling get Single Category function
    useEffect(() => {
        if (editId) {
            handleGetSingleCategory();
        }
        else{
            setEditCategory(null);
        }
    }, [editId]);
    // ========== inital params ==========

    return (
        <>
            <BtnModal id={`add_product_category_modal`} setEditId={setEditId} />

            <ModalsContainer
            id={'add_product_category_modal'}
            fullscreen={true}
            setEditId={setEditId}
            title={`${editId ? 'ویرایش' : 'افزودن'} دسته ${editCategory ? editCategory.title : 'محصولات'}`}
            >
                <Formik
                    initialValues={reInitialValues || initialValues}
                    onSubmit={(values , submitProps)=>onSubmit(values , submitProps , navigate , editId)}
                    validationSchema={validationSchema}
                    validateOnMount={true}
                    enableReinitialize
                >
                {(formik)=>{
                    return (
                        <Form className='mx-auto'>
                            <div className="container modal_maxWidth h-100 pt-3 ">
                                <div className="row mx-auto align-items-center justify-content-around h-50 gap-2">
                                    {parents.length ? 
                                        <FormikControl 
                                        className=''
                                        control='select'
                                        options={parents}
                                        name='parent_id'
                                        label='دسته والد'
                                        firstItem='دسته والد را انتخاب کنید . . .'
                                        />
                                    : null}

                                    <FormikControl 
                                        className=''
                                        control='input'
                                        name='title'
                                        label='عنوان'
                                        type='text'
                                        placeholder='عنوان دسته'
                                    />

                                    <FormikControl 
                                        className=''
                                        control='textarea'
                                        name='description'
                                        label='توضیحات'
                                        type='text'
                                        placeholder='توضیحات'
                                    />
    
                                    {!editId ? 
                                        <FormikControl 
                                        className=''
                                        control='file'
                                        name='image'
                                        label='تصویر'
                                        placeholder='تصویر'
                                        formik={formik}
                                        /> 
                                    : null }

                                    <FormikControl 
                                        control='switch'
                                        name='is_active'
                                        label='وضعیت فعال'
                                    />

                                    <FormikControl 
                                        control='switch'
                                        name='show_in_menu'
                                        label='نمایش در منو'
                                    />
                                </div>
                            </div>
                            <SubmitBTN formik={formik} setEditId={setEditId}/>
                        </Form>
                    )
                }}
                </Formik>
            </ModalsContainer>
        </>
    );
}

export default AddCategory;