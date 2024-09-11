import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../../components/tableComponent/PaginatedTable';
import AddCategory from './AddCategory';
import { deleteCategoryService, getCategoriesService } from '../../../services/shop/categorories/category';
import IsActive from './tableAdditons/isActive';
import Actions from './tableAdditons/Actions';
import { useNavigate, useParams } from 'react-router-dom';
import { convertDate } from '../../../utils/convertDate';
import { Confirm } from '../../../utils/confirm';
import { Alert } from '../../../utils/alert';
import { useHasPermission } from '../../../hook/permissionHook';

const CategoryTable = () => {
    const params = useParams();
    const [data , setData] = useState([]);
    const [isLoading , setLoading] = useState(true);
    const navigate = useNavigate();
    const hasPermission = useHasPermission('create_category')


    // get categories or get category
    const handleGetCategories = async ()=>{
        try {
            const res = await getCategoriesService(params.categoryID);
            if (res.status == 200) {
                setData(res.data.data);
            }
        } catch (error) {
            // set error in httpService
            // finally : یعنی هروقت tryCatch تمام شد در هر صورت این رو اجرا کن
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }
    }

    // delete cateogry
    const handleDeleteCategory = async (rowData)=>{
        if (await Confirm(`آیا از حذف دسته بندی ${rowData.title} مطمعن هستید ؟`)) {
            try {
                const res = await deleteCategoryService(rowData.id);
                if(res.status == 200){
                    setTimeout(() => {
                        Alert(`دسته بندی ${rowData.title} 
                        با موفقیت حذف شد .` , '' , 'success');
                        navigate(`/Category`)
                    }, 0);
                }
            } catch (error) {
                // set error in httpService
            }
        }
    }

    // This is for calling functions
    useEffect(() => {
        handleGetCategories()
        setLoading(true)
    }, [params]);

    // This is for inital props =>>>>
    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'title' , title : 'عنوان'},
        {field : 'parent_id' , title : 'والد'},
        {
            field : null ,
            title : 'تاریخ ثبت',
            element : (rowData)=>{
                return (
                    <>
                        {convertDate(rowData.created_at)}
                    </>
                )
            }
        },
        {
            field : null ,
            title : 'وضعیت',
            element : (rowData)=>{
                return(
                    <IsActive rowData={rowData} />
                )
            }
        },
        {
            field : null ,
            title : 'عملیات',
            element : (rowData)=>{
                return(
                    <Actions rowData={rowData}
                    handleDeleteCategory={handleDeleteCategory} />
                )
            }
        },
    ]

    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از عنوان را وارد کنید .' ,
        searchField : 'title'
    }
    // This is for inital props <<<<=
    
    return (
        <>
            <PaginatedTable data={data} dataInfo={dataInfo} searchParams={searchParams}
            numOfPage={4} isLoading={isLoading}>
                {/* --- Modal add Category --- */}
                {hasPermission ? (
                    <AddCategory />
                ) : null}
            </PaginatedTable>
        </>
    );
}

export default CategoryTable;