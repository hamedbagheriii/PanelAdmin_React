import React from 'react';
import PaginatedTable from '../../../components/PaginatedTable';
import AddProduct from './AddOrder';
import AddOrder from './AddOrder';

const OrdersTable = () => {
    const data = [
        {
            id : 1 ,
            userID : '14' ,
            userName : 'رضا اکبری' ,
            status : 'پرداخت شده' ,
            paymentDate : '1403/05/25' ,
            amountPaid : '12,467,000 تومان' ,
        } ,
        {
            id : 2 ,
            userID : '134' ,
            userName : 'علی محمدی' ,
            status : 'پرداخت نشده' ,
            paymentDate : '-' ,
            amountPaid : '12,467,000 تومان' ,
        } ,
    ]

    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'userID' , title : 'آی دی مشتری'},
        {field : 'userName' , title : 'نام مشتری'},
        {field : 'status' , title : 'وضعیت'},
        {field : 'paymentDate' , title : 'تاریخ پرداخت'},
        {field : 'amountPaid' , title : 'مبلغ پرداختی'},
    ]

    const additionFieldElement = (itemId)=>{
        return(
            <>  
                <td>
                    <i className="fas fa-shopping-cart text-info mx-1 hoverable_text pointer has_tooltip" 
                    title="  جزئیات سفارش" data-bs-toggle="modal" data-bs-placement="top"
                    data-bs-target="#order_details_modal"></i>
                    <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" 
                    title="حذف سفارش" data-bs-toggle="tooltip" data-bs-placement="top"></i>

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
        placeholder : 'قسمتی از آیدی یا نام مشتری را وارد کنید .' ,
        searchField : 'title'
    }

    return (
        <PaginatedTable data={data} dataInfo={dataInfo} additionField={additionField}
         searchParams={searchParams} numOfPage={4}>
            {/* --- Modal add Order --- */}
            <AddOrder/>
        </PaginatedTable>
    );
}

export default OrdersTable;
