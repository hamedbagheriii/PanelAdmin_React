import React from 'react';
import '../../../assets/style/UiStyle.css'
import ModalsContainer from '../../../components/ModalsContainer';
import BtnModal from '../../../UI/pages/btnModal';
import PaginatedTable from '../../../components/PaginatedTable';

const AddAtrrCategory = () => {
    const data = [
        {
            id : 1 ,
            title : '52' ,
            unit : '4' ,
        } ,

    ]

    const dataInfo = [
        {field : 'id' , title : '#'},
        {field : 'title' , title : 'عنوان'},
        {field : 'unit' , title : 'مقدار'},
    ]

    const additionFieldElement = (itemId)=>{
        return(
            <>  
                <td>
                    <div className="form-check form-switch d-flex justify-content-center">
                        <input className="form-check-input pointer" type="checkbox"
                         id="flexSwitchCheckDefault" defaultChecked />
                    </div>
                </td>
                <td>
                    <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
                     title="ویرایش دسته" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                    <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
                     title="حذف دسته" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                </td>
            </>
        )
    }
    
    const additionField = [
        {
            title : 'نمایش در فیلتر' ,
            field : 'showInFilter' ,
            element : (itemId)=> additionFieldElement(itemId)
        } ,
        {
            title : 'عملیات' ,
            field : 'operation' ,
            element : ()=> {}
        }
    ]

    const searchParams = {
        title : 'جستجو' ,
        placeholder : 'قسمتی از نام یا شماره سبد را وارد کنید .' ,
        searchField : 'title'
    }



    return (
        <>
            <ModalsContainer
            id={'add_product_category_attr_modal'}
            fullscreen={true}
            title={'افزودن ویژگی دسته محصولات'}
            >
                <div className="container">
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
                                <i className="fas fa-check text-light bg-success rounded-circle p-2 mx-1 hoverable_text hoverable pointer has_tooltip hoverable_text" title="ثبت ویژگی" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                            </div>
                        </div>
                        <hr/>
                        
                        
                        {/* ==== table ==== */}
                        <PaginatedTable data={data} dataInfo={dataInfo} additionField={additionField}
                        searchParams={searchParams} numOfPage={4}>
            
                        </PaginatedTable>
                        {/* ==== table ==== */}

                    </div>
                </div>
            </ModalsContainer>
        </>
    );
}

export default AddAtrrCategory;
