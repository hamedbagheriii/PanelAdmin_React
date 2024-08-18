import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../../components/table/PaginatedTable';
import AddCategory from './AddCategory';
import { getCategoriesService } from '../../../services/shop/category';
import { Alert } from '../../../utils/alert';
import IsActive from './tableAdditons/isActive';
import Actions from './tableAdditons/Actions';

const CategoryTable = () => {
    const [data , setData] = useState([]);

    const handleGetCategories = async ()=>{
        try {
            const res = await getCategoriesService();
            if (res.status == 200) {
                setData(res.data.data);
            }
            else{
                Alert('مشکلی پیش آمده است .' , res.data.message , 'error')
            }
        } catch (error) {
            Alert('مشکلی از سمت سرور رخ داده است .' ,'', 'error')
        }
    }

    useEffect(() => {
        handleGetCategories()
    }, []);

    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'title' , title : 'عنوان'},
        {field : 'created_at' , title : 'تاریخ ثبت'},
    ]
    
    const additionField = [
        {
            field : 'is_active' ,
            title : 'وضعیت' ,
            element : (itemId ,rowData)=> <IsActive rowData={rowData} />
        } ,
        {
            field : 'Operation' ,
            title : 'عملیات' ,
            element : (itemId , rowData)=> <Actions rowData={rowData} />
        } ,
    ]

    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از عنوان را وارد کنید .' ,
        searchField : 'title'
    }

    return (
        <PaginatedTable data={data} dataInfo={dataInfo} additionField={additionField}
         searchParams={searchParams} numOfPage={4} >
            {/* --- Modal add Category --- */}
            <AddCategory/>
        </PaginatedTable>
    );
}

export default CategoryTable;
