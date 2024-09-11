import React from 'react';
import * as Yup from 'yup';
import { Alert } from "../../../utils/alert";
import { createNewDeliveryService, editDeliveyService } from '../../../services/orders/delivereis/delivery';

// ========== initial formik props ==========
export const initialValues = {
    title : '' ,
    amount : '' ,
    time : 1 ,
    time_unit : '' ,
}

export const onSubmit = async (values , submitProps , navigate , handleGetDiscount ,
    reinitalValues , setReinitalValues)=>{
    
        const handleShowAlert = (title)=>{
        setTimeout(() => {
            Alert(` نحوه ارسال ${values.title} 
            با موفقیت ${title} شد .` , '' , 'success');
            submitProps.resetForm();
            navigate('/Deliverys')
            handleGetDiscount()
        }, 0);
    }


    try {
        if (reinitalValues) {
            const res = await editDeliveyService(reinitalValues.id,values);
            if(res.status == 200){
                handleShowAlert('ویرایش');
            }
        }
        else {
            const res = await createNewDeliveryService(values);
            if(res.status == 201){
                handleShowAlert('ایجاد');
            }
        }
    } catch (error) {
        setReinitalValues(null);
    }
    console.log(values);
}

export const validationSchema = Yup.object().shape({
    title : Yup.string().required('لطفا مقداری بنویسید .').matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود ."
    ),
    amount : Yup.string().required('لطفا مقداری بنویسید .').matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود ."
    ),
    time_unit : Yup.string().required('لطفا مقداری بنویسید .').matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود ."
    ),
    time  : Yup.number().required('لطفا مقداری بنویسید .').min(1,'حداقل 1 مقدار باید وارد شود .') ,
})
// ========== initial formik props ==========