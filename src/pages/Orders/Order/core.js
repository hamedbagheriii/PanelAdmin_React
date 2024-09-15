import React from 'react';
import * as Yup from 'yup';
import { Alert } from "../../../utils/alert";
import { converFormDataToMiladi } from '../../../utils/convertDate';
import { createNewOrderService } from '../../../services/orders/order/order';

// ========== initial formik props ==========
export const initialValues = {
    cart_id : '' ,
    discount_id : '' ,
    delivery_id : '' ,
    address : '' ,
    phone : '' ,
    pay_at : '' ,
    pay_bank : '' ,
    pay_card_number : '' ,
    email : '' ,
}

export const onSubmit = async (values , submitProps , navigate , handleGetOrders )=>{
    
    const handleShowAlert = (title)=>{
        setTimeout(() => {
            Alert(` سفارش سبد ${values.cart_id} 
            با موفقیت ${title} شد .` , '' , 'success');
            submitProps.resetForm();
            navigate('/Orders')
            handleGetOrders()
        }, 0);
    }


    try {
        const data = {...values ,
            phone : `0${values.phone}` ,
            pay_at : converFormDataToMiladi(values.pay_at)
        }
        const res = await createNewOrderService(data);
        if(res.status == 201){
            handleShowAlert('ایجاد');
        }
    } catch (error) {
    }
    console.log(values);
}


export const validationSchema = Yup.object().shape({
    address : Yup.string().required('لطفا مقداری بنویسید .').matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود ."
    ),
    pay_at : Yup.string().required('لطفا مقداری انتخاب کنید .'),
    email : Yup.string().required('لطفا مقداری بنویسید .').email('لطفا قالب فرمت ایمیل را رعایت کنید .'),
    pay_bank : Yup.string().required('لطفا مقداری بنویسید .').matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود ."
    ),
    cart_id  : Yup.number().required('لطفا مقداری بنویسید .').min(1,'حداقل 1 عدد باید وارد شود .') ,
    pay_card_number  : Yup.number().required('لطفا مقداری بنویسید .').min(1,'حداقل 1 عدد باید وارد شود .') ,
    delivery_id  : Yup.number().required('لطفا مقداری بنویسید .').min(1,'حداقل 1 عدد باید وارد شود .') ,
    phone  : Yup.number().required('لطفا مقداری بنویسید .').min(1,'حداقل 1 عدد باید وارد شود .') ,

})
// ========== initial formik props ==========