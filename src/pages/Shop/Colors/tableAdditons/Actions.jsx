import React from 'react';

const Actions = ({rowData , handleDeleteColor , setColorToEdit}) => {
    return (
        <>
            <td>
                <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                title="ویرایش رنگ" data-bs-toggle="modal" data-bs-placement="top" data-bs-target="#add_color_modal"
                onClick={()=>setColorToEdit(rowData)}></i>
                <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="حذف رنگ" data-bs-toggle="tooltip" data-bs-placement="top"
                onClick={()=>handleDeleteColor(rowData)}></i>
            </td>  
        </>
    );
}

export default Actions;
