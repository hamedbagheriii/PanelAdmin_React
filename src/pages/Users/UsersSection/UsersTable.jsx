import React from 'react';
import PaginatedTable from '../../../components/tableComponent/PaginatedTable';
import AddUser from './AddUser';

const UsersTable = () => {
    const data = [
        {
            id : 1 ,
            fullName : 'حامد باقری' ,
            phone : '09014061131' ,
            email : 'mahdicmptr213@gmail.com' ,
            role : 'کاربر' ,
            dateOfRegister : '1403/5/25' ,
        } ,
        {
            id : 2 ,
            fullName : 'حامد باقری' ,
            phone : '09014061131' ,
            email : 'mahdicmptr213@gmail.com' ,
            role : 'کاربر' ,
            dateOfRegister : '1403/5/25' ,
        } ,
        {
            id : 3,
            fullName : 'حامد باقری' ,
            phone : '09014061131' ,
            email : 'mahdicmptr213@gmail.com' ,
            role : 'کاربر' ,
            dateOfRegister : '1403/5/25' ,
        } ,
        {
            id : 4 ,
            fullName : 'حامد باقری' ,
            phone : '09014061131' ,
            email : 'mahdicmptr213@gmail.com' ,
            role : 'کاربر' ,
            dateOfRegister : '1403/5/25' ,
        } ,
        {
            id : 5 ,
            fullName : 'حامد باقری' ,
            phone : '09014061131' ,
            email : 'mahdicmptr213@gmail.com' ,
            role : 'کاربر' ,
            dateOfRegister : '1403/5/25' ,
        } ,
        {
            id :6 ,
            fullName : 'حامد باقری' ,
            phone : '09014061131' ,
            email : 'mahdicmptr213@gmail.com' ,
            role : 'کاربر' ,
            dateOfRegister : '1403/5/25' ,
        } ,
        {
            id : 7 ,
            fullName : 'حامد باقری' ,
            phone : '09014061131' ,
            email : 'mahdicmptr213@gmail.com' ,
            role : 'کاربر' ,
            dateOfRegister : '1403/5/25' ,
        } ,
        {
            id : 8 ,
            fullName : 'علی باقری' ,
            phone : '09014061131' ,
            email : 'mahdicmptr213@gmail.com' ,
            role : 'کاربر' ,
            dateOfRegister : '1403/5/25' ,
        } ,
        {
            id : 9 ,
            fullName : 'علی باقری' ,
            phone : '09014061131' ,
            email : 'mahdicmptr213@gmail.com' ,
            role : 'کاربر' ,
            dateOfRegister : '1403/5/25' ,
        } ,
        {
            id : 10 ,
            fullName : 'رضا باقری' ,
            phone : '09014061131' ,
            email : 'mahdicmptr213@gmail.com' ,
            role : 'کاربر' ,
            dateOfRegister : '1403/5/25' ,
        } ,
        {
            id : 12 ,
            fullName : 'حامد باقری' ,
            phone : '09014061131' ,
            email : 'mahdicmptr213@gmail.com' ,
            role : 'کاربر' ,
            dateOfRegister : '1403/5/25' ,
        } ,
        {
            id : 13 ,
            fullName : 'حامد باقری' ,
            phone : '09014061131' ,
            email : 'mahdicmptr213@gmail.com' ,
            role : 'کاربر' ,
            dateOfRegister : '1403/5/25' ,
        } ,
        {
            id : 14 ,
            fullName : 'حامد باقری' ,
            phone : '09014061131' ,
            email : 'mahdicmptr213@gmail.com' ,
            role : 'کاربر' ,
            dateOfRegister : '1403/5/25' ,
        } ,
        {
            id : 15 ,
            fullName : 'حامد باقری' ,
            phone : '09014061131' ,
            email : 'mahdicmptr213@gmail.com' ,
            role : 'کاربر' ,
            dateOfRegister : '1403/5/25' ,
        } ,
    ]

    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'fullName' , title : 'نام و نام خانوادگی'},
        {field : 'phone' , title : 'موبایل'},
        {field : 'email' , title : 'ایمیل'},
        {field : 'role' , title : 'نقش'},
        {field : 'dateOfRegister' , title : 'تاریخ ثبت نام'},
    ]

    const additionFieldElement = (itemId)=>{
        return(
            <>  
                <td>
                    <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                    title="جزئیات و ویرایش کاربر" data-bs-toggle="modal" data-bs-placement="top"
                    data-bs-target="#add_user_modal"></i>
                    <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" 
                    title="حذف کاربر" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                </td>
            </>
        )
    }
    
    const additionField = [
        {
            title : 'عملیات' ,
            field : 'operation' ,
            element : (itemId)=> additionFieldElement(itemId)
        }
    ]

    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از نام و نام خانوادگی را وارد کنید .' ,
        searchField : 'fullName'
    }

    return (
        <PaginatedTable data={data} dataInfo={dataInfo} additionField={additionField}
         searchParams={searchParams} numOfPage={4}>
            {/* --- Modal add User --- */}
            <AddUser/>
        </PaginatedTable>
    );
}

export default UsersTable;
