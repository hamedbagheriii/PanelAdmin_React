import React from 'react';
import {Formik ,Form} from 'formik';
import SpinnerLoad from '../../../../UI/All/SpinnerLoad';
import { initialValues, onSubmit, validationSchema } from './core';
import FormikControl from '../../../../components/form/FormikControl';

const AddAttrCategory = ({reinitalValues , isLoadingEdit , location , handleGetCateogryAttrs
    , attrToEdit ,setAttrToEdit ,  setReinitalValues}) => {
        
    return (
        <>
            <Formik
                 initialValues={reinitalValues || initialValues}
                 onSubmit={(values , submitProps)=>onSubmit(values , submitProps ,
                (location.state.categoryData.id) , handleGetCateogryAttrs , attrToEdit ,
                setAttrToEdit , setReinitalValues)}
                 validationSchema={validationSchema}
                 validateOnMount={true}
                 enableReinitialize={true}
                >
                    {(formik)=>{
                        return(
                            <Form className="row justify-content-center input_dark">
                                {!isLoadingEdit ?
                                    <div className="row my-3">
                                        <FormikControl
                                         type='text'
                                         control='input'
                                         name='title'
                                         placeholder="عنوان ویژگی جدید"
                                         className='col-12 col-md-5 mx-auto'
                                         label='عنوان'
                                        />
                                        <FormikControl
                                         type='text'
                                         control='input'
                                         name='unit'
                                         placeholder="واحد ویژگی جدید"
                                         className='col-12 col-md-5 mx-auto mt-4 mt-md-0 '
                                         label='واحد'
                                        />
                                        <div className="col-12 mt-2">
                                            <FormikControl
                                             type='checkbox'
                                             control='switch'
                                             name='in_filter'
                                             label="نمایش در فیلتر"
                                            /> 
                                        </div>

                                        <div className="col-12 d-flex justify-content-center gap-3 align-items-center mt-3">
                                            {attrToEdit ?
                                                <button type="button" className="btn btn-danger modal-btn w-25"
                                                onClick={()=>{
                                                setAttrToEdit(null)
                                                setReinitalValues(null)}}>
                                                    انصراف
                                                </button>
                                            : null }
                                            <button type='submit' className="btn btn-primary modal-btn bt w-25"
                                            disabled={formik.isSubmitting || (!formik.dirty || !formik.isValid)}>
                                                {formik.isSubmitting ?
                                                    <SpinnerLoad colorClass={'text-white'} inline={true} isSmall />
                                                : 'ذخیره'}
                                            </button>
                                        </div>
                                    </div>
                                :
                                    <div className='w-100 mt-2'>
                                        <div className='w-100 fs-6 fw-bold alert text-center alert-primary' >
                                            <SpinnerLoad  />
                                            <span className='fs-5 mt-1'>
                                                لطفا کمی صبر کنید . . .
                                            </span>
                                        </div>
                                    </div>
                                }
                            </Form>
                        )
                    }}
            </Formik>  
        </>
    );
}

export default AddAttrCategory;
