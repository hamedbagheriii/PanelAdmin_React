import React from 'react';
import * as Yup from 'yup';
import { Alert } from "../../../../utils/alert";
import { createProductAttrService } from '../../../../services/shop/product/product';

// ========== initial formik props ==========
export const onSubmit = async (values , submitProps , productID , productTitle , navigate )=>{
    const handleShowAlert = (title)=>{
        setTimeout(() => {
            Alert(` ویژگی 
            برای محصول ${productTitle} با موفقیت ${title} شد .` , '' , 'success');
            submitProps.resetForm();
            navigate(-1);
        }, 0 );
    }
        
    let data = {};
    try {
        for (const key in values) {
            if(values[key]) data = {...data , [key]  : {value : values[key]}}
        }
        const res = await createProductAttrService(productID,data);
        if(res.status == 200){
          handleShowAlert('ایجاد');
        }
    } catch (error) {
        // productToEdit = null;
        // setReinitalValues(null);
        submitProps.resetForm();
    }
    console.log(values);
}
// ========== initial formik props ==========