import React, { useEffect, useState } from 'react';
import PageContainer from '../../../components/PageContainer';
import { ErrorMessage, Form, Formik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import SpinnerLoad from '../../../UI/All/SpinnerLoad';
import { initialValues, onSubmit, validationSchema } from './core';
import FormikControl from '../../../components/form/FormikControl';
import { getCategoriesService } from '../../../services/shop/categorories/category';
import LoadingAlert from '../../../UI/All/LoadingAlert';
import PersonalError from '../../../components/form/personalComponenet/personalError';
import { getBrandsService } from '../../../services/shop/brand/brand';
import { getColorsService } from '../../../services/shop/color/colors';
import { getGuarantiesService } from '../../../services/shop/Guaranties/guaranties';
import SubmitBTN from '../../../components/form/SubmitBTN';


const AddProduct = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const productToEdit = location.state?.productToEdit;
    const [parentCategories , setParentCategories] = useState([]);
    const [mainCategories , setMainCategories] = useState(null);
    const [isLoading , setIsLoading] = useState(true);
    const [brands , setBrands] = useState([]);
    const [colors , setColors] = useState([]);
    const [guaranties , setGuaranties] = useState([]);
    const [reinitalValues , setReinitalValues] = useState(null);

    const [selectedCategories , setSelectedCategories] = useState([]);
    const [selectedColors , setSelectedColors] = useState([]);
    const [selectedGuarantees , setSelectedGuarantees] = useState([]);

    // get all categories 
    const getAllParentCategories = async ()=>{
        try {
            const res = await getCategoriesService();
            if (res.status == 200) {
                setParentCategories(res.data.data.map(d=>(
                    {id : d.id , value : d.title}
                )))
            }
        } catch (error) {
            // set error in httpService
        }
        finally {
            setIsLoading(false);
        }
    }

    // this is for get and set main Categories
    const handleSetMainCategories = async (value)=>{
        setMainCategories('waiting');
        if (value > 0) {
            try {
                const res = await getCategoriesService(value);
                if(res.status == 200){
                    setMainCategories(res.data.data.map(d=>(
                        {id : d.id , value : d.title}
                    )))
                }
            } catch (error) {
                //set error in httpService
                setMainCategories(null);
            }
        }
        else{
            setMainCategories(null);
        }
    }

    // get all brands 
    const getAllBrands = async ()=>{
        try {
            const res = await getBrandsService();
            if (res.status == 200) {
                setBrands(res.data.data.map(d=>(
                    {id : d.id , value : d.original_name}
                )))
            }
        } catch (error) {
            // set error in httpService
        }
        finally {
            setIsLoading(false);
        }
    }

    // get all Colors 
    const getAllColors = async ()=>{
        try {
            const res = await getColorsService();
            if (res.status == 200) {
                setColors(res.data.data.map(d=>(
                    {id : d.id , value : d.title}
                )))
            }
        } catch (error) {
            // set error in httpService
        }
        finally {
            setIsLoading(false);
        }
    }

    // get all guaranties 
    const getAllGuaranties = async ()=>{
        try {
            const res = await getGuarantiesService();
            if (res.status == 200) {
                setGuaranties(res.data.data.map(d=>(
                    {id : d.id , value : d.title}
                )))
            }
        } catch (error) {
            // set error in httpService
        }
        finally {
            setIsLoading(false);
        }
    }

    // this is for set data in selectChips box then productToEdit 
    const setInitalSelectedValues = ()=>{
        setSelectedCategories(productToEdit.categories.map(d=> ({id : d.id , value : d.title})))
        setSelectedColors(productToEdit.colors.map(d=> ({id : d.id , value : d.title})))
        setSelectedGuarantees(productToEdit.guarantees.map(d=> ({id : d.id , value : d.title})))
        setMainCategories([]);
    }






    // this is for calling get all data funcations
    useEffect(() => {
        getAllParentCategories();
        getAllBrands();
        getAllColors();
        getAllGuaranties();
    }, []);

    // this is for set data then change productToEdit 
    useEffect(() => {
        if (productToEdit) {
            for (const key in productToEdit) {
                if(productToEdit[key] == null) productToEdit[key] = ''
            }
            setReinitalValues({
                ...productToEdit ,
                category_ids : productToEdit.categories.map(c=>c.id).join('-') ,
                color_ids : productToEdit.colors.map(c=>c.id).join('-') ,
                guarantee_ids : productToEdit.guarantees.map(c=>c.id).join('-') ,
                image : null ,
                categories : null ,
                colors : null ,
                guarantees : null
            });

            setInitalSelectedValues();
        }
        else {
            setReinitalValues(null);
        }
    }, [productToEdit]);

    return (
        <>
            <PageContainer title={productToEdit ? `ویرایش محصول ${productToEdit.title}` : 'افزودن محصول جدید'} />
            <hr  className='w-75 mx-auto bg-white pt-1 rounded-3'/>
            {!isLoading ?
                    <Formik
                    initialValues={reinitalValues || initialValues}
                    onSubmit={(values , submitProps)=>onSubmit(values , submitProps , navigate , productToEdit
                    , setReinitalValues )}
                    validationSchema={validationSchema}
                    validateOnMount={true}
                    enableReinitialize
                    >
                        {(formik)=>{
                            return (
                                <Form className='w-100'>
                                    <div className="container h-100 pt-3 modal_maxWidth input_dark">
                                        <div className="row mx-auto align-items-center justify-content-center h-100 gap-2"> 
                                            <div className="col-12 mb-0">
                                                <FormikControl 
                                                control='select'
                                                options={parentCategories}
                                                name='parentCats'
                                                label='دسته والد'
                                                firstItem='دسته والد را انتخاب کنید . . .'
                                                handleOnChange={handleSetMainCategories}
                                                required={true}
                                                />
                                            </div>  

                                            <FormikControl 
                                            control='searchableSelect'
                                            options={mainCategories}
                                            label={'دسته اصلی'}
                                            formik={formik}
                                            name={'category_ids'}
                                            firstItem='دسته اصلی را انتخاب کنید . . .'
                                            required={true}
                                            selectedToEdit={selectedCategories}
                                            />

                                            <div className='col-6 ms-auto'>
                                                <ErrorMessage name='category_ids' component={PersonalError} />
                                            </div>

                                            <FormikControl 
                                            control='input'
                                            label='عنوان'
                                            type='text'
                                            placeholder='عنوان محصول'
                                            name='title'
                                            required={true}
                                            />

                                            <FormikControl 
                                            control='input'
                                            label='قیمت'
                                            type='text'
                                            placeholder='فقط از عداد استفاده کنید (تومان)'
                                            name='price'
                                            required={true}
                                            />

                                            <FormikControl 
                                            control='input'
                                            label='موجودی'
                                            type='number'
                                            placeholder="فقط عدد"
                                            name='stock'
                                            required={true}
                                            />

                                            <FormikControl 
                                            control='input'
                                            label='وزن'
                                            type='text'
                                            placeholder='فقط از عداد استفاده کنید (گرم)'
                                            name='weight'
                                            />
 
                                            <FormikControl 
                                            control='select'
                                            label='برند'
                                            options={brands}
                                            name='brand_id'
                                            firstItem='برند مورد نظر را انتخاب کنید . . .'
                                            />

                                            <FormikControl 
                                            control='searchableSelect'
                                            options={colors}
                                            label={'رنگ'}
                                            formik={formik}
                                            name={'color_ids'}
                                            firstItem='رنگ مورد نظر را انتخاب کنید . . .'
                                            chipsName='رنگ'
                                            selectedToEdit={selectedColors}
                                            />

                                            <FormikControl 
                                            control='searchableSelect'
                                            options={guaranties}
                                            label={'گارانتی'}
                                            formik={formik}
                                            name={'guarantee_ids'}
                                            firstItem='گارانتی مورد نظر را انتخاب کنید . . .'
                                            chipsName='گارانتی'
                                            selectedToEdit={selectedGuarantees}
                                            />

                                            <FormikControl
                                            control='ckEditor'
                                            label='توضیحات'
                                            type='text'
                                            placeholder='فقط از حروف و اعداد استفاده شود . . .'
                                            name='descriptions'
                                            />

                                            <FormikControl 
                                            control='textarea'
                                            label='توضیحات کوتاه'
                                            type='text'
                                            placeholder='توضیحات . . .'
                                            name='short_descriptions'
                                            />

                                            <FormikControl 
                                            control='textarea'
                                            label='توضیحات کارت'
                                            type='text'
                                            placeholder='توضیحات . . .'
                                            name='cart_descriptions'
                                            />
 
                                           {!productToEdit ?
                                                <FormikControl 
                                                control='file'
                                                name='image'
                                                label='تصویر'
                                                formik={formik}
                                                />
                                            : null }

                                            <FormikControl 
                                            control='input'
                                            label='توضیح تصویر'
                                            type='text'
                                            placeholder="یک کلمه در مورد تصویر"
                                            name='alt_image'
                                            />

                                            <FormikControl 
                                            control='input'
                                            label='تگ ها'
                                            type='text'
                                            placeholder="با - از هم جدا شوند"
                                            name='keywords'
                                            />
 
                                            <FormikControl 
                                            control='input'
                                            label='درصد تخفیف'
                                            type='number'
                                            placeholder="فقط عدد"
                                            name='discount'
                                            />
                                             
                                        </div>
                                    </div>

                                    <hr className='w-100 pt-1 mt-4 bg-white' />
                                    <SubmitBTN formik={formik} isValid={false} isModal={false}/>
                                </Form>
                            )
                        }}
                    </Formik>
                :
                    <div className='w-100 mt-4'>
                        <LoadingAlert />
                    </div>
                }
        </>
    );
}

export default AddProduct;
