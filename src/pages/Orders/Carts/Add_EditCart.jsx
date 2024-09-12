import React, { useEffect, useState } from 'react';
import ModalsContainer from '../../../components/ModalsContainer';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { ErrorMessage, Form, Formik } from 'formik';
import { initialValues, onSubmit, validationSchema } from './core';
import { getAllProductsTitlesService, getOneProductService } from '../../../services/shop/product/product';
import FormikControl from '../../../components/form/FormikControl';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import PersonalError from '../../../components/form/personalComponenet/personalError';

const Add_EditCart = () => {
    const navigate = useNavigate();
    const {handleGetCarts} = useOutletContext()
    const location = useLocation()
    const cartData = location.state?.cartData
    const [allProducts , setAllProducts] = useState([]); // همه محصولات
    const [currentProducts , setCurrentProducts] = useState(null); // محصول انتخاب شده
    const [colors , setColors] = useState([]);
    const [guarantees , setGuarantees] = useState([]);
    const [selectedProducts , setSelectedProducts] = useState([]);
    const [selectedProductsInfo , setSelectedProductsInfo] = useState([]);
    const [reinitalValues , setReinitalValues] = useState(null);


    // this is for get All Product
    const handleGetAllProductsTitles = async ()=>{
        try {
            const res = await getAllProductsTitlesService();
            if (res.status == 200) {
                setAllProducts(res.data.data.map(p=>{return {name : p.title , value : p.id}}))
            }            
        }
        catch (error) {
        }
    }

    const handleChangeSelectedProduct = async (e , formik)=>{
        formik.setFieldValue('product_id', e)
        try {
            const res = await getOneProductService(e);
            if (res.status == 200) {
                const product = res.data.data;
                setCurrentProducts(product)
                // {name : g.title , value : g.id} : مقادیر دریافتی کامپوننت سبد خرید
                setGuarantees(product.guarantees.map(g=>{return {name : g.title , value : g.id}}));
                setColors(product.colors.map(c=>{return {name : c.title , value : c.id}}));
            }
        } 
        catch (error) {
        }
    }







    useEffect(() => {
        handleGetAllProductsTitles();        
    }, []);

    useEffect(() => {
        if (cartData) {
            setReinitalValues(cartData) 
        }
    }, [cartData]);

    return (
        <>
            <ModalsContainer
            id={'edit_add_cart_modal'}
            fullscreen={true}
            className='show d-block animate__animated animate__fadeInDown animate__fast'
            title={cartData ? ' ویرایش سبد خرید' : 'افزودن سبد خرید'}
            closeFunction={()=>navigate(-1)}
            >
                <Formik
                initialValues={initialValues}
                onSubmit={(values,submitProps)=>onSubmit(values,submitProps,handleGetCarts)}
                validationSchema={validationSchema}
                validateOnMount
                >
                    {(formik)=>{
                        // console.log(formik.values);
                        return (
                            <div className="container modal_maxWidth">
                                <Form>
                                    <div className="row my-3 justify-content-center">
                                        <FormikControl 
                                         name='user_id'
                                         type='number'
                                         label='آیدی مشتری'
                                         control='input'
                                         placeholder="فقط عدد بنویسید ."
                                         required={true}
                                        />


                                        <div className='col-12 input_dark mb-3'>
                                            <SelectSearch options={allProducts} search={true}
                                            placeholder="محصول مورد نظر را انتخاب کنید ..."  
                                            onChange={(e)=>handleChangeSelectedProduct(e,formik)} />
                                            <ErrorMessage name='product_id' component={PersonalError} />
                                        </div>
                                        
                                        <div className='col-12 input_dark mb-3'>
                                            <SelectSearch disabled={colors.length ? false : true} options={colors} search={true}
                                            placeholder="رنگ مورد نظر را انتخاب کنید ..."  
                                            onChange={(e)=>formik.setFieldValue('color_id',e)} />
                                            <ErrorMessage name='color_id' component={PersonalError} />
                                        </div>

                                        <div className='col-12 input_dark  mb-3'>
                                            <SelectSearch disabled={guarantees.length ? false : true} options={guarantees} search={true}
                                            placeholder="گارانتی مورد نظر را انتخاب کنید ..."  
                                            onChange={(e)=>formik.setFieldValue('guarantee_id',e)} />
                                            <ErrorMessage name='guarantee_id' component={PersonalError} />
                                        </div>

                                        <FormikControl 
                                         name='count'
                                         type='number'
                                         label='تعداد'
                                         control='input'
                                         placeholder="فقط عدد بنویسید ."
                                         required={true}
                                        />

                                        <div className="col-4  d-flex justify-content-center align-items-center my-1">
                                            <button type='submit' className='btn btn-primary'>اضافه کردن</button>
                                        </div>
                                        <hr className="mt-3"/>
                                    </div>
                                </Form>


                                <div className="row justify-content-center">
                                    <div className="col-12 col-md-6 col-lg-8">
                                        <div className="input-group my-3 dir_ltr">
                                            <span className="input-group-text justify-content-center w_15" >عدد</span>
                                            <input type="number" className="form-control text-center w_15" placeholder=""  defaultValue="50" />
                                            <span className="input-group-text text-end w_70 font_08 d-flex align-items-center text_truncate">
                                                <i className="fas fa-times text-danger hoverable_text pointer mx-1 has_tooltip" title="حذف محصول از سبد" data-bs-placement="top"></i>
                                                محصول شماره 1
                                                ( 100هزار تومان)
                                                ( گارانتی فلان)
                                                <i className="fas fa-circle mx-1" style={{color:'#000'}}></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-8">
                                        <div className="input-group my-3 dir_ltr">
                                            <span className="input-group-text justify-content-center w_15" >عدد</span>
                                            <input type="number" className="form-control text-center w_15" placeholder=""  defaultValue="5"/>
                                            <span className="input-group-text text-end w_70 font_08 d-flex align-items-center text_truncate">
                                                <i className="fas fa-times text-danger hoverable_text pointer mx-1 has_tooltip" title="حذف محصول از سبد" data-bs-placement="top"></i>
                                                محصول ویژه و مورد خاص شماره 2
                                                ( 100هزار تومان)
                                                ( گارانتی فلان)
                                                <i className="fas fa-circle mx-1" style={{color:'rgb(236, 16, 16)'}}></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="input-group my-3 dir_ltr">
                                            <span className="input-group-text justify-content-center w-75" >200,000 تومان</span>
                                            <span className="input-group-text w-25 text-center"> جمع کل </span>
                                        </div>
                                    </div>
                                    <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                                        <button className="btn btn-primary ">ذخیره</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                </Formik>
            </ModalsContainer>
        </>
    );
}

export default Add_EditCart;
