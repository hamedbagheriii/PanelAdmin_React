import React from 'react';
import PaginatedTable from '../../../components/PaginatedTable';

const PermissionsTable = () => {
    const data = [
        {
            id : 1 ,
            title : 'سطح عادی' ,
            dec : 'توضیحاتی در مورد این نقش که چیست و کلیات آن کدام است' ,
        } ,
        {
            id : 2 ,
            title : 'سطح ادمین' ,
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
                        <label className="form-check-label pointer" htmlFor={`flexSwitchCheckDefault-${itemId}`}>فعال</label>
                        <input className="form-check-input pointer mx-1 mb-1" type="checkbox" id={`flexSwitchCheckDefault-${itemId}`} defaultChecked={true}/>
                    </div> 
                </td>
            </>
        )
    }
    
    const additionField = [
        {
            title : 'وضعیت' ,
            field : 'status' ,
            element : (itemId)=> additionFieldElement(itemId)
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
        </PaginatedTable>
    );
}

export default PermissionsTable;
