import React from 'react';
import PaginatedTable from '../../../components/PaginatedTable';
import AddRole from './AddRole';

const RolesTable = () => {
    const data = [
        {
            id : 1 ,
            title : 'کاربر' ,
            dec : 'توضیحاتی در مورد این نقش که چیست و کلیات آن کدام است' ,
        } ,
        {
            id : 2 ,
            title : 'کاربر ویژه' ,
            dec : 'توضیحاتی در مورد این نقش که چیست و کلیات آن کدام است' ,
        } ,
    ]

    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'title' , title : 'عنوان'},
        {field : 'dec' , title : 'توضیحات'},
    ]

    const additionFieldElement = (itemId)=>{
        return(
            <>  
                <td>
                    <div className="form-check form-switch d-flex flex-column flex-md-row justify-content-around align-items-center w-100 p-0 h-100">
                        <label className="form-check-label pointer" htmlFor="flexSwitchCheckDefault">فعال</label>
                        <input className="form-check-input pointer mx-1 mb-1" type="checkbox" id="flexSwitchCheckDefault" checked/>
                    </div> 
                </td>
                <td>
                    <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                    title="ویرایش نقش" data-bs-toggle="modal" data-bs-placement="top" 
                    data-bs-target="#add_role_modal"></i>
                    <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                    title="حذف نقش" data-bs-toggle="tooltip" data-bs-placement="top"></i>

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
            title : 'عملیات' ,
            field : 'operation' ,
            element : ()=>{}
        }
    ]

    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از نام نقش را وارد کنید .' ,
        searchField : 'title'
    }

    return (
        <PaginatedTable data={data} dataInfo={dataInfo} additionField={additionField}
         searchParams={searchParams} numOfPage={4}>
            {/* --- Modal add Role --- */}
            <AddRole/>
        </PaginatedTable>
    );
}

export default RolesTable;