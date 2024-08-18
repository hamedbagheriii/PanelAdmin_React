import React from 'react';
import PaginatedTable from '../../../components/tableComponent/PaginatedTable';
import AddDelivery from './AddDelivery';

const DeliverysTable = () => {
    const data = [
        {
            id : 1 ,
            title : 'پست پیشتاز' ,
            cost : '40,000 تومان' ,
            shippingTime : '9' ,
            timeUnit : 'روز کاری' ,
        } ,
        {
            id :2 ,
            title : 'تیپاکس' ,
            cost : '60,000 تومان' ,
            shippingTime : '4' ,
            timeUnit : 'روز کاری' ,
        } 
    ]

    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'title' , title : 'عنوان'},
        {field : 'cost' , title : 'هزینه'},
        {field : 'shippingTime' , title : 'زمان ارسال'},
        {field : 'timeUnit' , title : 'واحد ارسال'},
    ]

    const additionFieldElement = (itemId)=>{
        return(
            <>  
                <td>
                    <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                     title="ویرایش" data-bs-toggle="modal" data-bs-placement="top"
                    data-bs-target="#add_delivery_modal"></i>
                    <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                     title="حذف " data-bs-toggle="tooltip" data-bs-placement="top"></i>
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
            {/* --- Modal add Delivery --- */}
            <AddDelivery/>
        </PaginatedTable>
    );
}

export default DeliverysTable;
