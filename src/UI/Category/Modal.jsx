import React from 'react';
import '../../assets/style/UiStyle.css';


const CategoryModal = ({title , categoryParentTitle , categoryParent1 , categoryParent2 , categoryTitle ,
    disc , img , status}) => {
    return (
        <div className="modal fade" id="add_product_category_modal" >
            <div className="modal-dialog  modal-fullscreen">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title flex-fill" id="exampleModalLabel">افزودن دسته محصولات</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" ></button>
                    </div>
                    <div className="modal-body d-flex align-items-center mx-auto">
                        <div className="container h-100 pt-5">
                            <div className="row justify-content-around h-50">
                                <div className="col-12">
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
                                <div className="col-12 row justify-content-center">
                                    <div className="form-check form-switch col-6 ">
                                        <label className="form-check-label pointer"  htmlFor="flexSwitchCheckDefault">وضعیت فعال</label>
                                        <input className="form-check-input pointer" type="checkbox" id="flexSwitchCheckDefault"  />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer w-100 d-flex justify-content-around">
                        <button type="button" className="btn btn-danger modal-btn w-25" data-bs-dismiss="modal">انصراف</button>
                        <button type='submit' className="btn btn-primary modal-btn w-25">ذخیره</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryModal;
