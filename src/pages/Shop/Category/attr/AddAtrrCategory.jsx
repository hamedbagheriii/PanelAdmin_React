import React, { useEffect, useState } from 'react';
import '../../../../assets/style/UiStyle.css'
import PaginatedTable from '../../../../components/tableComponent/PaginatedTable';
import PrevPageBTN from '../../../../UI/All/PrevPageBTN';
import { useLocation } from 'react-router-dom';
import ShowInFilter from './ShowInFilter';
import AtrrAction from './AtrrAction';
import { getCategoriesAtrrsService } from '../../../../services/shop/categoryAttr';

const AddAtrrCategory = () => {
    const location = useLocation();
    const [data , setData] = useState([]);
    const [isLoading , setLoading] = useState(true);

    const handleGetCateogryAttrs = async ()=>{
        try {
            let categoryID = location.state.categoryData.id;
            const res = await getCategoriesAtrrsService(categoryID);
            if (res.status == 200) {
                console.log(res.data.data);
                setData(res.data.data)
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

    useEffect(() => {
        handleGetCateogryAttrs();
        setLoading(true);
    }, []);




    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'title' , title : 'عنوان ویژگی'},
        {field : 'unit' , title : 'واحد'},
    ]

    const additionField = [
        {
            title : 'نمایش در فیلتر' ,
            field : 'in_filter' ,
            element : (itemId , rowData)=> <ShowInFilter rowData={rowData} />
        } ,
        {
            title : 'عملیات' ,
            field : 'operation' ,
            element : (itemId , rowData)=> <AtrrAction rowData={rowData} />
        }
    ]

    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از نام را وارد کنید .' ,
        searchField : 'title'
    }


    return (
        <>
            <div className='mt-4 w-100 d-flex justify-content-center' >
                <h6 className='d-flex fw-bold text-white fs-4'>
                    افزودن ویژگی :
                </h6>
            </div>
            <hr className='bg-white w-75 mx-auto mt-3'/>
            <div className="container text-white">
                <div className="row justify-content-center">
                    <div className="row my-3">
                        <div className="col-12 col-md-6 col-lg-4 my-1">
                            <input type="text" className="form-control" placeholder="عنوان ویژگی جدید" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 my-1">
                            <input type="text" className="form-control" placeholder="واحد ویژگی جدید" />
                        </div>
                        <div className="col-8 col-lg-2 my-1">
                            <div className="form-check form-switch d-flex justify-content-center align-items-center p-0 h-100">
                                <label className="form-check-label pointer" htmlFor="flexSwitchCheckDefault">نمایش در فیلتر</label>
                                <input className="form-check-input pointer mx-3" type="checkbox" id="flexSwitchCheckDefault" defaultChecked />
                            </div>                            
                        </div>
                        <div className="col-4 col-lg-2 d-flex justify-content-center align-items-center my-1">
                            <i className="fas fa-check text-light bg-success rounded-circle p-2 mx-1 hoverable_text hoverable pointer has_tooltip hoverable_text" 
                            title="ثبت ویژگی" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                        </div>
                    </div>
                    <hr/>
                    <div className={`${isLoading ? 'mb-0 mt-4' : 'mb-3 mt-2'} w-100 d-flex justify-content-center`} >
                        <h6 className='d-flex fw-bold text-primary fs-4'>
                            مدیریت ویژگی های دسته 
                            <span className='text-white text-center pe-2'>
                                {location.state.categoryData.title} :
                            </span>
                        </h6>
                    </div>
                    
                    {/* ==== table ==== */}
                    <PaginatedTable data={data} dataInfo={dataInfo} additionField={additionField}
                    searchParams={searchParams} numOfPage={4} isLoading={isLoading}>
                    
                    </PaginatedTable>
                    {/* ==== table ==== */}
                </div>
            </div>
            <PrevPageBTN />
        </>
    );
}

export default AddAtrrCategory;
