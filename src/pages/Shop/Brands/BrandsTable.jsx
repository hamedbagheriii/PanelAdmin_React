import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../../components/tableComponent/PaginatedTable';
import AddBrand from './AddBrand';
import BrandLogo from './tableAdditons/BrandLogo';
import Actions from './tableAdditons/Actions';
import { deleteBrandService, getBrandsService } from '../../../services/shop/brand/brand';
import { Alert } from '../../../utils/alert';
import { Confirm } from '../../../utils/confirm';
import { useHasPermission } from '../../../hook/permissionHook';

const BrandsTable = () => {
    const [data , setData] = useState([]);
    const [isLoading , setLoading] = useState(true);
    const [brandToEdit , setBrandToEdit] = useState(null);
    const hasPermission = useHasPermission('create_brand')




    // This is for get Brands
    const handleGetBrands = async ()=>{
        try {
            const res = await getBrandsService();
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

    // This is for delete Brand
    const handleDeleteBrand = async (rowData)=>{
        if (await Confirm(`آیا از حذف برند ${rowData.original_name}
        اطمینان دارید ؟`)) {
            try {
                const res = await deleteBrandService(rowData.id);
                if (res.status == 200) {
                    Alert('عملیات با موفقیت انجام شد .',
                    `برند ${rowData.original_name} با موفقیت حذف شد .` , 'success');
                    handleGetBrands();
                }
            } catch (error) {
                // set error in httpService
            }
        }
    }

    // This is for calling Get brands function
    useEffect(() => {
        handleGetBrands();
        setLoading(true)
    }, []);



    // This is for inital props <<<<=
    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'original_name' , title : 'عنوان'},
        {field : 'persian_name' , title : 'عنوان فارسی'},
        {field : 'descriptions' , title : 'توضیحات'},
        {
            field : null ,
            title : 'لوگو' ,
            element : (rowData)=>{
                return <BrandLogo rowData={rowData} />
            },
        
        },
        {
            field : null ,
            title : 'عملیات',
            element : (rowData)=>{
                return <Actions rowData={rowData}
                handleDeleteBrand={handleDeleteBrand} setBrandToEdit={setBrandToEdit} />
            },
        
        },
    ]

    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از عنوان انگلیسی را وارد کنید .' ,
        searchField : 'original_name'
    }
    // This is for inital props <<<<=



    return (
        <PaginatedTable data={data} dataInfo={dataInfo} searchParams={searchParams}
        numOfPage={4} isLoading={isLoading}>
            {/* --- Modal add Brand --- */}
            {hasPermission ? (
               <AddBrand handleGetBrands={handleGetBrands} setBrandToEdit={setBrandToEdit} 
                brandToEdit={brandToEdit} />
            ) : null }
        </PaginatedTable>            
    );
}

export default BrandsTable;
