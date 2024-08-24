import React, { useEffect, useState } from 'react';
import '../../../../assets/style/UiStyle.css'
import PaginatedTable from '../../../../components/tableComponent/PaginatedTable';
import PrevPageBTN from '../../../../UI/All/PrevPageBTN';
import {useLocation } from 'react-router-dom';
import ShowInFilter from './ShowInFilter';
import AtrrAction from './AtrrAction';
import { deleteCategoryAtrrService, getCategoriesAtrrsService, getOneCategoryAtrrService } from '../../../../services/shop/categorories/categoryAttr';
import { Confirm } from '../../../../utils/confirm';
import { Alert } from '../../../../utils/alert';
import AddAttrCategory from './AddAttrCategory';



const AtrrCategory = () => {
    const location = useLocation();
    const [data , setData] = useState([]);
    const [reinitalValues , setReinitalValues] = useState(null);
    const [isLoading , setLoading] = useState(true);
    const [isLoadingEdit , setIsLoadingEdit] = useState(false);
    const [attrToEdit , setAttrToEdit] = useState(null);

    // This is for get categories Attrs
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

    // This is for get one category Attr
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

    // This is for delete cateogry attr
    const handleDeleteCategoryAttr = async (rowAttr)=>{
        if (await Confirm(`آیا از حذف ویژگی ${rowAttr.title} اطمینان دارید ؟`)) {
            try {
                const res = await deleteCategoryAtrrService(rowAttr.id);
                if (res.status == 200) {
                    Alert('عملیات با موفقیت انجام شد .' ,
                    `ویژگی ${rowAttr.title} با موفقیت حذف شد .` , 'success');
                    handleGetCateogryAttrs();
                }
            } catch (error) {
               // set error in httpService 
            }
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
            element : (itemId , rowData)=> <AtrrAction rowData={rowData} attrToEdit={attrToEdit}
            setAttrToEdit={setAttrToEdit} handleDeleteCategoryAttr={handleDeleteCategoryAttr} />
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
                {/* ==== Add Attr ==== */}
                <AddAttrCategory reinitalValues={reinitalValues} isLoadingEdit={isLoadingEdit}
                location={location} attrToEdit={attrToEdit} 
                handleGetCateogryAttrs={handleGetCateogryAttrs} setAttrToEdit={setAttrToEdit}
                setReinitalValues={setReinitalValues} />
                {/* ==== Add Attr ==== */}


                {/* ==== Table ==== */}
                <hr/>
                <div className={`${isLoading ? 'mb-0' : 'mb-3'} mt-4 w-100 d-flex justify-content-center`} >
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
                {/* ==== Table ==== */}
            </div>
            <PrevPageBTN />
        </>
    );
}

export default AtrrCategory;
