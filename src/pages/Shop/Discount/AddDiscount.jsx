import React from 'react';
import ModalsContainer from '../../../components/ModalsContainer';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import FormikControl from '../../../components/form/FormikControl';
import SubmitBTN from '../../../components/form/SubmitBTN';
import SpinnerLoad from '../../../UI/All/SpinnerLoad';


const AddDiscount = () => {
    const navigate = useNavigate();

    return (
        <>
            <ModalsContainer
            className='show d-block animate__animated animate__fadeInDown animate__fast'
            id={'add_discount_modal'}
            fullscreen={true}
            title={'افزودن کد تخفیف'}
            closeFunction={()=>navigate(-1)}
            >
                <div className="container modal_maxWidth">
                    <Formik>
                        {(formik)=>{
                            return (
                                <Form className="row justify-content-center w-100 h-100">
                                    <FormikControl 
                                     name='title'
                                     type='text'
                                     className=''
                                     label='عنوان کد'
                                     control='input'
                                     placeholder="کیبرد را در حالت فارسی قرار دهید ."
                                    />

                                     <FormikControl 
                                     name='code'
                                     type='text'
                                     className=''
                                     label='کد تخفیف'
                                     control='input'
                                     placeholder="کیبرد را در حالت لاتین قرار دهید"
                                    />

                                    <FormikControl 
                                     name='percent'
                                     type='number'
                                     className=''
                                     label='درصد تخفیف'
                                     control='input'
                                     placeholder="فقط عدد بنویسید ."
                                    />

                                    <FormikControl 
                                     name='percent'
                                     type='number'
                                     className=''
                                     label='درصد تخفیف'
                                     control='input'
                                     placeholder="فقط عدد بنویسید ."
                                    />   
                                    <div className="col-12 col-md-6 col-lg-8">
                                        <div className="input-group my-3 dir_ltr">
                                            <input type="text" className="form-control" placeholder="مثلا 1400/10/10 " />
                                            <span className="input-group-text w_8rem justify-content-center">تاریخ اعتبار </span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-8 col-md-6 col-lg-8">
                                        <div className="input-group my-3 dir_ltr">
                                            <input type="text" className="form-control" placeholder="قسمتی از نام محصول را وارد کنید" list="brandLists" />
                                            <span className="input-group-text w_8rem justify-content-center">برای</span>
                                            <datalist id="brandLists">
                                                <option value="محصول شماره 1" />
                                                <option value="محصول شماره 2" />
                                                <option value="محصول شماره 3" />
                                            </datalist>
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-8">
                                            <span className="chips_elem">
                                                <i className="fas fa-times text-danger"></i>
                                                محصول 1
                                            </span>
                                            <span className="chips_elem">
                                                <i className="fas fa-times text-danger"></i>
                                                محصول 2
                                            </span>
                                        </div>
                                    </div>    
                                
                                    <div className="modal-footer w-100 d-flex justify-content-around" >
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
                </div>
            </ModalsContainer>
        </>
    );
}

export default AddDiscount;
