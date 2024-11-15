import React from 'react';
import * as Yup from 'yup';
import { Alert } from "../../../utils/alert";
import { createBrandService, editBrandsService } from '../../../services/shop/brand/brand';

// ========== initial formik props ==========
export const initialValues = {
    original_name : '' ,
    persian_name : '' ,
    descriptions : '' ,
    logo : null ,
}

export const onSubmit = async (values , submitProps , handleGetBrands , setBrandToEdit , brandToEdit 
    , setReinitalValues)=>{
    const handleShowAlert = (title)=>{
        setTimeout(() => {
            Alert(` برند ${values.original_name} 
            با موفقیت ${title} شد .` , '' , 'success');
            setBrandToEdit(null);
            setReinitalValues(null);
            submitProps.resetForm();
            handleGetBrands();
        }, 0);
    }


    try {
        if (brandToEdit) {
            const res = await editBrandsService(brandToEdit,values);
            if(res.status == 200){
                handleShowAlert('ویرایش')
            }
        }
        else {
            const res = await createBrandService(values);
            if(res.status == 201){
                handleShowAlert('ایجاد');
            }
        }
    } catch (error) {
        setBrandToEdit(null);
        setReinitalValues(null);
    }
    console.log(values);
}

export const validationSchema = Yup.object({
    original_name : Yup.string().required('لطفا مقداری بنویسید .').matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود ."
    ),
    persian_name: Yup.string().matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود ."
    ),
    descriptions: Yup.string().matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده شود ."
    ),
    logo: Yup.mixed()
      .test("filesize", "حجم فایل نمیتواند بیشتر 500 کیلوبایت باشد .", (value) =>
        !value ? true : value.size <= 500 * 1024
      )
      .test("format", "فرمت فایل باید jpg باشد .", (value) =>
        !value ? true : value.type === "image/jpeg"
      ).nullable(true),
})
// ========== initial formik props ==========