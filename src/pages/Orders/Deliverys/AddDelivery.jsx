import React, { useEffect, useState } from 'react';
import ModalsContainer from '../../../components/ModalsContainer';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { initialValues, onSubmit, validationSchema } from './core';
import FormikControl from '../../../components/form/FormikControl';
import SubmitBTN from '../../../components/form/SubmitBTN';

const AddDelivery = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const deliveryData = location.state?.deliveryData
    const [reinitalValues , setReinitalValues] = useState(null);
    const {handleGetDeliveries} = useOutletContext()


    useEffect(() => {
        if (deliveryData) {
            setReinitalValues(deliveryData)
        }
    }, [deliveryData]);

    return (
        <>
            <ModalsContainer
            id={'add_delivery_modal'}
            fullscreen={true}
            className='show d-block animate__animated animate__fadeInDown animate__fast'
            title={deliveryData ? 'ویرایش روش ارسال' : 'افزودن روش ارسال'}
            closeFunction={()=>navigate(-1)}
            >
                <Formik
                initialValues={reinitalValues|| initialValues}
                onSubmit={(values,submitProps)=>onSubmit(values,submitProps,navigate,handleGetDeliveries,
                reinitalValues , setReinitalValues)}
                validationSchema={validationSchema}
                validateOnMount
                enableReinitialize
                >
                    {(formik)=>{
                        return (
                            <Form className="container">
                                <div className="row justify-content-center">
                                    <FormikControl 
                                     name='title'
                                     type='text'
                                     label='عنوان'
                                     control='input'
                                     placeholder="فقط حروف و اعداد بنویسید ."
                                     required={true}
                                    />

                                    <FormikControl 
                                     name='amount'
                                     type='text'
                                     label='هزینه'
                                     control='input'
                                     placeholder="فقط عدد (تومان) بنویسید ."
                                     required={true}
                                    />

                                    <FormikControl 
                                     name='time'
                                     type='number'
                                     label='مدت ارسال'
                                     control='input'
                                     placeholder="فقط اعداد بنویسید ."
                                     required={true}
                                    />
                      
                                    <FormikControl 
                                     name='time_unit'
                                     type='text'
                                     label='واحد مدت ارسال'
                                     control='input'
                                     placeholder="فقط حروف و اعداد بنویسید ."
                                     required={true}
                                    />

                                    <SubmitBTN formik={formik} closeModal />                                   
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </ModalsContainer>
        </>
    );
}

export default AddDelivery;
