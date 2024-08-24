import React from 'react';
import * as Yup from 'yup';
import { Alert } from "../../../utils/alert";
import { addGuaranteeService, editGuaranteeService } from '../../../services/shop/Guaranties/guaranties';

// ========== initial formik props ==========
export const initialValues = {
    title : '' ,
    descriptions : '' ,
    length : '' ,
    length_unit : '' ,
}

export const onSubmit = async (values , submitProps , handleGetGuaranties ,
    setGuarantiesToEdit , guarantiesToEdit 
    , setReinitalValues)=>{
    const handleShowAlert = (title)=>{
        setTimeout(() => {
            Alert(` گارانتی ${values.title} 
            با موفقیت ${title} شد .` , '' , 'success');
            setGuarantiesToEdit(null);
            setReinitalValues(null);
            submitProps.resetForm();
            handleGetGuaranties();
        }, 0);
    }


    try {
        if (guarantiesToEdit) {
            const res = await editGuaranteeService(guarantiesToEdit.id,values);
            if(res.status == 200){
                handleShowAlert('ویرایش')
            }
        }
        else {
            const res = await addGuaranteeService(values);
            if(res.status == 201){
                handleShowAlert('ایجاد');
            }
        }
    } catch (error) {
        setGuarantiesToEdit(null);
        setReinitalValues(null);
        submitProps.resetForm();
    }
    console.log(values);
}

export const validationSchema = Yup.object({
    title : Yup.string().required('لطفا مقداری بنویسید .').matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود ."
    ),
    descriptions : Yup.string().required('لطفا مقداری بنویسید .').matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود ."
    ),
    length_unit : Yup.string().required('لطفا مقداری بنویسید .').matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود ."
    ),
    length : Yup.number().required('لطفا مقداری بنویسید .')
})
// ========== initial formik props ==========