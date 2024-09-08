import React, { useEffect, useState } from 'react';
import PaginatedDataTable from '../../../components/tableComponent/paginatedDataTable';
import { Alert } from '../../../utils/alert';
import { Confirm } from '../../../utils/confirm';
import AddBtnLink from '../../../UI/All/AddBtnLink';
import { useNavigate } from 'react-router-dom';
import UserAction from './tableAddition/userActions';
import { deleteUserService, getAllUsersService } from '../../../services/Users/user/users';


const UsersTable = () => {
    const [tableData , setTableData] = useState([]);
    const [isLoading , setLoading] = useState(true);
    const [currentPage , setCurrentPage] = useState(1);
    const [countOnPage , setCountOnPage] = useState(8);
    const [pageCount , setPageCount] = useState(1);
    const [searchField , setSearchField] = useState('');
    const navigate = useNavigate();




    // This is for get Users
    const handleGetUsers = async ()=>{
        try {
            const res = await getAllUsersService(currentPage,countOnPage,searchField);
            if (res.status == 200) {
                setTableData(res.data.data.data);
                setPageCount(res.data.data.last_page);
            }
        } catch (error) {
            // set error in httpService
        }
        finally{
            setLoading(false);
        }
    }

    // This is for delete Users
    const handleDeleteUsers = async (rowData)=>{
        if (await Confirm(`آیا از حذف کاربر ${rowData.user_name || 'با شماره موبایل  '+rowData.phone}
        اطمینان دارید ؟`)) {
            try {
                const res = await deleteUserService(rowData.id);
                if (res.status == 200) {
                    Alert('عملیات با موفقیت انجام شد .' ,
                    `کاربر ${rowData.user_name ||'با شماره موبایل  '+ rowData.phone} با موفقیت حذف شد .` , 'success');
                    handleGetUsers();
                }
            } catch (error) {
                // set error in httpService
            }
        }
    }

    // This is for calling Get Users function
    useEffect(() => {
        handleGetUsers();
        setLoading(true);
    }, []);

    // This is for calling Get Users function when edit currentPage or searchField
    useEffect(() => {
        handleGetUsers();
        setLoading(true);
    }, [currentPage , searchField]);





    // This is for inital props <<<<=
    const dataInfo = [
        {field : 'id' , title : '#'},
        {
            field : '' ,
            title : 'نام کاربری',
            element : (rowData)=> `${rowData.user_name || '--'}`
        },
        {
            field : '' ,
            title : 'نام و نام خانوادگی',
            element : (rowData)=> `${rowData.first_name || ''} ${rowData.last_name || '--'}`
        },
        {field : 'phone' , title : 'شماره موبایل'},
        {
            field : '' ,
            title : 'ایمیل',
            element : (rowData)=> `${rowData.email || '--'}`
        },
        {
            field : '' ,
            title : 'جنسیت',
            element : (rowData)=> rowData.gender == 1 ? 'آقا' : 'خانم'
        },
        {
            field : '' ,
            title : 'عملیات',
            element : (rowData)=> <UserAction rowData={rowData}
            handleDeleteUsers={handleDeleteUsers} navigate={navigate} />
        },
    ]

    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از شماره موبایل را وارد کنید .' ,
        searchField : 'phone'
    }
    // This is for inital props <<<<=


    return (
        <PaginatedDataTable dataInfo={dataInfo} searchParams={searchParams} isLoading={isLoading}
        setSearchField={setSearchField} tableData={tableData} setCurrentPage={setCurrentPage}
        currentPage={currentPage} pageCount={pageCount} searchField={searchField }>
            {/* --- Modal add Users --- */}
            <AddBtnLink pach={'/Users/add-user'}  />
        </PaginatedDataTable>
    );
}

export default UsersTable;
