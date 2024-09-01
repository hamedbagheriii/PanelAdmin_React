import React from 'react';
import * as Yup from 'yup';
import { Alert } from "../../../utils/alert";
import { createDiscountService } from '../../../services/shop/discounts/discount';

// ========== initial formik props ==========
export const initialValues = {
    title : '' ,
    code : '' ,
    percent : 1 ,
    expir_at : '' ,
    for_all : true ,
    product_ids : '' ,
}

export const onSubmit = async (values , submitProps , handleGetBrands )=>{
    const handleShowAlert = (title)=>{
        setTimeout(() => {
            Alert(` تخفیف ${values.title} 
            با موفقیت ${title} شد .` , '' , 'success');
            // setBrandToEdit(null);
            // setReinitalValues(null);
            submitProps.resetForm();
            handleGetBrands();
        }, 0);
    }


    try {
        // if (brandToEdit) {
        //     const res = await editBrandsService(brandToEdit,values);
        //     if(res.status == 200){
        //         handleShowAlert('ویرایش')
        //     }
        // }
        // else {
            const res = await createDiscountService(values);
            if(res.status == 201){
                handleShowAlert('ایجاد');
            }
        // }
    } catch (error) {
        // setBrandToEdit(null);
        // setReinitalValues(null);
    }
    console.log(values);
}

export const validationSchema = Yup.object({
    title : Yup.string().required('لطفا مقداری بنویسید .').matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود ."
    ),
    code : Yup.string().required('لطفا مقداری بنویسید .').matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود ."
    ),
    percent  : Yup.number().required('لطفا مقداری بنویسید .').matches(
        /^[0-9@!%$?&]+$/,
        "فقط از اعداد استفاده شود ."
    ),
    expire_at : Yup.string().required('لطفا مقداری بنویسید .').matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود ."
    ),
    for_all : Yup.boolean().required('لطفا مقداری انتخاب کنید . .') ,
    product_ids : Yup.string().required('لطفا مقداری بنویسید .')
})
// ========== initial formik props ==========