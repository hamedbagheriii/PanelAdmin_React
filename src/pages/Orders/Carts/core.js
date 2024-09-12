import React from 'react';
import * as Yup from 'yup';

// ========== initial formik props ==========
export const initialValues = {
    user_id : '' ,
    product_id : '' ,
    color_id : '' ,
    guarantee_id : '' ,
    count : 1 ,
}

export const onSubmit = async (values , submitProps , handleGetCarts)=>{
    

    console.log(values);
}

export const validationSchema = Yup.object().shape({
    user_id :  Yup.number().required('لطفا مقداری بنویسید .').typeError('لطفا فقط عدد وارد کنید .')
    .min(1,'حداقل 1 عدد باید وارد شود .') ,
    product_id : Yup.number().required('لطفا مقداری بنویسید .').typeError('لطفا فقط عدد وارد کنید .')
    .min(1,'حداقل 1 عدد باید وارد شود .') ,
    color_id :  Yup.number().typeError('لطفا فقط عدد وارد کنید .'),
    guarantee_id :  Yup.number().typeError('لطفا فقط عدد وارد کنید .'),
    count  : Yup.number().required('لطفا مقداری بنویسید .').typeError('لطفا فقط عدد وارد کنید .')
    .min(1,'حداقل 1 عدد باید وارد شود .') ,
})
// ========== initial formik props ==========