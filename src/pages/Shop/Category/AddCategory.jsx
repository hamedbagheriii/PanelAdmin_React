import React from 'react';
import '../../../assets/style/UiStyle.css'
import ModalsContainer from '../../../components/ModalsContainer';
import BtnModal from '../../../UI/pages/btnModal';

const AddCategory = () => {
    return (
        <>
            <BtnModal id={`add_product_category_modal`} />

            <ModalsContainer
            id={'add_product_category_modal'}
            fullscreen={true}
            title={'افزودن دسته محصولات'}
            >
                <div className="container modal-Category h-100 pt-3 ">
                    <div className="row mx-auto align-items-center justify-content-around h-50 gap-2">
                        <div className="col-12 ">
                            <div className="input-group mb-3 dir_ltr" >
                                <select type="text" className="form-control">
                                    <option value="1">بدون والد</option>
                                    <option value="1">دسته شماره 1</option>
                                </select>
                                <span className="input-group-text w_6rem justify-content-center">دسته والد</span>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group mb-3 dir_ltr" >
                                <input type="text" className="form-control" placeholder="عنوان دسته"/>
                                <span className="input-group-text w_6rem justify-content-center">عنوان</span>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group mb-3 dir_ltr" >
                                <textarea type="text" className="form-control" placeholder="توضیحات" rows="5"></textarea>
                                <span className="input-group-text w_6rem justify-content-center">توضیحات</span>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group mb-3 dir_ltr">
                                <input type="file" className="form-control btnsss"  placeholder="تصویر" />
                                <span className="input-group-text w_6rem justify-content-center">تصویر</span>
                            </div>
                        </div>
                        <div className="col-12 row justify-content-center pb-3">
                            <div className="form-check form-switch col-6 ">
                                <label className="form-check-label pointer"  htmlFor="flexSwitchCheckDefault">وضعیت فعال</label>
                                <input className="form-check-input pointer" type="checkbox" id="flexSwitchCheckDefault"  />
                            </div>
                        </div>
                    </div>
                </div>
            </ModalsContainer>
        </>
    );
}

export default AddCategory;
