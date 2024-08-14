import React from 'react';
import PaginatedTable from '../../../components/PaginatedTable';
import AddBrand from './AddBrand';
import imgLOGO from '../../../assets/img/logoKFC.png'

const BrandsTable = () => {
    const data = [
        {
            id : 1 ,
            title : 'KFC' ,
            titleFA : 'کی اف سی' ,
            img : '../../../assets/img/logoKFC.png' ,
            dec : `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
            با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله 
            در ستون و سطرآنچنان که لازم است .` ,
        } ,
        {
            id : 2 ,
            title : 'KFC' ,
            titleFA : 'کی اف سی' ,
            img : '../../public/assets/images/logoKFC.png' ,
            dec : `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
            با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله 
            در ستون و سطرآنچنان که لازم است .` ,
        } ,
        {
            id : 3 ,
            title : 'KFC' ,
            titleFA : 'کی اف سی' ,
            img : '../../public/assets/images/logoKFC.png' ,
            dec : `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
            با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله 
            در ستون و سطرآنچنان که لازم است .` ,
        } ,

    ]

    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'title' , title : 'عنوان'},
        {field : 'titleFA' , title : 'عنوان فارسی'},
        {field : 'dec' , title : 'توضیحات'},
    ]

    const additionFieldElement = (itemId , d)=>{
        return(
            <>
                <td>
                    <img src={imgLOGO} width="50" />
                </td>
                <td>
                    <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                     title="ویرایش برند" data-bs-toggle="modal" data-bs-placement="top" data-bs-target="#add_brand_modal"></i>
                    <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                     title="حذف برند" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                </td>
            </>
        )
    }
    
    const additionField = [
        {
            field : 'Logo' ,
            title : 'لوگو' ,
            element : (itemId , d)=> additionFieldElement(itemId , d)
        } ,
        {
            field : 'Operation' ,
            title : 'عملیات' ,
            element : ()=>{}
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
            <AddBrand />
        </PaginatedTable>            
    );
}

export default BrandsTable;
