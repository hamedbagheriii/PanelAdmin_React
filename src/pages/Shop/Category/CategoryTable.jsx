import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../../components/tableComponent/PaginatedTable';
import AddCategory from './AddCategory';
import { getCategoriesService } from '../../../services/shop/category';
import { Alert } from '../../../utils/alert';
import IsActive from './tableAdditons/isActive';
import Actions from './tableAdditons/Actions';
import { useLocation, useParams } from 'react-router-dom';

const CategoryTable = () => {
    const params = useParams();
    const [data , setData] = useState([]);
    const [isLodaing , setLoaing] = useState(true);

    const handleGetCategories = async ()=>{
        try {
            const res = await getCategoriesService(params.categoryID);
            if (res.status == 200) {
                setData(res.data.data);
                setTimeout(() => {
                    setLoaing(false)
                }, 1000);
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
        setLoaing(true)
    }, [params]);

    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'title' , title : 'عنوان'},
        {field : 'parent_id' , title : 'والد'},
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
        <>
            {!isLodaing ? 
                <PaginatedTable data={data} dataInfo={dataInfo} additionField={additionField}
                 searchParams={searchParams} numOfPage={4}>
                    {/* --- Modal add Category --- */}
                    <AddCategory/>
                </PaginatedTable>
            : 
                <div className='w-100 mt-2'>
                    <hr className='bg-white w-75 mx-auto my-5' />
                    <div className='w-100 fs-6 fw-bold alert text-center alert-primary' >لطفا کمی صبر کنید . . .</div>
                </div>
            }
        </>
    );
}

export default CategoryTable;
