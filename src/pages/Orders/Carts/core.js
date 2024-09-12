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

export const onSubmit = async (values , submitProps , handleGetCarts , setSelectedProducts
    , setSelectedProductsInfo , currentProducts)=>{
    // ارایه ارسالی به سرور پر میشود
    setSelectedProducts(old=>[...old , values])
    submitProps.resetForm();
    submitProps.setFieldValue('user_id',values.user_id);
    // ارایه برای نشان دادن پر میشود
    setSelectedProductsInfo(old=>[...old , {
        id : currentProducts.id+Math.ceil(Math.random()),
        productName:currentProducts.title,
        price:currentProducts.price,
        gaurantee:values.guarantee_id > 0 ? currentProducts.gaurantees
        .filter(g=>g.id == values.guarantee_id)[0].title : null,
        color:values.color_id > 0 ? currentProducts.colors
        .filter(c=>c.id == values.color_id)[0].title : null,
        count : values.count
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