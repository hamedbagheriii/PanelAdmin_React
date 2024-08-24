import React from 'react';

const GuarantiesActions = ({rowData , setGuarantiesToEdit , handleDeleteGuarantie}) => {
    return (
        <>
            <td>
                <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                title="ویرایش گارانتی" data-bs-toggle="modal" data-bs-placement="top" data-bs-target="#add_guarantee_modal"
                onClick={()=>setGuarantiesToEdit(rowData)}></i>
                <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                 title="حذف گارانتی" data-bs-toggle="tooltip" data-bs-placement="top"
                 onClick={()=>handleDeleteGuarantie(rowData)}></i>
            </td>  
        </>
    );
}

export default GuarantiesActions;
