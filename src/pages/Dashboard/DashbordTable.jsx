import React from 'react';
import PaginatedTable from '../../components/PaginatedTable';

const DashbordTable = () => {
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
        }
    ]

    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'category' , title : 'دسته'},
        {field : 'title' , title : 'عنوان'},
        {field : 'stock' , title : 'موجودی'},
        {field : 'price' , title : 'قیمت'},
    ]

    const additionFieldElement = (itemId)=>{
        return(
            <>
                <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                 title="حذف"
                 data-bs-toggle="tooltip"
                 data-bs-placement="top">
                </i>
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
        <div className="row">

            <div className="col-12 col-lg-6 ">
                <p className="text-center mt-3 text-white fw-bold">محصولات رو به اتمام :</p>
                
                <PaginatedTable data={data} dataInfo={dataInfo} additionField={additionField}
                 searchParams={searchParams} numOfPage={4} />
            </div>
            <div className="col-12 col-lg-6 mt-4 mt-lg-0 text-light text-white">
                <canvas id="myCharts" height="195"></canvas>
            </div>

        </div>
    );
}

export default DashbordTable;
