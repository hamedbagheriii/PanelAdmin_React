import React from 'react';
import * as Yup from 'yup';
import { Alert } from "../../../utils/alert";
import { createNewUserService, editUserService } from '../../../services/Users/user/users';
import { converFormDataToMiladi } from '../../../utils/convertDate';

// ========== initial formik props ==========
export const initialValues = {
  user_name: "",
  first_name: "",
  last_name: "",
  phone: "",
  national_code: "",
  email: "",
  password: "",
  birth_date: "",
  gender: 1,
  roles_id: [],
}

export const onSubmit = async (values , submitProps , navigate , handleGetUsers
  , setReinitalValues , userID)=>{
    const handleShowAlert = (title)=>{
        setTimeout(() => {
            Alert(` کاربر ${values.user_name} 
            با موفقیت ${title} شد .` , '' , 'success');
            submitProps.resetForm();
            handleGetUsers()
            navigate(-1);
            setReinitalValues(null);
          }, 0 );
        }
        

    try {
        const data = {
          ...values ,
          birth_date : converFormDataToMiladi(values.birth_date),
          phone : ('0'+values.phone),
        }
        console.log(data);
        if (userID) {
            const res = await editUserService(userID,data);
            if(res.status == 200){
              handleShowAlert('ویرایش')
              setReinitalValues(null);
            }
        }
        else {
            const res = await createNewUserService(data);
            if(res.status == 201){
              handleShowAlert('ایجاد');
            }
        }
    } catch (error) {
        setReinitalValues(null);
        submitProps.resetForm();
    }
}

export const validationSchema = Yup.object({
  user_name: Yup.string()
    .required("لطفا این قسمت را پر کنید .")
    .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, ". فقط از حروف و اعداد استفاده شود"),
  first_name: Yup.string()
    .required("لطفا این قسمت را پر کنید .")
    .matches(/^[\u0600-\u06FF\sa-zA-Z]+$/, ". فقط از حروف استفاده شود"),
  last_name: Yup.string()
    .required("لطفا این قسمت را پر کنید .")
    .matches(/^[\u0600-\u06FF\sa-zA-Z]+$/, ". فقط از حروف استفاده شود"),
  phone: Yup.number().typeError('فقط عدد وارد کنید .').required("لطفا این قسمت را پر کنید"),
  national_code: Yup.number().typeError('فقط عدد وارد کنید .')
    .required("لطفا این قسمت را پر کنید ."),
  email: Yup.string()
    .required("لطفا این قسمت را پر کنید .")
    .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, ". فقط از حروف و اعداد استفاده شود").email('لطفا قالب فرمت را رعایت کنید .'),
  password: Yup.string()
    .required("لطفا این قسمت را پر کنید .")
    .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, ". فقط از حروف و اعداد استفاده شود")
    .min(8,'لطفا حداقل 8 کاراکتر بنویسید .'),
  birth_date: Yup.string()
    .required("لطفا این قسمت را پر کنید ."),
  gender: Yup.number()
    .required("لطفا این قسمت را پر کنید ."),
  roles_id: Yup.array().min(1,'لطفا مقداری انتخاب کنید .')
});
// ========== initial formik props ==========