import React from 'react';


const UserAction = ({rowData , handleDeleteUsers , navigate}) => {
    return (
        <>
            <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
            title="ویرایش کاربر"  data-bs-placement="top"
            onClick={()=>navigate('/Users/add-user' , {state : {userID : rowData.id}})}
            ></i>
            <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
             title="حذف کاربر" data-bs-toggle="tooltip" data-bs-placement="top"
             onClick={()=>handleDeleteUsers(rowData)}
            ></i>
        </>
    );
}

export default UserAction;
