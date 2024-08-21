import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../../components/tableComponent/PaginatedTable';
import AddCategory from './AddCategory';
import { getCategoriesService } from '../../../services/shop/category';
import { Alert } from '../../../utils/alert';
import IsActive from './tableAdditons/isActive';
import Actions from './tableAdditons/Actions';
import { useParams } from 'react-router-dom';
import { convertDate } from '../../../utils/convertDate';

const CategoryTable = () => {
    const params = useParams();
    const [data , setData] = useState([]);
    const [isLodaing , setLoaing] = useState(true);
    const [forceReander , setForceReander] = useState(0);

    const handleGetCategories = async ()=>{
        try {
            const res = await getCategoriesService(params.categoryID);
            if (res.status == 200) {
                setData(res.data.data);
                setTimeout(() => {
                    setLoaing(false)
                }, 500);
            }
        } catch (error) {}
    }

    useEffect(() => {
        handleGetCategories()
        setLoaing(true)
    }, [params , forceReander]);

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
                    <AddCategory setForceReander={setForceReander} />
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