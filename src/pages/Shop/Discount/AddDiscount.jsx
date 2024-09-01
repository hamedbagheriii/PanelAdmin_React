import React, { useEffect, useState } from 'react';
import ModalsContainer from '../../../components/ModalsContainer';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Form, Formik } from 'formik';
import FormikControl from '../../../components/form/FormikControl';
import SpinnerLoad from '../../../UI/All/SpinnerLoad';
import { getAllProductsTitlesService } from '../../../services/shop/product/product';
import { initialValues, onSubmit, validationSchema } from './core';
import PersonalError from '../../../components/form/personalComponenet/personalError';


const AddDiscount = () => {
    const navigate = useNavigate();
    const [allProducts , setAllProducts] = useState([]);
    const [searchAPI , setSearchAPI] = useState('');


    const handleGetProducts = async ()=>{
        try {
            const res = await getAllProductsTitlesService() 
            if (res.status == 200) {
                setAllProducts(res.data.data.map(d=>{
                    return {id : d.id , value : d.title}
                }))
            }
        } 
        catch (error) {
        }
    }
    
    useEffect(() => {
        handleGetProducts();
    }, []);




    return (
        <>
            <ModalsContainer
            className='show d-block animate__animated animate__fadeInDown animate__fast'
            id={'add_discount_modal'}
            fullscreen={true}
            title={'افزودن کد تخفیف'}
            closeFunction={()=>navigate(-1)}
            >
                {
                    <div className="container modal_maxWidth">
                        <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values , submitProps)=>onSubmit(values , submitProps , navigate)}
                        validateOnMount>
                            {(formik)=>{
                                console.log(formik);
                                return (
                                    <Form className="row justify-content-center w-100 h-100">
                                        <FormikControl 
                                         name='title'
                                         type='text'
                                         className=''
                                         label='عنوان کد'
                                         control='input'
                                         placeholder="کیبرد را در حالت لاتین قرار دهید ."
                                         required={true}
                                        />

                                         <FormikControl 
                                         name='code'
                                         type='text'
                                         className=''
                                         label='کد تخفیف'
                                         control='input'
                                         placeholder="کیبرد را در حالت لاتین قرار دهید"
                                            required={true}
                                        />

                                        <FormikControl 
                                         name='percent'
                                         type='number'
                                         className=''
                                         label='درصد تخفیف'
                                         control='input'
                                         placeholder="فقط عدد بنویسید ."
                                        required={true}
                                        />

                                        <FormikControl 
                                         name='expire_at'
                                         label='تاریخ انقضا'
                                         control='date'
                                         required={true}
                                         formik={formik}
                                         yearsLimit={{from:10,to:10}}
                                        />
                                        <div>
                                            <ErrorMessage className='border' name={'expire_at'}
                                            component={PersonalError} />
                                        </div>


                                        <FormikControl 
                                         name='for_all'
                                         label='برای همه'
                                         control='switch'
                                        /> 

                                        {!formik.values.for_all ?
                                            <FormikControl 
                                            control='searchableSelect'
                                            options={allProducts}
                                            label={'محصول'}
                                            formik={formik}
                                            name={'product_ids'}
                                            firstItem=' محصولات را انتخاب کنید . . .'
                                            required={true}
                                            className='mt-4 animate__animated animate__shakeX'
                                            />
                                        : null}
                                        <div>
                                            <ErrorMessage className='border' name={'product_ids'}
                                            component={PersonalError} />
                                        </div>
                                

                                        <div className="modal-footer w-100 d-flex justify-content-around" >
                                            <button type="button" className="btn btn-danger modal-btn w-25"
                                            onClick={()=>navigate(-1)} data-bs-dismiss="modal">انصراف</button>
                                            <button type='submit' className="btn btn-primary modal-btn w-25" 
                                            disabled={formik.isSubmitting || (!formik.dirty)}>
                                                {formik.isSubmitting ?
                                                    <SpinnerLoad colorClass={'text-white'} inline={true} isSmall />
                                                : 'ذخیره'}
                                            </button>
                                        </div>                                      
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                }
            </ModalsContainer>
        </>
    );
}

export default AddDiscount;
