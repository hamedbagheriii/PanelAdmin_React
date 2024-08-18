import React from 'react';
import PaginatedTable from '../../../components/tableComponent/PaginatedTable';
import AddColor from './AddColor';

const ColorsTable = () => {
    const data = [
        {
            id : 1 ,
            title : 'مشکی' ,
            color : '#000'
        } ,
        {
            id : 2 ,
            title : 'قرمز' ,
            color : '#f44336'
        } ,
        {
            id : 3 ,
            title : 'بنفش' ,
            color : '#e312ff'
        } ,
        {
            id : 4 ,
            title : 'مشکی' ,
            color : '#000'
        } ,
        {
            id : 5 ,
            title : 'قرمز' ,
            color : '#f44336'
        } ,
        {
            id : 6 ,
            title : 'بنفش' ,
            color : '#e312ff'
        } ,
        {
            id : 7 ,
            title : 'قرمز' ,
            color : '#f44336'
        } ,
        {
            id : 8 ,
            title : 'بنفش' ,
            color : '#e312ff'
        }
    ]

    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'title' , title : 'نام رنگ'},
        {field : 'color' , title : 'کد رنگ'},
    ]

    const additionFieldElement = (itemId,d)=>{
        return(
            <>
                <td className="p-2">
                    <div className="w-100 h-100 d-block " 
                    style={{background: d.color ,color: d.color}}>...</div>
                </td>
                <td>
                    <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                     title="حذف رنگ" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                </td>
            </>
        )
    }
    
    const additionField = [
        {
            title : 'رنگ' ,
            field : 'color' ,
            element : (itemId,d)=> additionFieldElement(itemId,d)
        } ,
        {
            title : 'عملیات' ,
            field : 'operation' ,
            element : ()=>{}
        }
    ]

    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از نام رنگ را وارد کنید .' ,
        searchField : 'title'
    }

    
    const targetSearch = [
        {id : 1 , color : '#e312ff' , title : 'نام رنگ' , target : 'title' ,
        placeholder : 'قسمتی از نام رنگ را وارد کنید .'} ,
        {id : 2 , color : '#000' , title : 'کد رنگ' , target : 'color' ,
        placeholder : 'قسمتی از کد رنگ را وارد کنید .'} ,
    ]


    return (
        <>
            <PaginatedTable data={data} dataInfo={dataInfo} additionField={additionField}
             searchParams={searchParams} numOfPage={4} targetSearch={targetSearch}>
                {/* --- Modal add Color --- */}
                <AddColor/>
            </PaginatedTable>
        </>
    );
}

export default ColorsTable;
