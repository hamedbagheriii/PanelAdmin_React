import React from 'react';
import * as Yup from 'yup';
import { Alert } from "../../../utils/alert";
import { createDiscountService, editDiscountService } from '../../../services/shop/discounts/discount';
import { convertDataToFormData } from '../../../utils/convertDataToFormData';
import { converFormDataToMiladi } from '../../../utils/convertDate';

// ========== initial formik props ==========
export const initialValues = {
    title : '' ,
    code : '' ,
    percent : 1 ,
    expire_at : '' ,
    for_all : true ,
    product_ids : '' ,
}

export const onSubmit = async (values , submitProps , navigate , handleGetDiscount ,
    discountToEdit , setDiscountToEdit , setReinitalValues)=>{
    
        const handleShowAlert = (title)=>{
        setTimeout(() => {
            Alert(` تخفیف ${values.title} 
            با موفقیت ${title} شد .` , '' , 'success');
            submitProps.resetForm();
            setDiscountToEdit(null)
            navigate('/Discounts')
            handleGetDiscount()
        }, 0);
    }


    try {
        const data = {...values ,
        expire_at : converFormDataToMiladi(values.expire_at)}
        if (discountToEdit) {
            const res = await editDiscountService(discountToEdit.id,data);
            if(res.status == 200){
                handleShowAlert('ویرایش');
            }
        }
        else {
            const res = await createDiscountService(data);
            if(res.status == 201){
                handleShowAlert('ایجاد');
            }
        }
    } catch (error) {
        setDiscountToEdit(null)
        setReinitalValues(null);
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
    percent  : Yup.number().required('لطفا مقداری بنویسید .').min(1,'حداقل 1 درصد باید وارد شود .') ,
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