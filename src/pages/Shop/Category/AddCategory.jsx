import React, { useEffect, useState } from 'react';
import '../../../assets/style/UiStyle.css'
import ModalsContainer from '../../../components/ModalsContainer';
import BtnModal from '../../../UI/pages/btnModal';
import * as Yup from 'yup'
import { Form, Formik } from 'formik';
import FormikControl from '../../../components/form/FormikControl';
import { createNewCategoryService, getCategoriesService } from '../../../services/shop/category';
import { Alert } from '../../../utils/alert';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SubmitBTN from '../../../components/form/SubmitBTN';


// ========== initial formik props ==========
const initialValues = {
    parent_id : '' ,
    title  : '' ,
    descriptions : '' ,
    image : null ,
    is_active : true ,
    show_in_menu : true ,
}

const onSubmit = async (values , submitProps , navigate )=>{
    try {
        values = {...values ,
        is_active : values.is_active ? 1 : 0 ,
        show_in_menu : values.show_in_menu ? 1 : 0} ;

        const res = await createNewCategoryService(values);
        if(res.status == 201){
        setTimeout(() => {
            Alert(`دسته بندی ${values.title} 
            با موفقیت ایجاد شد .` , '' , 'success');
            submitProps.resetForm();
            navigate(`/Category`)
        }, 500);
        }
    } catch (error) {
        console.log(error);
    }
}

const validationSchema = Yup.object({
    parent_id : Yup.number() ,
    title : Yup.string().required('لطفا مقداری بنویسید .').matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود ."
      ),
    description: Yup.string().matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده شود ."
    ),
    image: Yup.mixed()
      .test("filesize", "حجم فایل نمیتواند بیشتر 500 کیلوبایت باشد .", (value) =>
        !value ? true : value.size <= 500 * 1024
      )
      .test("format", "فرمت فایل باید jpg باشد .", (value) =>
        !value ? true : value.type === "image/jpeg"
      ).nullable(true),
    is_active: Yup.boolean(),
    show_in_menu: Yup.boolean(),
})
// ========== initial formik props ==========





const AddCategory = () => {
    // ========== inital params ==========
    const [parents , setParents] = useState([]);
    const navigate = useNavigate();
    const params = useParams();

    const handleGetParentsCategories = async ()=>{
        try {
            const res = await getCategoriesService();
            
            if (res.status == 200) {
                setParents(()=>res.data.data.map(i=>{
                    return  {id : i.id , value : i.title}
                })) 
            }
            // ارور ها در http تنظیم شده است .
        } catch (error) {
        }
    }

    useEffect(() => {
        handleGetParentsCategories();
    }, []);
    // ========== inital params ==========

    return (
        <>
            <BtnModal id={`add_product_category_modal`} />

            <ModalsContainer
            id={'add_product_category_modal'}
            fullscreen={true}
            title={'افزودن دسته محصولات'}
            >
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values , submitProps)=>onSubmit(values , submitProps , navigate )}
                    validationSchema={validationSchema}
                    validateOnMount={true}
                >
                {(formik)=>{
                    return (
                        <Form className='mx-auto'>
                            <div className="container modal-Category h-100 pt-3 ">
                                <div className="row mx-auto align-items-center justify-content-around h-50 gap-2">
                                    {parents.length ? 
                                        <FormikControl 
                                        className=''
                                        control='select'
                                        options={parents}
                                        name='parent_id'
                                        label='دسته والد'
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
    
                                    <FormikControl 
                                        className=''
                                        control='file'
                                        name='image'
                                        label='تصویر'
                                        placeholder='تصویر'
                                    />

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
                            <SubmitBTN formik={formik} />
                        </Form>
                    )
                }}
                </Formik>
            </ModalsContainer>
        </>
    );
}

export default AddCategory;