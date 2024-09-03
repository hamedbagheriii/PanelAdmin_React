import React from 'react';

const Actions = ({rowData , }) => {
    return (
        <>
            <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
            title="ویرایش نقش" data-bs-toggle="modal" data-bs-placement="top" 
            data-bs-target="#add_role_modal"></i>
            <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
            title="حذف نقش" data-bs-toggle="tooltip" data-bs-placement="top"></i>
        </>
    );
}

export default Actions;
