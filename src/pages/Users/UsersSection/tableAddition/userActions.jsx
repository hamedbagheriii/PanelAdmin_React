import React from 'react';
import ActionIcon from '../../../../UI/pages/actionIcon';


const UserAction = ({rowData , handleDeleteUsers , navigate}) => {
    return (
        <>  
            <ActionIcon 
            action={()=>navigate('/Users/add-user' , {state : {userID : rowData.id}})}
            icon={'fas fa-edit text-warning'}
            ptitle={'update_user'}
            title={"ویرایش کاربر"}
            />
            <ActionIcon 
            action={()=>handleDeleteUsers(rowData)}
            icon={'fas fa-times text-danger'}
            ptitle={'delete_user'}
            title={"حذف کاربر"}
            />
        </>
    );
}

export default UserAction;
