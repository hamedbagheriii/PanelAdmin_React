import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../../components/tableComponent/PaginatedTable';
import AddBtnLink from '../../../UI/All/AddBtnLink';
import { Outlet } from 'react-router-dom';
import { useHasPermission } from '../../../hook/permissionHook';
import Actions from './tableAddtions/Actions';
import { Confirm } from '../../../utils/confirm';
import { Alert } from '../../../utils/alert';
import { deleteDeliveryService, getAllDeliveriesService } from '../../../services/orders/delivereis/delivery';

const DeliverysTable = () => {
    const [data , setData] = useState([]);
    const [isLoading , setLoading] = useState(true);
    const hasPermission = useHasPermission('create_delivery')


    // This is for get delivery
    const handleGetDeliveries = async ()=>{
        try {
            const res = await getAllDeliveriesService();
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


    // This is for delete delivery
    const handleDeleteDelivery = async (rowData)=>{
        if (await Confirm(`آیا از حذف نحوه ارسال ${rowData.title}
        اطمینان دارید ؟`)) {
            try {
                const res = await deleteDeliveryService(rowData.id);
                if (res.status == 200) {
                    Alert('عملیات با موفقیت انجام شد .',
                    `نحوه ارسال ${rowData.title} با موفقیت حذف شد .` , 'success');
                    handleGetDeliveries();
                }
            } catch (error) {
                // set error in httpService
            }
        }
    }


    // This is for calling Get delivery function
    useEffect(() => {
        handleGetDeliveries();
        setLoading(true)
    }, []);




    // This is for inital props <<<<=
    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'title' , title : 'عنوان'},
        {field : 'amount' , title : 'هزینه'},
        {field : 'time' , title : 'زمان ارسال'},
        {field : 'time_unit' , title : 'واحد ارسال'},
        {
            title : 'عملیات' ,
            field : null ,
            element : (rowData)=> <Actions rowData={rowData} 
            handleDeleteDelivery={handleDeleteDelivery} />
        } 
    ]


    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از عنوان را وارد کنید .' ,
        searchField : 'title'
    }
    // This is for inital props <<<<=

    return (
        <PaginatedTable data={data} dataInfo={dataInfo} isLoading={isLoading}
         searchParams={searchParams} numOfPage={4}>
            {/* --- Modal add Delivery --- */}
            {hasPermission ? (
                <>
                    <AddBtnLink pach={'/Deliverys/add-delivery'}  />
                    <Outlet context={{handleGetDeliveries}} />
                </>
            ) : null}
        </PaginatedTable>
    );
}

export default DeliverysTable;
