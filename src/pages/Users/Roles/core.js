import React from 'react';
import * as Yup from 'yup';
import { Alert } from "../../../utils/alert";
import { createNewRoleService, editRolePermissionService, editRoleService } from '../../../services/Users/role/roles';


// ========== initial formik props ==========
export const initialValues = {
  title: "",
  description: "",
  permissions_id: []
}

export const onSubmit = async (values , submitProps , navigate , setReinitalValues 
  , handleGetRoles , roleToEdit , editType )=>{
    const handleShowAlert = (title)=>{
        setTimeout(() => {
            Alert(` نقش ${values.title} 
            با موفقیت ${title} شد .` , '' , 'success');
            submitProps.resetForm();
            handleGetRoles()
            navigate(-1);
          }, 0 );
        }
        

    try {
        if (editType == 'role') {
            const res = await editRoleService(roleToEdit,values);
            if(res.status == 200){
              handleShowAlert('ویرایش')
              setReinitalValues(null);
            }
        }
        else if (editType == 'permission'){
            const res = await editRolePermissionService(roleToEdit,{'permissions_id' : values.permissions_id});
            if(res.status == 200){
              handleShowAlert('ویرایش')
              setReinitalValues(null);
            }
        }
        else {
            const res = await createNewRoleService(values);
            if(res.status == 201){
              handleShowAlert('ایجاد');
            }
        }
    } catch (error) {
        setReinitalValues(null);
        submitProps.resetForm();
    }
    console.log(values);
}

// otherwise : در غیر این صورت
export const validationSchema = Yup.object({
  title: Yup.string().when('editPermissions' , {
    is : true ,
    then : ()=> null ,
    otherwise : ()=> Yup.string().required("لطفا این قسمت را پر کنید")
    .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
  } ),
  description: Yup.string().when('editPermissions' , {
    is : true ,
    then : ()=> null , 
    otherwise : ()=> Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
  }),
  permissions_id : Yup.array().min(1 , 'حداقل یک مورد انتخاب کنید .')

});
// ========== initial formik props ==========