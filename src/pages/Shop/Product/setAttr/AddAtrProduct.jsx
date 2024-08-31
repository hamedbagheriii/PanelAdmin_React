import React, { useEffect, useMemo, useState } from 'react';
import '../../../../assets/style/UiStyle.css'
import PageContainer from '../../../../components/PageContainer';
import { Form, Formik } from 'formik';
import SpinnerLoad from '../../../../UI/All/SpinnerLoad';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCategoriesAtrrsService } from '../../../../services/shop/categorories/categoryAttr';
import LoadingAlert from '../../../../UI/All/LoadingAlert';
import SubmitBTN from '../../../../components/form/SubmitBTN';
import PrevPageBTN from '../../../../UI/All/PrevPageBTN';

const AddAtrrProduct = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {productData} = location.state;
    const [attrs , setAttrs] = useState();
    const [isLoading , setIsLoading] = useState(true);

    const handleGetCategoriesAttr = async ()=>{
        // در زمانی که میخوایم چند رکوست پشت هم به سرور بزنیم بهتره از promise.all استفاده کنیم
        Promise.all (
            productData.categories.map(async (cat)=>{
                const res = await getCategoriesAtrrsService(cat.id)
                if (res.status == 200 ) {
                    setAttrs(oldData=>{
                        return oldData
                        ? [...oldData , {groupTitle : cat.title , data : res.data.data}]
                        : [{groupTitle : cat.title , data : res.data.data}]
                    })
                    setIsLoading(false)
                }
            })
        )
    }

    const getData = useMemo(
        ()=> {
            if (!attrs) {
                handleGetCategoriesAttr()
            }
        } ,
        [productData.categories]
    )
    

    return (
        <Formik>
             {(formik)=>{
                 return (
                     <div className='w-100 h-75'>
                        <PageContainer title={`افزودن ویژگی به محصول ${productData.title}`} />
                        <hr className='w-100 bg-white pt-1 mx-auto  rounded-3' />
                        {isLoading ?
                            <LoadingAlert/>
                        :
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
                                                                    <input type="text" className="form-control" placeholder="" />
                                                                    <span className="input-group-text w_8rem justify-content-center">{attrData.title}</span>
                                                                </div>
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
                        }
                        <PrevPageBTN />
                    </div>
                 )
             }}
        </Formik>
    );
}

export default AddAtrrProduct;
