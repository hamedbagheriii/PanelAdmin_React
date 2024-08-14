import React from 'react';
import PaginatedTable from '../../../components/PaginatedTable';
import AddProduct from './AddProduct';

const ProductTable = () => {
    const data = [
        {
            id : 1 ,
            category : 'aaa' ,
            title : 'bbb' ,
            price : '1111' ,
            stock : '5' ,
            like_count : '2' ,
            status : '1' ,
        } ,
        {
            id : 2 ,
            category : 'ccc' ,
            title : 'jjj' ,
            price : '2222' ,
            stock : '2' ,
            like_count : '2' ,
            status : '1' ,
        } ,
        {
            id : 3 ,
            category : 'gg' ,
            title : 'sss' ,
            price : '3333' ,
            stock : '7' ,
            like_count : '2' ,
            status : '1' ,
        }
    ]

    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'category' , title : 'دسته'},
        {field : 'title' , title : 'عنوان'},
        {field : 'price' , title : 'قیمت'},
        {field : 'stock' , title : 'موجودی'},
        {field : 'like_count' , title : 'تعداد لایک'},
        {field : 'status' , title : 'وضعیت'},
    ]

    const additionFieldElement = (itemId)=>{
        return(
            <>  
                <td>
                    <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                    title="ویرایش محصول"
                    data-bs-toggle="modal"
                    data-bs-placement="top"
                    data-bs-target="#add_product_modal">                
                    </i>
                    <i className="fas fa-receipt text-info mx-1 hoverable_text pointer has_tooltip"
                    title="ثبت ویژگی"
                    data-bs-toggle="modal"
                    data-bs-target="#add_product_attr_modal">
                    </i>                
                    <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                    title="حذف محصول"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top">
                    </i>
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
            {/* --- Modal add Product --- */}
            <AddProduct/>
        </PaginatedTable>
    );
}

export default ProductTable;
