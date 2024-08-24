import { createNewCategoryService, editCategoryService } from "../../../services/shop/categorories/category";
import * as Yup from 'yup';
import { Alert } from "../../../utils/alert";

// ========== initial formik props ==========
export const initialValues = {
    parent_id : '' ,
    title  : '' ,
    descriptions : '' ,
    image : null ,
    is_active : true ,
    show_in_menu : true ,
}

export const onSubmit = async (values , submitProps , navigate , editId)=>{
    const handleShowAlert = (title , url)=>{
        setTimeout(() => {
            Alert(`دسته بندی ${values.title} 
            با موفقیت ${title} شد .` , '' , 'success');
            submitProps.resetForm();
            navigate(`/${url}`)
        }, 500);
    }

    try {
        values = {...values ,
        is_active : values.is_active ? 1 : 0 ,
        show_in_menu : values.show_in_menu ? 1 : 0} ;

        if (editId) {
            const res = await editCategoryService(editId , values)
            if(res.status == 200){
                handleShowAlert('ویرایش' , 'Category')
            } 
        } 
        else {
            const res = await createNewCategoryService(values);
            if(res.status == 201){
                handleShowAlert('ایجاد' , 'Category')
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const validationSchema = Yup.object({
    parent_id : Yup.mixed() ,
    title : Yup.string().required('لطفا مقداری بنویسید .').matches(
        /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده شود ."
      ),
    description: Yup.string().matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده شود ."
    ),
    image: Yup.mixed()
      .test("filesize", "حجم فایل نمیتواند بیشتر 500 کیلوبایت باشد .", (value) =>
        !value ? true : value.size <= 500 * 1024
      )
      .test("format", "فرمت فایل باید jpg باشد .", (value) =>
        !value ? true : value.type === "image/jpeg"
      ).nullable(true),
    is_active: Yup.boolean(),
    show_in_menu: Yup.boolean(),
})
// ========== initial formik props ==========