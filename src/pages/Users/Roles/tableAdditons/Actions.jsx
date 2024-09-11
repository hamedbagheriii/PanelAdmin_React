import React from 'react';
import { useNavigate } from 'react-router-dom';

const Actions = ({rowData , handleDeleteRole}) => {
    const navigate = useNavigate();

    return (
        <>  
            <ActionIcon 
            action={navigate('/Roles/add-role' , {state : {roleToEdit : rowData.id , editType : 'role'}})}
            icon={'fas fa-edit text-warning'}
            ptitle={'update_role'}
            title={"ویرایش نقش"}
            />
            <ActionIcon 
            action={navigate('/Roles/add-role' , {state : {roleToEdit : rowData.id , editType : 'permission'}})}
            icon={'fas fa-fingerprint text-info'}
            ptitle={'update_role_permissions'}
            title={"ویرایش دسترسی ها"}
            />
            <ActionIcon 
            action={handleDeleteRole(rowData)}
            icon={'fas fa-times text-danger'}
            ptitle={'update_role_permissions'}
            title={"حذف نقش"}
            />
        </>
    );
}

export default Actions;
