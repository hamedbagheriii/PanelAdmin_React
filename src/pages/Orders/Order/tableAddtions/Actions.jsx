import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionIcon from '../../../../UI/pages/actionIcon';

const Actions = ({rowData , handleDeleteOrder}) => {
    const navigate = useNavigate();

    return (
        <>  
            <ActionIcon 
            action={()=>handleDeleteOrder(rowData)}
            icon={'fas fa-times text-danger'}
            ptitle={'delete_order'}
            title={"حذف سفارش"}
            />
            <ActionIcon 
            action={()=>navigate('/Orders/add-order' , {state : {orderID : rowData.id}})}
            icon={'fas fa-shopping-cart text-info'}
            ptitle={'update_order'}
            title={"ویرایش و جزئیات سفارش"}
            />
        </>
    );
}

export default Actions;
