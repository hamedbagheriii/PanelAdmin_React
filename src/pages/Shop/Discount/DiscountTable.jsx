import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../../components/tableComponent/PaginatedTable';
import AddDiscount from './AddDiscount';
import { DeleteDiscountService, getAllDiscountService } from '../../../services/shop/discounts/discount';
import Actions from './tableAddtions/Actions';
import ForAll from './tableAddtions/forAll';
import IsActive from './tableAddtions/isActive';
import { Confirm } from '../../../utils/confirm';
import { Alert } from '../../../utils/alert';
import AddBtnLink from '../../../UI/All/AddBtnLink';
import { Outlet } from 'react-router-dom';
import { convertDate } from '../../../utils/convertDate';

const DiscountTable = () => {

    const [data , setData] = useState([]);
    const [isLoading , setLoading] = useState(true);
    const [brandToEdit , setBrandToEdit] = useState(null);




    // This is for get discount
    const handleGetDiscount = async ()=>{
        try {
            const res = await getAllDiscountService();
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

    // This is for delete discount
    const handleDeleteDiscount = async (rowData)=>{
        if (await Confirm(`آیا از حذف تخفیف ${rowData.title}
        اطمینان دارید ؟`)) {
            try {
                const res = await DeleteDiscountService(rowData.id);
                if (res.status == 200) {
                    Alert('عملیات با موفقیت انجام شد .',
                    `تخفیف ${rowData.title} با موفقیت حذف شد .` , 'success');
                    handleGetDiscount();
                }
            } catch (error) {
                // set error in httpService
            }
        }
    }

    // This is for calling Get discount function
    useEffect(() => {
        handleGetDiscount();
        setLoading(true)
    }, []);





    // This is for inital props <<<<=
    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'title' , title : 'عنوان'},
        {field : 'code' , title : 'کد'},
        {field : 'percent' , title : 'درصد تخفیف'},
    ]

    const additionField = [
        {
            title : 'تاریخ انقضا' ,
            field : 'expire_at' ,
            element : (itemId,rowData)=> <td>{convertDate(rowData.expire_at)}</td>
        },
        {
            title : 'وضعیت' ,
            field : 'is_active' ,
            element : (itemId,rowData)=> <IsActive rowData={rowData} />
        },
        {
            title : 'مربوط به' ,
            field : 'for_all' ,
            element : (itemId,rowData)=> <ForAll rowData={rowData} />
        },
        {
            title : 'عملیات' ,
            field : 'operation' ,
            element : (itemId,rowData)=> <Actions rowData={rowData} 
            handleDeleteDiscount={handleDeleteDiscount} />
        } 
    ]

    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از عنوان را وارد کنید .' ,
        searchField : 'title'
    }
    // This is for inital props <<<<=


    return (
        <PaginatedTable data={data} dataInfo={dataInfo} additionField={additionField}
         searchParams={searchParams} numOfPage={4} isLoading={isLoading}>
            {/* --- Modal add Duscount --- */}
            <AddBtnLink id={`add_discount_modal`} pach={'/Discount/add-discount-code'} />
            <Outlet />
        </PaginatedTable>
    );
}

export default DiscountTable;
