import React from 'react';

const AtrrAction = ({rowData}) => {
    return (
        <>
            <td>
                <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                title="ویرایش دسته" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                title="حذف دسته" data-bs-toggle="tooltip" data-bs-placement="top"></i>
            </td>  
        </>
    );
}

export default AtrrAction;
