import React from 'react';

const Actions = ({rowData , handleDeleteDiscount}) => {
    return (
        <>  
            <td>
                <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                 title="ویرایش کد" data-bs-toggle="modal" data-bs-placement="top" 
                 data-bs-target="#add_discount_modal"></i>
                <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                 title="حذف کد" data-bs-toggle="tooltip" data-bs-placement="top"
                 onClick={()=>handleDeleteDiscount(rowData)}></i>
            </td>
        </>
    );
}

export default Actions;
