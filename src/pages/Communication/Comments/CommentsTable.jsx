import React from 'react';
import PaginatedTable from '../../../components/PaginatedTable';
import AddComment from './AddComments';


const CommentsTable = () => {
    const data = [
        {
            id : 1 ,
            fullName : 'قاسم بساکی' ,
            commentType : 'نظر' ,
            forProduct : 'پیتزا' ,
            dataText : 'قسمتی از متن سوال برای این محصول مثلا 100 کارکتر' ,
        } ,
        
    ]

    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'fullName' , title : 'نام و نام خانوادگی'},
        {field : 'commentType' , title : 'نوع نظر'},
        {field : 'forProduct' , title : 'برای'},
        {field : 'dataText' , title : 'توضیحات'},
    ]

    const additionFieldElement = (itemId)=>{
        return(
            <>  
                <td>
                    <div className="form-check form-switch d-flex flex-column flex-md-row justify-content-around align-items-center w-100 p-0 h-100">
                        <label className="form-check-label pointer" htmlFor={`flexSwitchCheckDefault-${itemId}`}>فعال</label>
                        <input className="form-check-input pointer mx-1 mb-1" type="checkbox" id={`flexSwitchCheckDefault-${itemId}`} defaultChecked={true}/>
                    </div> 
                </td>
                <td>1400/10/12</td>
                <td>
                    <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                    title="حذف نظر" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                </td>
            </>
        )
    }
    
    const additionField = [
        {
            title : 'وضعیت' ,
            field : 'status' ,
            element : (itemId)=> additionFieldElement(itemId)
        } ,
        {
            title : 'تاریخ' ,
            field : 'date' ,
            element : ()=>{}
        } ,
        {
            title : 'عملیات' ,
            field : 'operation' ,
            element : ()=>{}
        }
    ]

    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از نظر یا نام شخص را وارد کنید .' ,
        searchField : 'dataText'
    }

    return (
        <PaginatedTable data={data} dataInfo={dataInfo} additionField={additionField}
         searchParams={searchParams} numOfPage={4}>
            {/* --- Modal add Comment --- */}
            <AddComment/>
        </PaginatedTable>
    );
}

export default CommentsTable;
