import React from 'react';

const AtrrAction = ({rowData , attrToEdit , setAttrToEdit , handleDeleteCategoryAttr}) => {
    
    return (
        <div className={`d-flex justify-content-center`}>
            {!(attrToEdit == rowData.id )? (
                <>
                    <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                    title="ویرایش دسته" data-bs-toggle="tooltip" data-bs-placement="top"
                    onClick={()=>setAttrToEdit(rowData.id)}></i>
                    <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                    title="حذف دسته" data-bs-toggle="tooltip" data-bs-placement="top"
                    onClick={()=>handleDeleteCategoryAttr(rowData)}></i>
                </>
            ) : (
                <span className='fw-bold text-danger bg-warning px-2 rounded-2 py-1'>انتخاب شده !</span>
            )}
        </div>  
    );
}

export default AtrrAction;
