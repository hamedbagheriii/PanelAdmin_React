import * as Yup from 'yup'
import { addCategoryAtrrsService, editCategoryAtrrService } from '../../../../services/shop/categorories/categoryAttr';
import { Alert } from '../../../../utils/alert';


export const initialValues={
    title : '' ,
    unit : '' ,
    in_filter : true
}

export const onSubmit = async (values , submitProps , cateogryId , handleGetCateogryAttrs ,
    attrToEdit , setAttrToEdit , setReinitalValues)=>{
    values={...values , in_filter : values.in_filter ? 1 : 0};
    try {
        if (attrToEdit) {
            const res = await editCategoryAtrrService(attrToEdit , values);
            if (res.status == 200) {
                Alert('عملیات با موفقیت انجام شد .' 
                ,`ویژگی ${values.title} با موفقیت ویرایش شد .` , 'success');
                setAttrToEdit(null);
                setReinitalValues(null);
            }
        }
        else{
            const res = await addCategoryAtrrsService(cateogryId , values)
            if (res.status == 201) {
                Alert('عملیات با موفقیت انجام شد .' 
                ,`ویژگی ${values.title} با موفقیت ایجاد شد .` , 'success');
            }
        }
    } catch (error) {
        // set error in httpService
    }
    finally {
        handleGetCateogryAttrs();
        submitProps.resetForm();
    }
}

export const validationSchema = Yup.object({
    title : Yup.string().required('لطفا مقداری بنویسید .').matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود ."
    ) ,
    unit :  Yup.string().required('لطفا مقداری بنویسید .').matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود ."
    ) ,
    in_filter : Yup.boolean().required('لطفا مقداری انتخاب کنید .') ,
})