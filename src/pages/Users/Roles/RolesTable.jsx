import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../../components/tableComponent/PaginatedTable';
import Actions from './tableAdditons/Actions';
import { deleteRoleService, getAllRolesService } from '../../../services/Users/role/roles';
import AddBtnLink from '../../../UI/All/AddBtnLink';
import { Outlet } from 'react-router-dom';
import { Alert } from '../../../utils/alert';
import { Confirm } from '../../../utils/confirm';
import { useHasPermission } from '../../../hook/permissionHook';

const RolesTable = () => {
    const [data , setData] = useState([]);
    const [isLoading , setLoading] = useState(true);
    const hasPermission = useHasPermission('create_role')


    // This is for get Roles
    const handleGetRoles = async ()=>{
        try {
            const res = await getAllRolesService();
            if (res.status == 200) {
                setData(res.data.data);
            }
        } catch (error) {
            // set error in httpService
        }
        finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }

    // This is for calling Get Roles function
    useEffect(() => {
        handleGetRoles();
        setLoading(true)
    }, []);

    // This is for delete Role
    const handleDeleteRole = async (rowData)=>{
        if (await Confirm(`آیا از حذف نقش ${rowData.title}
        اطمینان دارید ؟`)) {
            try {
                const res = await deleteRoleService(rowData.id);
                if (res.status == 200) {
                    Alert('عملیات با موفقیت انجام شد .' ,
                    `نقش ${rowData.title} با موفقیت حذف شد .` , 'success');
                    handleGetRoles();
                }
            } catch (error) {
                // set error in httpService
            }
        }
    }




    // This is for inital props <<<<=
    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'title' , title : 'عنوان'},
        {field : 'description' , title : 'توضیحات'},
        {
            field : null ,
            title : 'عملیات',
            element : (rowData)=>{
                return  <Actions rowData={rowData}
                handleDeleteRole={handleDeleteRole}/>
            }
        },
    ]

    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از نام نقش را وارد کنید .' ,
        searchField : 'title'
    }
    // This is for inital props <<<<=


    return (
        <PaginatedTable data={data} dataInfo={dataInfo} 
         searchParams={searchParams} numOfPage={4} isLoading={isLoading}> 
            {/* --- Modal add Role --- */}
            {hasPermission ? (
                <>
                    <AddBtnLink pach={'/Roles/add-role'}  />
                    <Outlet context={{handleGetRoles}}/>
                </>
            ) : null}
        </PaginatedTable>
    );
}

export default RolesTable;
