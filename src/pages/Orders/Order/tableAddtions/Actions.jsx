import React from 'react';
import { useNavigate } from 'react-router-dom';
import ActionIcon from '../../../../UI/pages/actionIcon';

const Actions = ({rowData , handleDeleteOrder}) => {
    const navigate = useNavigate();

    return (
        <>  
            {/* <ActionIcon 
            action={()=>navigate('/Carts/add-cart' , {state : {cartDataId : rowData.id}})}
            icon={'fas fa-edit text-warning'}
            ptitle={'update_cart'}
            title={"ویرایش و جزئیات سفارش"}
            /> */}
            <ActionIcon 
            action={()=>handleDeleteOrder(rowData)}
            icon={'fas fa-times text-danger'}
            ptitle={'delete_cart'}
            title={"حذف سفارش"}
            />
        </>
    );
}

export default Actions;
