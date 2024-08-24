import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../../components/tableComponent/PaginatedTable';
import AddBrand from './AddBrand';
import BrandLogo from './tableAdditons/BrandLogo';
import Actions from './tableAdditons/Actions';
import { useParams } from 'react-router-dom';
import { getBrandsService } from '../../../services/shop/brand/brand';

const BrandsTable = () => {
    const params = useParams();
    const [data , setData] = useState([]);
    const [isLoading , setLoading] = useState(true);

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
    ]

    const additionField = [
        {
            field : 'logo' ,
            title : 'لوگو' ,
            element : (itemId , rowData)=> <BrandLogo rowData={rowData} />
        } ,
        {
            field : 'Operation' ,
            title : 'عملیات' ,
            element : (itemId , rowData)=> <Actions rowData={rowData} />
        } ,
        
        
    ]

    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از عنوان انگلیسی را وارد کنید .' ,
        searchField : 'original_name'
    }
    // This is for inital props <<<<=



    return (
        <PaginatedTable data={data} dataInfo={dataInfo} additionField={additionField}
        searchParams={searchParams} numOfPage={4} isLoading={isLoading}>
            {/* --- Modal add Brand --- */}
            <AddBrand handleGetBrands={handleGetBrands} />
        </PaginatedTable>            
    );
}

export default BrandsTable;
