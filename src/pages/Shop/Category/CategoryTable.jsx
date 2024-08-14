import React from 'react';
import PaginatedTable from '../../../components/PaginatedTable';
import AddCategory from './AddCategory';

const CategoryTable = () => {
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
        } ,
        {
            id : 4 ,
            category : 'gg' ,
            title : 'sss' ,
            price : '3333' ,
            stock : '7' ,
            like_count : '2' ,
            status : '1' ,
        } ,
        {
            id : 5 ,
            category : 'gg' ,
            title : 'sss' ,
            price : '3333' ,
            stock : '7' ,
            like_count : '2' ,
            status : '1' ,
        } ,
        {
            id : 6 ,
            category : 'gg' ,
            title : 'sss' ,
            price : '3333' ,
            stock : '7' ,
            like_count : '2' ,
            status : '1' ,
        } ,
        {
            id : 7 ,
            category : 'gg' ,
            title : 'sss' ,
            price : '64345' ,
            stock : '7' ,
            like_count : '2' ,
            status : '1' ,
        }
    ]

    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'title' , title : 'عنوان'},
        {field : 'status' , title : 'وضعیت'},
        {field : 'price' , title : 'قیمت'},
    ]

    const additionFieldElement = (itemId)=>{
        return(
            <>
                <td>
                    <i className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip"
                    title="زیرمجموعه"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top">
                    </i>
                    <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                    title="ویرایش دسته"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top">
                    </i>
                    <i className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
                    title="افزودن ویژگی"
                    data-bs-placement="top"
                    data-bs-toggle="modal" data-bs-target="#add_product_category_attr_modal">
                    </i>
                    <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                    title="حذف دسته"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top">
                    </i>
                </td>
            </>
        )
    }
    
    const additionField = [
        {
            field : 'Operation' ,
            title : 'عملیات' ,
            element : (itemId)=> additionFieldElement(itemId)
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
            {/* --- Modal add Product --- */}
            <AddCategory/>
        </PaginatedTable>
    );
}

export default CategoryTable;
