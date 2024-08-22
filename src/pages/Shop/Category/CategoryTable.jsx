import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../../components/tableComponent/PaginatedTable';
import AddCategory from './AddCategory';
import { deleteCategoryService, getCategoriesService } from '../../../services/shop/category';
import IsActive from './tableAdditons/isActive';
import Actions from './tableAdditons/Actions';
import { useNavigate, useParams } from 'react-router-dom';
import { convertDate } from '../../../utils/convertDate';
import { Confirm } from '../../../utils/confirm';
import { Alert } from '../../../utils/alert';

const CategoryTable = () => {
    const params = useParams();
    const [data , setData] = useState([]);
    const [isLoading , setLoading] = useState(true);
    const navigate = useNavigate();

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

    useEffect(() => {
        handleGetCategories()
        setLoading(true)
    }, [params]);

    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'title' , title : 'عنوان'},
        {field : 'parent_id' , title : 'والد'},
    ]
    
    const additionField = [
        // تبدیل تاریخ میلادی به شمسی
        {   
            field : 'created_at' ,
            title : 'تاریخ ثبت' ,
            element : (itemId ,rowData)=> (
                <td>
                    {convertDate(rowData.created_at)}
                </td>
            )
        } ,
        {
            field : 'is_active' ,
            title : 'وضعیت' ,
            element : (itemId ,rowData)=> <IsActive rowData={rowData} />
        } ,
        {
            field : 'Operation' ,
            title : 'عملیات' ,
            element : (itemId , rowData)=> <Actions rowData={rowData}
            handleDeleteCategory={handleDeleteCategory} />
        } ,
    ]

    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از عنوان را وارد کنید .' ,
        searchField : 'title'
    }

    return (
        <>
            <PaginatedTable data={data} dataInfo={dataInfo} additionField={additionField}
             searchParams={searchParams} numOfPage={4} isLoading={isLoading}>
                {/* --- Modal add Category --- */}
                <AddCategory  />
            </PaginatedTable>
        </>
    );
}

export default CategoryTable;