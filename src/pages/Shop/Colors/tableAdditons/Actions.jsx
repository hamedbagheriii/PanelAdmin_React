import React from 'react';
import ActionIcon from '../../../../UI/pages/actionIcon';

const Actions = ({rowData , handleDeleteColor , setColorToEdit}) => {
    return (
        <>
            <ActionIcon 
            action={()=>setColorToEdit(rowData)}
            icon={'fas fa-edit text-warning'}
            ptitle={'update_color'}
            title={"ویرایش رنگ"}
            target={'add_color_modal'}
            toggle='modal'
            />
            <ActionIcon 
            action={()=>handleDeleteColor(rowData)}
            icon={'fas fa-times text-danger'}
            ptitle={'delete_color'}
            title={"حذف رنگ"}
            />
        </>
    );
}

export default Actions;
