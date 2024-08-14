import React from 'react';
import PaginatedTable from '../../../components/PaginatedTable';
import AddDiscount from './AddDiscount';

const DiscountTable = () => {
    const data = [
        {
            id : 1 ,
            title : 'تخفیف مدارس' ,
            code : 'takhfif1' ,
            DisPercentage : '40%' ,
            expiration : '1403/6/29' ,
            for : 'همه' ,
        } ,
        {
            id : 2 ,
            title : 'تخفیف عید' ,
            code : 'takhfif2' ,
            DisPercentage : '50%' ,
            expiration : '1404/1/10' ,
            for : 'همه' ,
        } ,
        {
            id : 3 ,
            title : 'تخفیف یلدا' ,
            code : 'takhfif3' ,
            DisPercentage : '70%' ,
            expiration : '1403/10/1' ,
            for : 'ادمین ها' ,
        } ,
    ]

    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'title' , title : 'عنوان'},
        {field : 'code' , title : 'کد'},
        {field : 'DisPercentage' , title : 'درصد تخفیف'},
        {field : 'expiration' , title : 'تا تاریخ'},
        {field : 'for' , title : 'برای'},
    ]

    const additionFieldElement = (itemId)=>{
        return(
            <>  
                <td>
                    <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                     title="ویرایش کد" data-bs-toggle="modal" data-bs-placement="top" 
                     data-bs-target="#add_discount_modal"></i>
                    <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                     title="حذف کد" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                </td>
            </>
        )
    }
    
    const additionField = [
        {
            title : 'عملیات' ,
            field : 'operation' ,
            element : (itemId)=> additionFieldElement(itemId)
        }
    ]

    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از عنوان را وارد کنید .' ,
        searchField : 'title'
    }

    return (
        <PaginatedTable data={data} dataInfo={dataInfo} additionField={additionField}
         searchParams={searchParams} numOfPage={4}>
            {/* --- Modal add Duscount --- */}
            <AddDiscount/>
        </PaginatedTable>
    );
}

export default DiscountTable;
