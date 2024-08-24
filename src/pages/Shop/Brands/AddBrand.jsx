import React, { useEffect, useState } from 'react';
import BtnModal from '../../../UI/pages/btnModal';
import ModalsContainer from '../../../components/ModalsContainer';
import { Form, Formik } from 'formik';
import { initialValues, onSubmit, validationSchema } from './core';
import SubmitBTN from '../../../components/form/SubmitBTN';
import FormikControl from '../../../components/form/FormikControl';
import { getOneBrandService } from '../../../services/shop/brand/brand';


const AddBrand = ({handleGetBrands , setBrandToEdit , brandToEdit}) => {
    const [reinitalValues , setReinitalValues] = useState(null);

    // This is for get one brand
    const handleGetOneBrand = async ()=>{
        try {
            const res = await getOneBrandService(brandToEdit);
            if (res.status == 200) {
                let data = await res.data.data;
                setReinitalValues({original_name : data.original_name ,
                persian_name : data.persian_name || '' , descriptions : data.descriptions || '' ,
                logo : null })
            }
        } catch (error) {
            setBrandToEdit(null);
            setReinitalValues(null);
        }
    }

    // This is for calling edit brand function
    useEffect(() => {
        if (brandToEdit) {
            handleGetOneBrand();
        }
        else{
            setReinitalValues(null);
        }
    }, [brandToEdit]);


    return (
        <>
            <BtnModal id={`add_brand_modal`} setEditId={setBrandToEdit} />

            <ModalsContainer
            id={'add_brand_modal'}
            fullscreen={true}
            title={brandToEdit ? 'ویرایش برند' : 'افزودن برند'}
            >
                <Formik
                initialValues={reinitalValues || initialValues}
                onSubmit={(values , submitProps)=>onSubmit(values , submitProps , handleGetBrands , 
                setBrandToEdit , brandToEdit , setReinitalValues)}
                validationSchema={validationSchema}
                enableReinitialize={true}
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
                                <SubmitBTN formik={formik} closeModal={true} setEditId={setBrandToEdit} />
                            </Form>
                        )
                    }}
                </Formik>
            </ModalsContainer>   
        </>
    );
}

export default AddBrand;
