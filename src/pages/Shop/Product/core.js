import React from 'react';
import * as Yup from 'yup';
import { Alert } from "../../../utils/alert";
import { createNewProductService, editProductService } from '../../../services/shop/product/product';

// ========== initial formik props ==========
export const initialValues = {
  category_ids: "",
  title: "",
  price: "",
  weight: "",
  brand_id: "",
  color_ids: "",
  guarantee_ids: "",
  descriptions: "",
  short_descriptions: "",
  cart_descriptions: "",
  image: null ,
  alt_image: "",
  keywords: "",
  stock: "",
  discount: "",
}

export const onSubmit = async (values , submitProps , navigate , productToEdit , setReinitalValues)=>{
    const handleShowAlert = (title)=>{
        setTimeout(() => {
            Alert(` محصول ${values.title} 
            با موفقیت ${title} شد .` , '' , 'success');
            submitProps.resetForm();
            navigate(-1);
          }, 0 );
        }
        

    try {
        if (productToEdit) {
            const res = await editProductService(productToEdit.id,values);
            if(res.status == 200){
              handleShowAlert('ویرایش')
              productToEdit = null;
              setReinitalValues(null);
            }
        }
        else {
            const res = await createNewProductService(values);
            if(res.status == 201){
              handleShowAlert('ایجاد');
            }
        }
    } catch (error) {
        productToEdit = null;
        setReinitalValues(null);
        submitProps.resetForm();
    }
    console.log(values);
}

export const validationSchema = Yup.object({
  category_ids: Yup.string()
      .required("لطفا این قسمت را پر کنید")
      .matches(/^[0-9\s-]+$/,"فقط ازاعداد و خط تیره استفاده شود"),
  title: Yup.string()
      .required("لطفا این قسمت را پر کنید")
      .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
  price: Yup.number()
      .required("لطفا این قسمت را پر کنید"),
  weight: Yup.number(),
  brand_id: Yup.number(),
  color_ids: Yup.string().matches(/^[0-9\s-]+$/,"فقط ازاعداد و خط تیره استفاده شود"),
  guarantee_ids: Yup.string().matches(/^[0-9\s-]+$/,"فقط ازاعداد و خط تیره استفاده شود"),
  descriptions: Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-<>/:.$?&]+$/, "فقط از حروف و اعداد استفاده شود ."),
  short_descriptions: Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
  cart_descriptions: Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
  image: Yup.mixed()
    .test("filesize", "حجم فایل نمیتواند بیشتر 500 کیلوبایت باشد", (value) =>
      !value ? true : value.size <= 500 * 1024
    )
    .test("format", "فرمت فایل باید jpg باشد", (value) =>
      !value ? true : value.type === "image/jpeg" || value.type === "image/png"
    ).nullable(true),
  alt_image: Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
  keywords: Yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
  stock: Yup.number()
  .required("لطفا این قسمت را پر کنید"),
  discount: Yup.number(),
});
// ========== initial formik props ==========