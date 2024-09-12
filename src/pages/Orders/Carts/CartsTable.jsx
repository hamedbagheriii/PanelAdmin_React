import React, { useEffect, useState } from 'react';
import Add_EditCart from './Add_EditCart';
import { useHasPermission } from '../../../hook/permissionHook';
import Actions from './tableAddtions/Actions';
import { deleteCartService, getAllCartsService } from '../../../services/orders/carts/cart';
import { Confirm } from '../../../utils/confirm';
import { Alert } from '../../../utils/alert';
import PaginatedDataTable from '../../../components/tableComponent/paginatedDataTable';
import { Outlet } from 'react-router-dom';
import AddBtnLink from '../../../UI/All/AddBtnLink';

const CartTable = () => {
    const [tableData , setTableData] = useState([]);
    const [isLoading , setLoading] = useState(true);
    const [currentPage , setCurrentPage] = useState(1);
    const [countOnPage , setCountOnPage] = useState(4);
    const [pageCount , setPageCount] = useState(1);
    const [searchField , setSearchField] = useState('');
    const hasPermission = useHasPermission('create_cart')


    // This is for get carts
    const handleGetCarts = async ()=>{
        try {
            const res = await getAllCartsService(currentPage,countOnPage,searchField);
            console.log(res);
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


    // This is for delete carts
    const handleDeleteCarts = async (rowData)=>{
        if (await Confirm(`آیا از حذف سبد خرید ${rowData.id}
        اطمینان دارید ؟`)) {
            try {
                const res = await deleteCartService(rowData.id);
                if (res.status == 200) {
                    Alert('عملیات با موفقیت انجام شد .',
                    ` سبد خرید${rowData.id} با موفقیت حذف شد .` , 'success');
                    handleGetCarts();
                }
            } catch (error) {
                // set error in httpService
            }
        }
    }




    // This is for calling Get carts function
    useEffect(() => {
        handleGetCarts();
        setLoading(true)
    }, []);

    // This is for calling Get products function when edit currentPage or searchField
    useEffect(() => {
        handleGetCarts();
        setLoading(true);
    }, [currentPage , searchField]);



    

    // This is for inital props <<<<=
    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'user_id' , title : 'آیدی کاربر'},
        {
            field : null ,
            title : 'نام کاربر',
            element : (rowData)=> (rowData.user.first_name + ' ' + rowData.user.last_name)
            || (rowData.user.user_name) || ('-') ,
        },
        {
            field : null ,
            title : 'شماره موبایل',
            element : (rowData)=> (rowData.user.phone) || ('-') ,
        },
        {
            field : null ,
            title : 'تعداد کالا',
            element : (rowData)=> (rowData.items.length) || ('0') ,
        },
        {
            title : 'عملیات' ,
            field : null ,
            element : (rowData)=> <Actions rowData={rowData} 
            handleDeleteCarts={handleDeleteCarts} />
        } 
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
            {hasPermission ? (
                <>
                    <AddBtnLink pach={'/Carts/add-cart'}  />
                    <Outlet context={{handleGetCarts}} />
                </>
            ) : null}
        </PaginatedDataTable>
    );
}

export default CartTable;
