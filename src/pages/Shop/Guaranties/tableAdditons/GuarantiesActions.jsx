import React from 'react';
import ActionIcon from '../../../../UI/pages/actionIcon';

const GuarantiesActions = ({rowData , setGuarantiesToEdit , handleDeleteGuarantie}) => {
    return (
        <>
            <ActionIcon 
            action={()=>setGuarantiesToEdit(rowData)}
            icon={'fas fa-edit text-warning'}
            ptitle={'update_guarantee'}
            title={"ویرایش گارانتی"}
            target={'add_guarantee_modal'}
            toggle='modal'
            />
            <ActionIcon 
            action={()=>handleDeleteGuarantie(rowData)}
            icon={'fas fa-times text-danger'}
            ptitle={'delete_guarantee'}
            title={"حذف گارانتی"}
            />
        </>  
    );
}

export default GuarantiesActions;
