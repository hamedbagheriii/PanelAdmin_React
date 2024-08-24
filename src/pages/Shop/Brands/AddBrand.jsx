import React from 'react';
import BtnModal from '../../../UI/pages/btnModal';
import ModalsContainer from '../../../components/ModalsContainer';
import { Form, Formik } from 'formik';
import { initialValues, onSubmit, validationSchema } from './core';
import SubmitBTN from '../../../components/form/SubmitBTN';
import FormikControl from '../../../components/form/FormikControl';

const AddBrand = ({handleGetBrands}) => {

    return (
        <>
            <BtnModal id={`add_brand_modal`} />

            <ModalsContainer
            id={'add_brand_modal'}
            fullscreen={true}
            title={'افزودن برند'}
            >
                <Formik
                initialValues={initialValues}
                onSubmit={(values , submitProps)=>onSubmit(values , submitProps , handleGetBrands)}
                validationSchema={validationSchema}
                validateOnMount={true}
                >
                    {(formik)=>{
                        return (
                            <Form className='w-100 mx-auto'>
                                <div className="container modal_maxWidth">
                                    <div className="row justify-content-center">
                                        <FormikControl 
                                         name='original_name'
                                         type='text'
                                         className=''
                                         label='عنوان لاتیتن برند'
                                         placeholder='کیبرد را در حالت لاتین قرار دهید'
                                         control='input'
                                        />

                                        <FormikControl 
                                         name='persian_name'
                                         type='text'
                                         className='mt-4'
                                         label='عنوان فارسی برند'
                                         placeholder='کیبرد را در حالت فارسی قرار دهید'
                                         control='input'
                                        />

                                        <FormikControl 
                                         name='descriptions'
                                         type='text'
                                         className='mt-4 mb-4'
                                         label='توضیحات برند'
                                         placeholder='متن کوتاه در مورد برند'
                                         control='input'
                                        />

                                        <FormikControl 
                                         name='logo'
                                         label='تصویر'
                                         placeholder='تصویر'
                                         control='file'
                                         formik={formik}
                                        />
                                    </div>
                                </div>
                                <SubmitBTN formik={formik} closeModal={true} />
                            </Form>
                        )
                    }}
                </Formik>
            </ModalsContainer>   
        </>
    );
}

export default AddBrand;
