import React from 'react';
import ModalsContainer from '../../../components/ModalsContainer';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import SubmitBTN from '../../../components/form/SubmitBTN';
import SpinnerLoad from '../../../UI/All/SpinnerLoad';
import FormikControl from '../../../components/form/FormikControl';

const AddRole = () => {
    const navigate = useNavigate();

    return (
        <>
            <ModalsContainer
            className='show d-block animate__animated animate__fadeInDown animate__fast'
            id={'add_role_modal'}
            fullscreen={true}
            title={'افزودن نقش'}
            closeFunction={()=>navigate(-1)}
            >
                <Formik>
                    {(formik)=>{
                        return (
                            <Form className="container">
                                <div className="row justify-content-center">
                                    <FormikControl 
                                     name='title'
                                     type='text'
                                     className=''
                                     label='عنوان نقش'
                                     control='input'
                                     placeholder="فقط از حروف فارسی و لاتین استفاده کنید . ."
                                    required={true}
                                    />

                                    <FormikControl 
                                     name='title'
                                     className=''
                                     label='توضیحات'
                                     control='textarea'
                                     placeholder="فقط از حروف فارسی و لاتین استفاده کنید . ."
                                     required={true}
                                    />
                       
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
            </ModalsContainer>
        </>
    );
}

export default AddRole;
