import React from 'react';
import * as Yup from 'yup';
import { Alert } from "../../../utils/alert";
import { createDiscountService } from '../../../services/shop/discounts/discount';

// ========== initial formik props ==========
export const initialValues = {
    title : '' ,
    code : '' ,
    percent : 1 ,
    expire_at : '' ,
    for_all : true ,
    product_ids : '' ,
}

export const onSubmit = async (values , submitProps , navigate )=>{
    const handleShowAlert = (title)=>{
        setTimeout(() => {
            Alert(` تخفیف ${values.title} 
            با موفقیت ${title} شد .` , '' , 'success');
            submitProps.resetForm();
            navigate(-1)
        }, 0);
    }


    try {
            const res = await createDiscountService(values);
            if(res.status == 201){
                handleShowAlert('ایجاد');
            }
    } catch (error) {
        // setBrandToEdit(null);
        // setReinitalValues(null);
    }
    console.log(values);
}

// shape : برای استفاده از when
export const validationSchema = Yup.object().shape({
    title : Yup.string().required('لطفا مقداری بنویسید .').matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود ."
    ),
    code : Yup.string().required('لطفا مقداری بنویسید .').matches(
        /^[sa-zA-Z0-9@!%-.$?&]+$/,
        "فقط از حروف و اعداد استفاده شود ."
    ),
    percent  : Yup.number().required('لطفا مقداری بنویسید .') ,
    expire_at : Yup.string().required('لطفا مقداری انتخاب کنید  .').matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%-/$?&]+$/,
        "فقط از حروف و اعداد استفاده شود ."
    ),
    for_all : Yup.boolean() ,
    product_ids : Yup.string().when('for_all',{
        is : false ,
        then :()=> Yup.string().required('لطفا مقداری بنویسید .').matches(
            /^[0-9\s-]+$/  , 'فقط از اعداد و خط تیره استفاده شود .')
    })
})
// ========== initial formik props ==========