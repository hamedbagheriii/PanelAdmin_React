import React, { useEffect, useState } from 'react';
import BtnModal from '../../../UI/pages/btnModal';
import ModalsContainer from '../../../components/ModalsContainer';
import { FastField, Form, Formik } from 'formik';
import SubmitBTN from '../../../components/form/SubmitBTN';
import FormikControl from '../../../components/form/FormikControl';
import { initialValues, onSubmit, validationSchema } from './core';

const AddColor = ({setColorToEdit , handleGetColors , colorToEdit}) => {
    const [reinitalValues , setReinitalValues] = useState(null);

    // This is for get one color
    const handleGetOneColor = async ()=>{
        setReinitalValues({id:colorToEdit.id , title:colorToEdit.title ,
        code : colorToEdit.code})
    }

    // This is for calling edit color function
    useEffect(() => {
        setReinitalValues(null);
        if (colorToEdit) {
            handleGetOneColor();
        }
    }, [colorToEdit]);

    return (
        <>
            <BtnModal id={`add_color_modal`} setEditId={setColorToEdit} />
            
            <ModalsContainer
             id={'add_color_modal'}
             fullscreen={true}
             title={'افزودن رنگ'}
             
            >
                <Formik
                initialValues={reinitalValues || initialValues}
                onSubmit={(values , submitProps )=> onSubmit(values , submitProps , handleGetColors , setColorToEdit
                , colorToEdit , setReinitalValues)}
                validationSchema={validationSchema}
                validateOnMount
                enableReinitialize
                >
                    {(formik)=>{
                        return (
                            <Form className="container ">
                                <div className="row justify-content-center">
                                        <FormikControl 
                                        control='input'
                                        label='نام رنگ'
                                        type='text'
                                        placeholder='فقط حروف و عدد بنویسید .'
                                        name='title'
                                        />

                                    <div className="col-12" style={{height:50}}>
                                        <label htmlFor="colorPicker" className="form-label">انتخاب رنگ</label>
                                        <FastField type="color" className="form-control w-100 h-100"
                                        id="colorPicker" name='code' />
                                    </div>                        
                                </div>
                                <SubmitBTN formik={formik} setEditId={setColorToEdit} closeModal={true}/>
                            </Form>
                        )
                    }}
                </Formik>
            </ModalsContainer>
        </>
    );
}

export default AddColor;
