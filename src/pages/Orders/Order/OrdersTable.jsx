import React, { useEffect, useState } from 'react';
import AddOrder from './AddOrder';
import PaginatedDataTable from '../../../components/tableComponent/paginatedDataTable';
import { Confirm } from '../../../utils/confirm';
import { Alert } from '../../../utils/alert';
import { deleteOrderService, getAllOrdersService } from '../../../services/orders/order/order';
import { numberWithCommas } from '../../../utils/numberWithCommas';
import { convertDate } from '../../../utils/convertDate';
import Actions from './tableAddtions/Actions';
import { useHasPermission } from '../../../hook/permissionHook';
import AddBtnLink from '../../../UI/All/AddBtnLink';
import { Outlet } from 'react-router-dom';

const OrdersTable = () => {
    const [tableData , setTableData] = useState([]);
    const [isLoading , setLoading] = useState(true);
    const [currentPage , setCurrentPage] = useState(1);
    const [countOnPage , setCountOnPage] = useState(4);
    const [pageCount , setPageCount] = useState(1);
    const [searchField , setSearchField] = useState('');
    const hasPermission = useHasPermission('create_order')


    // This is for get orders
    const handleGetOrders = async ()=>{
        try {
            const res = await getAllOrdersService(currentPage,countOnPage,searchField);
            if (res.status == 200) {
                setTableData(res.data.data.data);
                setPageCount(res.data.data.last_page);
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


    // This is for delete orders
    const handleDeleteOrder = async (rowData)=>{
        if (await Confirm(`آیا از حذف سفارش ${rowData.id}
        اطمینان دارید ؟`)) {
            try {
                const res = await deleteOrderService(rowData.id);
                if (res.status == 200) {
                    Alert('عملیات با موفقیت انجام شد .',
                    ` سفارش ${rowData.id} با موفقیت حذف شد .` , 'success');
                    handleGetOrders();
                }
            } catch (error) {
                // set error in httpService
            }
        }
    }




    // This is for calling Get orders function
    useEffect(() => {
        handleGetOrders();
        setLoading(true)
    }, []);

    // This is for calling Get orders function when 
    // edit currentPage or searchField
    useEffect(() => {
        handleGetOrders();
        setLoading(true);
    }, [currentPage , searchField]);



    // This is for inital props <<<<=
    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'user_id' , title : 'آیدی کاربر'},
        {field : 'user_fullname' , title : 'نام کاربر'},
        {field : 'phone' , title : 'شماره موبایل'},
        {field : 'cart_id' , title : 'کد سبد'},
        {
            field : null ,
            title : 'تاریخ پرداخت',
            element : (rowData)=> convertDate(rowData.pay_at)
        },
        {
            field : null ,
            title : 'مبلغ پرداختی',
            element : (rowData)=> numberWithCommas(rowData.pay_amount)
        },
        {
            field : null ,
            title : 'عملیات',
            element : (rowData)=><Actions rowData={rowData} 
            handleDeleteOrder={handleDeleteOrder} />
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

            {/* --- Modal add Order --- */}
            {hasPermission ? (
                <>
                    <AddBtnLink pach={'/Orders/add-order'} />
                    <Outlet context={{handleGetOrders}}/>
                </>
            ) : null}

        </PaginatedDataTable>
    );
}

export default OrdersTable;
