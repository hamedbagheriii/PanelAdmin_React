import * as Yup from 'yup'
import { addCategoryAtrrsService } from '../../../../services/shop/categoryAttr';
import { Alert } from '../../../../utils/alert';


export const initialValues={
    title : '' ,
    unit : '' ,
    in_filter : true
}

export const onSubmit = async (values , submitProps , cateogryId , handleGetCateogryAttrs)=>{
    values={...values , in_filter : values.in_filter ? 1 : 0}
    try {
        const res = await addCategoryAtrrsService(cateogryId , values)
        if (res.status == 201) {
            Alert('عملیات با موفقیت انجام شد .' 
            ,`ویژگی ${values.title} با موفقیت ایجاد شد .` , 'success');
            handleGetCateogryAttrs()
        }
    } catch (error) {
        // set error in httpService
    }
    submitProps.resetForm();
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