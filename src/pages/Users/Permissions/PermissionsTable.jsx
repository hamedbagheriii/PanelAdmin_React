import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../../components/tableComponent/PaginatedTable';
import { getAllPermissionsService } from '../../../services/Users/permission/permissions';

const PermissionsTable = () => {
    const [data , setData] = useState([]);
    const [isLoading , setLoading] = useState(true);


    // This is for get permissons
    const handleGetPermissons = async ()=>{
        try {
            const res = await getAllPermissionsService();
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
        handleGetPermissons();
        setLoading(true)
    }, []);








    // This is for inital props <<<<=
    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'title' , title : 'عنوان'},
        {field : 'description' , title : 'توضیحات'},
        {field : 'category' , title : 'عنوان دسته'},
    ]


    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از عنوان مجوز را وارد کنید .' ,
        searchField : 'title'
    }
    // This is for inital props <<<<=



    return (
        <PaginatedTable data={data} dataInfo={dataInfo} searchParams={searchParams}
        numOfPage={10} isLoading={isLoading}>
        </PaginatedTable>
    );
}

export default PermissionsTable;
