import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../../components/tableComponent/PaginatedTable';
import AddRole from './AddRole';
import Actions from './tableAdditons/Actions';
import { getAllRolesService } from '../../../services/Users/role/roles';
import AddBtnLink from '../../../UI/All/AddBtnLink';
import { Outlet } from 'react-router-dom';

const RolesTable = () => {
    const [data , setData] = useState([]);
    const [isLoading , setLoading] = useState(true);


    // This is for get permissons
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

    // This is for calling Get permissons function
    useEffect(() => {
        handleGetRoles();
        setLoading(true)
    }, []);





    // This is for inital props <<<<=
    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'title' , title : 'عنوان'},
        {field : 'description' , title : 'توضیحات'},
        {
            field : null ,
            title : 'عملیات',
            element : (rowData)=>{
                return  <Actions rowData={rowData} />
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
            <AddBtnLink pach={'/Roles/add-role'}  />
            <Outlet/>
        </PaginatedTable>
    );
}

export default RolesTable;
