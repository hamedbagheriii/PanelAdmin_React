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

export const onSubmit = async (values , submitProps , handleGetCarts 
    , setSelectedProductsInfo , currentProduct)=>{
    // ارایه ارسالی به سرور پر میشود
    submitProps.resetForm();
    submitProps.setFieldValue('user_id',values.user_id);
    // ارایه برای نشان دادن پر میشود
    setSelectedProductsInfo(old=>[...old , {
        id : currentProduct.id+values.color_id || 0+Math.ceil(Math.random()),
        product : currentProduct,
        gaurantee:values.guarantee_id > 0 ? currentProduct.gaurantees
        .filter(g=>g.id == values.guarantee_id)[0] : null,
        color:values.color_id > 0 ? currentProduct.colors
        .filter(c=>c.id == values.color_id)[0] : null,
        count : values.count,
        product_Search : currentProduct.title
    }])

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