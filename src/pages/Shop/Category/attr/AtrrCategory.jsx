import React, { useEffect, useState } from 'react';
import '../../../../assets/style/UiStyle.css'
import PaginatedTable from '../../../../components/tableComponent/PaginatedTable';
import PrevPageBTN from '../../../../UI/All/PrevPageBTN';
import {useLocation, useNavigate } from 'react-router-dom';
import ShowInFilter from './ShowInFilter';
import AtrrAction from './AtrrAction';
import { getCategoriesAtrrsService, getOneCategoryAtrrService } from '../../../../services/shop/categoryAttr';
import {Formik ,Form} from 'formik';
import SpinnerLoad from '../../../../UI/All/SpinnerLoad';
import { initialValues, onSubmit, validationSchema } from './core';
import FormikControl from '../../../../components/form/FormikControl';



const AtrrCategory = () => {
    const location = useLocation();
    const [data , setData] = useState([]);
    const [reinitalValues , setReinitalValues] = useState(null);
    const [isLoading , setLoading] = useState(true);
    const [isLoadingEdit , setIsLoadingEdit] = useState(false);
    const [attrToEdit , setAttrToEdit] = useState(null);

    // get categories Attrs
    const handleGetCateogryAttrs = async ()=>{
        try {
            let categoryID = location.state.categoryData.id;
            const res = await getCategoriesAtrrsService(categoryID);
            if (res.status == 200) {
                setData(res.data.data)
            }
        } catch (error) {
            // set error in httpService
        }
        finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }

    // get one category Attr
    const handleGetCateogryAttr = async ()=>{
        try {
            const res = await getOneCategoryAtrrService(attrToEdit);
            if (res.status == 200) {
                const data = res.data.data ;
                setReinitalValues(
                {title : data.title , unit : data.unit ,
                in_filter : (data.in_filter ? true : false)});
            }
        } catch (error) {
            // set error in httpService
        }
        finally {
            setTimeout(() => {
                setLoading(false);
                setIsLoadingEdit(false);
            }, 500);
        }
    }

    // This is for calling get categories Attrs functions
    useEffect(() => {
        handleGetCateogryAttrs();
        setLoading(true);
    }, []);


    // This is for calling get one category Attr functions
    useEffect(() => {
        if (attrToEdit) {
            handleGetCateogryAttr();
            setIsLoadingEdit(true);
        }
        else{
            setAttrToEdit(null);
            setIsLoadingEdit(false);
        }
    }, [attrToEdit]);


    // This is for inital props <<<<=
    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'title' , title : 'عنوان ویژگی'},
        {field : 'unit' , title : 'واحد'},
    ]

    const additionField = [
        {
            title : 'نمایش در فیلتر' ,
            field : 'in_filter' ,
            element : (itemId , rowData)=> <ShowInFilter rowData={rowData} />
        } ,
        {
            title : 'عملیات' ,
            field : 'operation' ,
            element : (itemId , rowData)=> <AtrrAction rowData={rowData}
            setAttrToEdit={setAttrToEdit} />
        }
    ]
    
    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از نام را وارد کنید .' ,
        searchField : 'title'
    }
    // This is for inital props <<<<=


    return (
        <>
            <div className='mt-4 w-100 d-flex justify-content-center' >
                <h6 className='d-flex fw-bold text-white fs-4'>
                    افزودن ویژگی :
                </h6>
            </div>
            <hr className='bg-white w-75 mx-auto mt-3'/>
            <div className="container text-white">
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
                                         className='col-12 col-md-5 mx-auto mt-4 mt-md-0'
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
                
                {/* ==== table ==== */}
                <hr/>
                <div className={`${isLoading ? 'mb-0 mt-4' : 'mb-3 mt-2'} w-100 d-flex justify-content-center`} >
                    <h6 className='d-flex fw-bold text-primary fs-4'>
                        مدیریت ویژگی های دسته 
                        <span className='text-white text-center pe-2'>
                            {location.state.categoryData.title} :
                        </span>
                    </h6>
                </div>
                <PaginatedTable data={data} dataInfo={dataInfo} additionField={additionField}
                searchParams={searchParams} numOfPage={4} isLoading={isLoading}>
                
                </PaginatedTable>
                {/* ==== table ==== */}

            </div>
            <PrevPageBTN />
        </>
    );
}

export default AtrrCategory;
