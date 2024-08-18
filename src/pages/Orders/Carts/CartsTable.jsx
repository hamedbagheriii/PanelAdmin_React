import React from 'react';
import PaginatedTable from '../../../components/tableComponent/PaginatedTable';
import EditCart from './Add_EditCart';
import Add_EditCart from './Add_EditCart';

const CartTable = () => {
    const data = [
        {
            id : 1 ,
            userID : '52' ,
            userName : 'حامد باقری' ,
            date : '1403/5/25' ,
            totalAmount : '4,300,000' ,
            status : '1' ,
        } ,
        {
            id : 2 ,
            userID : '812' ,
            userName : 'حامد باقری' ,
            date : '1403/5/25' ,
            totalAmount : '4,300,000' ,
            status : '1' ,
        } ,
        {
            id : 3 ,
            userID : '231' ,
            userName : 'حامد باقری' ,
            date : '1403/5/25' ,
            totalAmount : '4,300,000' ,
            status : '1' ,
        } ,
        {
            id : 4 ,
            userID : '77' ,
            userName : 'حامد باقری' ,
            date : '1403/5/25' ,
            totalAmount : '4,300,000' ,
            status : '1' ,
        } ,
        {
            id : 5 ,
            userID : '5457' ,
            userName : 'حامد باقری' ,
            date : '1403/5/25' ,
            totalAmount : '4,300,000' ,
            status : '1' ,
        } ,
        {
            id : 6 ,
            userID : '112' ,
            userName : 'حامد باقری' ,
            date : '1453/5/25' ,
            totalAmount : '4,300,000' ,
            status : '1' ,
        } ,
        {
            id : 7 ,
            userID : '31' ,
            userName : 'حامد باقری' ,
            date : '1423/5/25' ,
            totalAmount : '4,300,000' ,
            status : '1' ,
        } ,
        {
            id : 8 ,
            userID : '51' ,
            userName : 'حامد باقری' ,
            date : '1401/5/25' ,
            totalAmount : '8,342,000' ,
            status : '1' ,
        } ,
        {
            id : 9 ,
            userID : '90' ,
            userName : 'حامد باقری' ,
            date : '1403/5/25' ,
            totalAmount : '1,300,000' ,
            status : '1' ,
        } ,
    ]

    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'userID' , title : 'آی دی مشتری'},
        {field : 'userName' , title : 'نام مشتری'},
        {field : 'date' , title : 'تاریخ'},
        {field : 'totalAmount' , title : 'مبلغ کل سبد'},
        {field : 'status' , title : 'وضعیت'},
    ]

    const additionFieldElement = (itemId)=>{
        return(
            <>  
                <td>
                    <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip" 
                    title="ویرایش و جزئیات سبد" data-bs-toggle="modal" data-bs-placement="top"
                    data-bs-target="#edit_add_cart_modal"></i>
                    <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" 
                    title="حذف سبد" data-bs-toggle="tooltip" data-bs-placement="top"></i>

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
        placeholder : 'قسمتی از نام یا شماره سبد را وارد کنید .' ,
        searchField : 'title'
    }

    return (
        <PaginatedTable data={data} dataInfo={dataInfo} additionField={additionField}
         searchParams={searchParams} numOfPage={4}>
            <Add_EditCart/>
        </PaginatedTable>
    );
}

export default CartTable;
