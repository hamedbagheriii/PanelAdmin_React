import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../components/tableComponent/PaginatedTable';
import HandleLoadChart from '../../assets/js/Chart';
import { Confirm } from '../../utils/confirm';
import { Alert } from '../../utils/alert';
import { getFerwerProductsService, toggleNotifcationService } from '../../services/shop/product/product';
import ActionIcon from '../../UI/pages/actionIcon';
import LoadingAlert from '../../UI/All/LoadingAlert';
import { useHasPermission } from '../../hook/permissionHook';

const DashbordTable = () => {
    const [data , setData] = useState([]);
    const [isLoading , setLoading] = useState(true);
    const hasChartPermission = useHasPermission('read_order_year');


    // This is for get fewer product
    const handleGetFewerProduct = async ()=>{
        try {
            const res = await getFerwerProductsService();
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

    // This is for Ignore fewer product notification
    const handleIgnoreNotif = async (rowData)=>{
        if (await Confirm(`آیا از حذف پیام ${rowData.title}
        اطمینان دارید ؟`)) {
            try {
                const res = await toggleNotifcationService(rowData.id);
                if (res.status == 200) {
                    Alert('عملیات با موفقیت انجام شد .',
                    `پیام ${rowData.title} با موفقیت حذف شد .` , 'success');
                    handleGetFewerProduct();
                }
            } catch (error) {
                // set error in httpService
            }
        }
    }

    // This is for calling Get product function
    useEffect(() => {
        handleGetFewerProduct();
        setLoading(true)
    }, []);






    // This is for inital props <<<<=
    const dataInfo = [
        {field : 'id' , title : '#'},
        {
            field : null ,
            title : 'دسته',
            element : (rowData)=> rowData.categories?.[0].title || ''
        },
        {field : 'title' , title : 'عنوان'},
        {
            field : null ,
            title : 'موجودی',
            element : (rowData)=> <span className={`${rowData.stock > 3 ? 'text-warning' 
            : 'text-danger'} fw-bold`}>{rowData.stock <= 0 ? '! اتمام یافت' : rowData.stock}</span> 
        },
        {field : 'price' , title : 'قیمت'},
        {
            field : null ,
            title : 'عملیات',
            element : (rowData)=> <ActionIcon icon={'fas fa-times text-danger pointer'}
            action={()=>handleIgnoreNotif(rowData)} ptitle={'update_product_notification'}
            title={'نادیده گرفتن'} />
        },
    ]

    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از عنوان را وارد کنید .' ,
        searchField : 'title'
    }
    // This is for inital props <<<<=
    
    return (
        <div className="row">

            {!isLoading ? (
                <>
                    <div className="col-12 col-lg-6 " >
                        <p className="text-center mt-3 text-white fw-bold">محصولات رو به اتمام :</p>

                        <PaginatedTable data={data} dataInfo={dataInfo} 
                         searchParams={searchParams} numOfPage={4} isLoading={isLoading} />
                    </div>
                    <div className="col-12 d-flex align-items-center justify-content-center col-lg-6 mt-4 mt-lg-0 text-light text-white" >
                        {hasChartPermission && 
                            <HandleLoadChart />
                        }
                    </div>
                </>
            ) : (
                <LoadingAlert />
            )}

        </div>
    );
}

export default DashbordTable;
