import React, { useEffect, useState } from 'react';
import BtnModal from '../../../UI/pages/btnModal';
import ModalsContainer from '../../../components/ModalsContainer';
import { Form, Formik } from 'formik';
import { initialValues, onSubmit, validationSchema } from './core';
import FormikControl from '../../../components/form/FormikControl';
import SubmitBTN from '../../../components/form/SubmitBTN';

const AddGuarantie = ({handleGetGuaranties , guarantiesToEdit ,setGuarantiesToEdit}) => {
    const [reinitalValues , setReinitalValues] = useState(null);


    // This is for get one guarantee
    const handleGetOneGuarantee = ()=>{
        let data = guarantiesToEdit;
        setReinitalValues({title : data.title ,
        descriptions : data.descriptions , length : data.length ,
        length_unit : data.length_unit })
    }

    // This is for Calling get one guarantee function
    useEffect(() => {
        if (guarantiesToEdit) {
            handleGetOneGuarantee();
        } else {
            setReinitalValues(null);
            setGuarantiesToEdit(null);
        }
    }, [guarantiesToEdit]);


    return (
        <>
            <BtnModal id={`add_guarantee_modal`} setEditId={setGuarantiesToEdit} />

            <ModalsContainer
            id={'add_guarantee_modal'}
            fullscreen={true}
            title={'افزودن گارانتی'}
            >
                <Formik
                initialValues={reinitalValues || initialValues}
                onSubmit={(values , submitProps)=>onSubmit(values , submitProps , handleGetGuaranties , 
                setGuarantiesToEdit , guarantiesToEdit , setReinitalValues)}
                validationSchema={validationSchema}
                validateOnMount={true}
                enableReinitialize={true}
                >
                    {(formik)=>{
                        return (
                            <Form className='w-100 mx-auto'>
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <FormikControl 
                                         name='title'
                                         type='text'
                                         label='عنوان گارانتی'
                                         control='input'
                                        />

                                        <FormikControl 
                                         name='descriptions'
                                         type='text'
                                         label='توضیحات گارانتی'
                                         control='textarea'
                                        />

                                        <FormikControl 
                                         name='length'
                                         type='number'
                                         label='مدت گارانتی'
                                         control='input'
                                        />

                            
                                        <FormikControl 
                                         name='length_unit'
                                         type='text'
                                         label='واحد زمانی'
                                         control='input'
                                        />

                                    </div>
                                </div>
                                <SubmitBTN formik={formik} closeModal={true} setEditId={setGuarantiesToEdit} />
                        </Form>
                        )
                    }}
                </Formik>
            </ModalsContainer>   
        </>
    );
}

export default AddGuarantie;
