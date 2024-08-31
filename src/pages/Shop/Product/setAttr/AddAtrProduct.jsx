import React, { useEffect, useMemo, useState } from 'react';
import '../../../../assets/style/UiStyle.css'
import PageContainer from '../../../../components/PageContainer';
import { ErrorMessage, FastField, Field, Form, Formik } from 'formik';
import SpinnerLoad from '../../../../UI/All/SpinnerLoad';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCategoriesAtrrsService } from '../../../../services/shop/categorories/categoryAttr';
import LoadingAlert from '../../../../UI/All/LoadingAlert';
import PrevPageBTN from '../../../../UI/All/PrevPageBTN';
import * as Yup from 'yup';
import { initializingData, onSubmit } from './core';
import PersonalError from '../../../../components/form/personalComponenet/personalError';



const AddAtrrProduct = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {productData} = location.state;
    const [attrs , setAttrs] = useState();
    const [isLoading , setIsLoading] = useState(true);
    const [initialValues , setInitialValues] = useState(null);
    const [editToAttr , setEditToAttr] = useState(null);
    const [validationSchema , setVlidationSchema] = useState(null);

    const handleGetCategoriesAttr = async ()=>{
        const {attrsVar , initals , rules} = await initializingData(productData , setEditToAttr);
        setAttrs(attrsVar);
        setInitialValues(initals);
        setVlidationSchema(Object.keys(rules).length > 0 ? Yup.object(rules) : null);
        setTimeout(() => {
            setIsLoading(false)
        }, 500);
    }

    
    useEffect(() => {
        handleGetCategoriesAttr();
    }, []);



    return (

        <div className='w-100 h-75'>
            <PageContainer title={`افزودن ویژگی به محصول ${productData.title}`} />
            <hr className='w-100 bg-white pt-1 mx-auto  rounded-3' />
            {isLoading ?
                <LoadingAlert/>
            : initialValues && validationSchema ?
                <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values,submitProps)=>onSubmit(values,submitProps,productData.id,productData.title,
                navigate, editToAttr , setEditToAttr)}
                validateOnMount
                >
                    {(formik)=>{
                        return (
                            <Form className="container modal_maxWitdh input_dark">
                                {   
                                    attrs ?
                                        attrs.map((attr , index)=>(
                                            <div key={'group'+index} className="row justify-content-center mt-4">
                                                <span className='text-center text-white fs-6 fw-bold'>
                                                    گروه : <span className='text-primary'>{attr.groupTitle}</span>
                                                </span>
                                                <hr className='w-75 bg-white  my-3 mx-auto rounded-3' />
                                                {
                                                    attr.data.length > 0 ? (
                                                        attr.data.map(attrData=>(
                                                            <div key={attrData.id} className="col-12">
                                                                <div className="input-group my-3 dir_ltr">
                                                                    <span className="input-group-text w_6rem justify-content-center">{attrData.unit}</span>
                                                                    <Field type="text" className="form-control" placeholder="" name={attrData.id} />
                                                                    <span className="input-group-text w_8rem justify-content-center">{attrData.title}</span>
                                                                </div>
                                                                <ErrorMessage name={attrData.id} component={PersonalError} />
                                                            </div>  
                                                        ))
                                                    ) : (
                                                        <div className='w-100 '>
                                                            <LoadingAlert title={'ویژگی پیدا نشد .'} bgColor='warning' spinner={false} />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        ))
                                    : (
                                        <LoadingAlert title={'ویژگی پیدا نشد .'} bgColor='warning' spinner={false} />
                                    )
                                }
                                <div className="modal-footer mx-0 mt-4 w-100 d-flex justify-content-around">
                                    <button type='submit' className="btn btn-primary modal-btn w-50" 
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
            : (
                <LoadingAlert title={`ویژگی در دسته بندی ${attrs[0].groupTitle} پیدا نشد .`} bgColor='warning' spinner={false} >
                    <hr />
                    <span className='w-100 text-center my-2 d-block mx-auto'>برای 
                        <Link style={{textDecoration:'none'}} to={`/Category`}> مشاهده و افزودن</Link> ویژگی به دسته بندی ،
                        به بخش ویژگی های دسته بندی مورد نظر بروید .
                    </span>
                </LoadingAlert>
            )}
            <PrevPageBTN />
        </div>

    );
}

export default AddAtrrProduct;
