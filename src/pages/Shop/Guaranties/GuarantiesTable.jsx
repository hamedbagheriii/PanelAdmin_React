import React from 'react';
import PaginatedTable from '../../../components/tableComponent/PaginatedTable';
import AddGuarantie from './AddGuarantie';

const GuarantiesTable = () => {
    const data = [
        {
            id : 1 ,
            title : 'گارانتی 1' ,
            duration : '12 ماه' ,
            dec : `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
            با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله 
            در ستون و سطرآنچنان که لازم است .` ,
        } ,
        {
            id : 2 ,
            title : 'گارانتی 2' ,
            duration : '12 ماه' ,
            dec : `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
            با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله 
            در ستون و سطرآنچنان که لازم است .` ,
        } ,
        {
            id : 3 ,
            title : 'گارانتی 3' ,
            duration : '12 ماه' ,
            dec : `لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
            با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله 
            در ستون و سطرآنچنان که لازم است .` ,
        } ,

    ]

    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'title' , title : 'عنوان گارانتی'},
        {field : 'duration' , title : 'مدت گارانتی'},
        {field : 'dec' , title : 'توضیحات'},
    ]

    const additionFieldElement = (itemId)=>{
        return(
            <>
                <td>
                    <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                     title="حذف گارانتی" data-bs-toggle="tooltip" data-bs-placement="top"></i>
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
            {/* --- Modal add Guarantie --- */}
            <AddGuarantie />
        </PaginatedTable>            
    );
}

export default GuarantiesTable;
