import React from 'react';
import ActionIcon from '../../../../UI/pages/actionIcon';

const Actions = ({rowData , handleDeleteBrand , setBrandToEdit}) => {
    return (
        <>
            <ActionIcon 
            action={()=>setBrandToEdit(rowData.id)}
            icon={'fas fa-edit text-warning'}
            ptitle={'update_brand'}
            title={"ویرایش برند"}
            toggle='modal'
            target='add_brand_modal'
            />
            <ActionIcon 
            action={()=>handleDeleteBrand(rowData)}
            icon={'fas fa-times text-danger'}
            ptitle={'delete_brand'}
            title={"حذف برند"}
            />
        </>
    );
}

export default Actions;
