import React, { useEffect, useState } from 'react';
import AddProduct from './AddProduct';
import ProductAction from './tableAddition/ProductAction';
import PaginatedDataTable from '../../../components/tableComponent/paginatedDataTable';
import { getProductsService } from '../../../services/shop/product/product';

const ProductTable = () => {
    const [tableData , setTableData] = useState([]);
    const [isLoading , setLoading] = useState(true);
    const [currentPage , setCurrentPage] = useState(1);
    const [countOnPage , setCountOnPage] = useState(4);
    const [pageCount , setPageCount] = useState(10);
    const [searchField , setSearchField] = useState('');




    // This is for get products
    const handleGetProducts = async ()=>{
        try {
            const res = await getProductsService(currentPage,countOnPage,searchField);
            if (res.status == 200) {
                setTableData(res.data.data);
                // setPageCount(res.data.last_page);
            }
        } catch (error) {
            // set error in httpService
        }
        finally{
            setLoading(false);
        }
    }

    // This is for calling Get products function
    useEffect(() => {
        handleGetProducts();
        setLoading(true);
    }, []);

    // This is for calling Get products function when edit currentPage or searchField
    useEffect(() => {
        handleGetProducts();
        setLoading(true);
    }, [currentPage , searchField]);





    // This is for inital props <<<<=
    const dataInfo = [
        {field : 'id' , title : '#'},
        {
            field : null ,
            title : 'گروه محصول',
            element : (rowData)=> rowData.categories.length ?
            rowData.categories[0].title : null ,
        },
        {field : 'title' , title : 'عنوان'},
        {field : 'price' , title : 'قیمت'},
        {field : 'stock' , title : 'موجودی'},
        {
            field : null ,
            title : 'عملیات',
            element : (rowData)=> <ProductAction rowData={rowData}/>
        },
    ]

    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از عنوان را وارد کنید .' ,
        searchField : 'title'
    }
    // This is for inital props <<<<=

    return (
        <PaginatedDataTable dataInfo={dataInfo} searchParams={searchParams} isLoading={isLoading}
        setSearchField={setSearchField} tableData={tableData} setCurrentPage={setCurrentPage}
        currentPage={currentPage} pageCount={pageCount} searchField={searchField }>
            {/* --- Modal add Product --- */}
            <AddProduct/>
        </PaginatedDataTable>
    );
}

export default ProductTable;
