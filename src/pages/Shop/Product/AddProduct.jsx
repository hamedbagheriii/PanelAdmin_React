import React, { useEffect, useState } from 'react';
import PageContainer from '../../../components/PageContainer';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import SpinnerLoad from '../../../UI/All/SpinnerLoad';
import { initialValues, onSubmit, validationSchema } from './core';
import FormikControl from '../../../components/form/FormikControl';
import { getCategoriesService } from '../../../services/shop/categorories/category';


const AddProduct = () => {
    const navigate = useNavigate();
    const [parentCategories , setParentCategories] = useState([]);
    const [mainCategories , setMainCategories] = useState(null);
    const [isLoading , setIsLoading] = useState(true);

    // get all categories 
    const getAllParentCategories = async ()=>{
        try {
            const res = await getCategoriesService();
            if (res.status == 200) {
                setParentCategories(res.data.data.map(d=>(
                    {id : d.id , value : d.title}
                )))
            }
        } catch (error) {
            // set error in httpService
        }
        finally {
            setIsLoading(false);
        }
    }


    const handleSetMainCategories = async (value)=>{
        setMainCategories('waiting');
        if (value > 0) {
            try {
                const res = await getCategoriesService(value);
                if(res.status == 200){
                    setMainCategories(res.data.data.map(d=>(
                        {id : d.id , value : d.title}
                    )))
                }
            } catch (error) {
                //set error in httpService
            }
        }
        else{
            setMainCategories(null);
        }
    }

    

    // this is for calling get categories funcation
    useEffect(() => {
        getAllParentCategories();
        setIsLoading(true);
    }, []);


    return (
        <>
            {!isLoading ?
                    <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}>
                        {(formik)=>{
                            return (
                                <Form className='w-100'>
                                    <PageContainer title={'افزودن محصول جدید'} />
                                    <hr  className='w-75 mx-auto bg-white pt-1 rounded-3'/>
                                    <div className="container h-100 pt-3 modal_maxWidth input_dark">
                                        <div className="row mx-auto align-items-center justify-content-center h-100 gap-2"> 
                                            {parentCategories.length  ?
                                                <div className="col-12 ">
                                                        <FormikControl 
                                                        control='select'
                                                        options={parentCategories}
                                                        name='parentCats'
                                                        label='دسته والد'
                                                        firstItem='دسته والد را انتخاب کنید . . .'
                                                        handleOnChange={handleSetMainCategories}
                                                        />
                                                </div>  
                                            : null}

                                            {mainCategories == 'waiting' ?
                                                <div className='w-100 '>
                                                    <div className='w-100 fs-6 fw-bold alert text-center alert-primary' >
                                                        <SpinnerLoad  />
                                                        <span className='fs-5 mt-1'>
                                                            لطفا کمی صبر کنید . . .
                                                        </span>
                                                    </div>
                                                </div>
                                            : mainCategories !== null  ?
                                                <div className="col-12 ">
                                                        <FormikControl 
                                                        control='select'
                                                        options={mainCategories}
                                                        name='mainCats'
                                                        label='دسته اصلی'
                                                        firstItem='دسته اصلی را انتخاب کنید . . .'
                                                        />
                                                    <div className="col-12 mt-4 col-md-6 col-lg-8">
                                                        <span className="chips_elem">
                                                            <i className="fas fa-times text-danger"></i>
                                                            دسته فلان
                                                        </span>
                                                    </div>
                                                </div>  
                                            : null }
                                            
                                            <div className="col-12 ">
                                                <div className="input-group my-3 dir_ltr">
                                                    <input type="text" className="form-control" placeholder="عنوان محصول"/>
                                                    <span className="input-group-text w_6rem justify-content-center">عنوان</span>
                                                </div>
                                            </div>  
                                            <div className="col-12 ">
                                                <div className="input-group mb-3 dir_ltr" >
                                                    <input type="text" className="form-control" placeholder="قیمت محصول"/>
                                                    <span className="input-group-text w_6rem justify-content-center">قیمت</span>
                                                </div>
                                            </div>  
                                            <div className="col-12 ">
                                                <div className="input-group mb-3 dir_ltr">
                                                    <input type="text" className="form-control" placeholder="وزن محصول (کیلوگرم)"/>
                                                    <span className="input-group-text w_6rem justify-content-center">وزن</span>
                                                </div>
                                            </div>  
                                            <div className="col-12 ">
                                                <div className="input-group mb-3 dir_ltr" >
                                                    <span className="input-group-text justify-content-center">
                                                        <i className="fas fa-plus text-success hoverable_text pointer"></i>
                                                    </span>
                                                    <input type="text" className="form-control" placeholder="قسمتی از نام برند را وارد کنید" list="brandLists"/>
                                                    <span className="input-group-text w_6rem justify-content-center">برند</span>
                                                    <datalist id="brandLists">
                                                        <option value="سامسونگ"/>
                                                        <option value="سونی"/>
                                                        <option value="اپل"/>
                                                    </datalist>
                                                </div>
                                            </div>  
                                            <div className="col-12 ">
                                                <div className="input-group mb-2 dir_ltr" >
                                                    <input type="text" className="form-control" placeholder="قسمتی از نام رنگ را وارد کنید" list="colorList"/>
                                                    <datalist id="colorList">
                                                        <option value="مشکی"/>
                                                        <option value="سفید"/>
                                                        <option value="قرمز"/>
                                                    </datalist>
                                                    <span className="input-group-text w_6rem justify-content-center">رنگ</span>
                                                </div>
                                                <div className="col-12 col-md-6 col-lg-8 mb-3 d-flex">
                                                    <span className="color_tag chips_elem d-flex justify-content-center align-items-center pb-2 bg-dark">
                                                        <i className="fas fa-times text-danger hoverable_text"></i>
                                                    </span>
                                                </div>
                                            </div>  
                                            <div className="col-12 ">
                                                <div className="input-group mb-2 dir_ltr" >
                                                    <input type="text" className="form-control" placeholder="قسمتی از نام گارانتی را وارد کنید" list="guarantiList"/>
                                                    <datalist id="guarantiList">
                                                        <option value="گارانتی فلان 1"/>
                                                        <option value="گارانتی فلان 2"/>
                                                        <option value="گارانتی فلان 3"/>
                                                    </datalist>
                                                    <span className="input-group-text w_6rem justify-content-center">گارانتی</span>
                                                </div>
                                                <div className="col-12 col-md-6 col-lg-8 mb-3">
                                                    <span className="chips_elem">
                                                        <i className="fas fa-times text-danger"></i>
                                                        گارانتی فلان
                                                    </span>
                                                    <span className="chips_elem">
                                                        <i className="fas fa-times text-danger"></i>
                                                        گارانتی فلان
                                                    </span>
                                                </div>
                                            </div>  
                                            <div className="col-12 ">
                                                <div className="input-group mb-3 dir_ltr">
                                                    <textarea type="text" className="form-control" placeholder="توضیحات" rows="5"></textarea>
                                                    <span className="input-group-text w_6rem justify-content-center">توضیحات</span>
                                                </div>
                                            </div>  
                                            <div className="col-12 ">
                                                <div className="input-group mb-3 dir_ltr">
                                                    <input type="file" className="form-control" placeholder="تصویر"/>
                                                    <span className="input-group-text w_6rem justify-content-center">تصویر</span>
                                                </div>
                                            </div>  
                                            <div className="col-12 ">
                                                <div className="input-group mb-3 dir_ltr">
                                                    <input type="text" className="form-control" placeholder="یک کلمه در مورد تصویر"/>
                                                    <span className="input-group-text w_6rem justify-content-center">توضیح تصویر</span>
                                                </div>
                                            </div>  
                                            <div className="col-12 ">
                                                <div className="input-group mb-3 dir_ltr">
                                                    <input type="text" className="form-control" placeholder="با - از هم جدا شوند"/>
                                                    <span className="input-group-text w_6rem justify-content-center">تگ ها</span>
                                                </div>
                                            </div>  
                                            <div className="col-12 ">
                                                <div className="input-group mb-3 dir_ltr">
                                                    <input type="number" className="form-control" placeholder="فقط عدد"/>
                                                    <span className="input-group-text w_6rem justify-content-center">موجودی</span>
                                                </div>
                                            </div>  
                                            <div className="col-12 ">
                                                <div className="input-group mb-3 dir_ltr">
                                                    <input type="number" className="form-control" placeholder="فقط عدد "/>
                                                    <span className="input-group-text w_6rem justify-content-center">درصد تخفیف</span>
                                                </div>
                                            </div>  
                                            <div className="col-12 row justify-content-center pb-3">
                                                <div className="form-check form-switch col-6 text-white">
                                                    <input className="form-check-input pointer" type="checkbox" id="flexSwitchCheckDefault" />
                                                    <label className="form-check-label pointer" htmlFor="flexSwitchCheckDefault">وضعیت فعال</label>
                                                </div>
                                            </div>  
                                        </div>
                                    </div>
            
                                    <div className="modal-footer mt-3 pt-4 w-100 d-flex justify-content-around" >
                                        <button type="button" className="btn btn-danger modal-btn w-25"
                                        onClick={()=>navigate(-1)} data-bs-dismiss="modal">انصراف</button>
                                        <button type='submit' className="btn btn-primary modal-btn w-25" 
                                        disabled={formik.isSubmitting || (!formik.dirty || !formik.isValid)}>
                                            {formik.isSubmitting ?
                                                <SpinnerLoad colorClass={'text-white'} inline={true} isSmall />
                                            : 'ذخیره'}
                                        </button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                :
                    <div className='w-100 mt-2'>
                        <hr className='bg-white w-75 mx-auto my-5' />
                        <div className='w-100 fs-6 fw-bold alert text-center alert-primary' >
                            <SpinnerLoad  />
                            <span className='fs-5 mt-1'>
                                لطفا کمی صبر کنید . . .
                            </span>
                        </div>
                    </div>
                }
        </>
    );
}

export default AddProduct;
