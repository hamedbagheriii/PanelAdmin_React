import React from 'react';
import * as Yup from 'yup';
import { Alert } from "../../../utils/alert";
import { createColorService, editColorsService } from '../../../services/shop/color/colors';

// ========== initial formik props ==========
export const initialValues = {
    title : '' ,
    code : '#000000' ,
}

export const onSubmit = async (values , submitProps , handleGetColors , setColorToEdit , colorToEdit 
    , setReinitalValues)=>{
    const handleShowAlert = (title)=>{
        setTimeout(() => {
            Alert(` رنگ ${values.title} 
            با موفقیت ${title} شد .` , '' , 'success');
            setColorToEdit(null);
            setReinitalValues(null);
            submitProps.resetForm();
            handleGetColors();
        }, 0);
    }


    try {
        if (colorToEdit) {
            const res = await editColorsService(colorToEdit.id,values);
            if(res.status == 200){
                handleShowAlert('ویرایش')
            }
        }
        else {
            const res = await createColorService(values);
            if(res.status == 201){
                handleShowAlert('ایجاد');
            }
        }
    } catch (error) {
        setColorToEdit(null);
        setReinitalValues(null);
    }
    console.log(values);
}

export const validationSchema = Yup.object({
    title : Yup.string().required('لطفا مقداری بنویسید .').matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود ."
    ),
    code: Yup.string().required('لطفا مقداری بنویسید .')
})
// ========== initial formik props ==========