import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionIcon from '../../../../UI/pages/actionIcon';

const Actions = ({rowData , handleDeleteDelivery}) => {
    const navigate = useNavigate();

    return (
        <>  
            <ActionIcon 
            action={()=>navigate('/Deliverys/add-delivery' , {state : {deliveryData : rowData}})}
            icon={'fas fa-edit text-warning'}
            ptitle={'update_delivery'}
            title={"ویرایش نحوه ارسال"}
            />
            <ActionIcon 
            action={()=>handleDeleteDelivery(rowData)}
            icon={'fas fa-times text-danger'}
            ptitle={'delete_delivery'}
            title={"حذف نحوه ارسال"}
            />
        </>
    );
}

export default Actions;
