import React from 'react';
import * as Yup from 'yup';
import { Alert } from "../../../../utils/alert";
import { createProductAttrService } from '../../../../services/shop/product/product';
import { getCategoriesAtrrsService } from '../../../../services/shop/categorories/categoryAttr';

// ========== initial formik props ==========
export const onSubmit = async (values , submitProps , productID , productTitle , navigate , editToAttr , setEditToAttr)=>{
    const handleShowAlert = (title)=>{
        setTimeout(() => {
            Alert(` ویژگی 
            برای محصول ${productTitle} با موفقیت ${title} شد .` , '' , 'success');
            submitProps.resetForm();
            setEditToAttr(null);
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
          if (editToAttr) {
              handleShowAlert('ویرایش');
          } else {
            handleShowAlert('ایجاد');
          }
        }
    } catch (error) {
        setEditToAttr(null);
        submitProps.resetForm();
    }
    console.log(values);
}

export const initializingData = async (productData,setEditToAttr)=>{
    let attrsVar = [] ; 
    let initals = {} ; 
    let rules = {} ; 

    const promise = Promise.all(
        productData.categories.map(async (cat)=>{
            const res = await getCategoriesAtrrsService(cat.id)
            if (res.status == 200 ) {
                attrsVar = [...attrsVar , {groupTitle : cat.title , data : res.data.data}] ;
                if (res.data.data.length > 0) {
                    for (const d of res.data.data) {
                        const value = productData.attributes.filter(i=>i.id == d.id)[0]?.pivot.value || ''
                        if (value !== '') {
                            setEditToAttr(true);
                        }
                        initals = {...initals , [d.id] : value}
                        rules = {...rules , [d.id]:Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
                        "فقط از حروف و اعداد استفاده شود ."),}
                    }
                }
            }
        })
    )
    
    // برای اینکه صبر کنه و بعد ریترن کنه
    const promiseRes = await promise;
    return {
        attrsVar,
        initals,
        rules
    }
}
// ========== initial formik props ==========