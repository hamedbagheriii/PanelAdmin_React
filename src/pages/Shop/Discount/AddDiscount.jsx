import React, { useEffect, useState } from 'react';
import ModalsContainer from '../../../components/ModalsContainer';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { ErrorMessage, Form, Formik } from 'formik';
import FormikControl from '../../../components/form/FormikControl';
import SpinnerLoad from '../../../UI/All/SpinnerLoad';
import { getAllProductsTitlesService } from '../../../services/shop/product/product';
import { initialValues, onSubmit, validationSchema } from './core';
import PersonalError from '../../../components/form/personalComponenet/personalError';
import { convertDate } from '../../../utils/convertDate';
import SubmitBTN from '../../../components/form/SubmitBTN';


const AddDiscount = () => {
    const navigate = useNavigate();
    const [allProducts , setAllProducts] = useState([]);
    const {handleGetDiscount} = useOutletContext()
    const location = useLocation()
    const discountData = location.state?.discountData
    const [reinitalValues , setReinitalValues] = useState(null);
    const [discountToEdit , setDiscountToEdit] = useState(null);
    const [editDiscount , setEditDiscount] = useState(null);

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

    // this is get data for edit or change for_all
    const handleSetProductSelectBix = (formik)=>{
        // برای حذف - و تبدیل استرینگ به ارایه
        // filter برای این قرار دادیم که مقدار اولیه خالی رو حذف کنه


        let idsArr = formik.values.product_ids.split('-').filter(id=>id);
        let selectedProductArr = idsArr.map(id=>allProducts.filter(p=>p.id == id)[0]).filter(product=>product);

        return(
            <FormikControl 
            control='searchableSelect'
            options={allProducts}
            label={'محصول'}
            formik={formik}
            name={'product_ids'}
            firstItem=' محصولات را انتخاب کنید . . .'
            required={true}
            className='mt-4 animate__animated animate__shakeX'
            selectedToEdit={selectedProductArr.length > 0 ? selectedProductArr : editDiscount}
            />
        )
    }
    

    useEffect(() => {
        if (discountData) {
            setDiscountToEdit(discountData);
            setEditDiscount(discountData.products.map(i=>{return {id : i.id , value : i.title}}))
            const productIDS = discountData.products.map(i=>i.id).join('-')

            setReinitalValues({
                title : discountData.title || '' ,
                code : discountData.code || '' ,
                percent : discountData.percent || '' ,
                expire_at : convertDate(discountData.expire_at) || '' ,
                for_all : discountData.for_all ? true : false  ,
                product_ids : productIDS ,
            })
            
        }
        else {
            setDiscountToEdit(null);
        }
    }, [discountData]);

    return (
        <>
            <ModalsContainer
            className='show d-block animate__animated animate__fadeInDown animate__fast'
            id={'add_discount_modal'}
            fullscreen={true}
            title={discountData ? 'ویرایش کد تخفیف' : 'افزودن کد تخفیف'}
            closeFunction={()=>navigate(-1)}
            >
                {
                    <div className="container modal_maxWidth">
                        <Formik
                        initialValues={reinitalValues || initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values , submitProps)=>onSubmit(values , submitProps , navigate ,
                        handleGetDiscount , discountToEdit , setDiscountToEdit , setReinitalValues)}
                        validateOnMount
                        enableReinitialize
                        >
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
                                         placeholder="فقط حروف و اعداد بنویسید ."
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
                                         initialDate={discountToEdit?.expire_at || undefined}
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
                                            handleSetProductSelectBix(formik)
                                        : null}
                                        <div>
                                            <ErrorMessage className='border' name={'product_ids'}
                                            component={PersonalError} />
                                        </div>
                                


                                        <SubmitBTN formik={formik} isValid={false} />                                   
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
