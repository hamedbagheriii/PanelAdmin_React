import React from 'react';
import ModalsContainer from '../../../components/ModalsContainer';
import BtnModal from '../../../UI/pages/btnModal';

const AddRole = () => {
    return (
        <>
            <BtnModal id={`add_role_modal`} />

            <ModalsContainer
            id={'add_role_modal'}
            fullscreen={false}
            title={'افزودن نقش'}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="input-group my-3 dir_ltr">
                                <input type="text" className="form-control" placeholder=""/>
                                <span className="input-group-text w_8rem justify-content-center">عنوان نقش</span>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group my-3 dir_ltr">
                                <input type="text" className="form-control" placeholder=""/>
                                <span className="input-group-text w_8rem justify-content-center">توضیحات نقش</span>
                            </div>
                        </div>                        
                        <div className="col-12 my-1 mb-3">
                            <div className="input-group my-2 dir_ltr">
                                <input type="text" className="form-control" placeholder="قسمتی از مجوز مورد نظر را وارد کنید" list="permissionsList"/>
                                <span className="input-group-text w_8rem justify-content-center">دسترسی ها</span>
                                <datalist id="permissionsList">
                                    <option value="مجوز شماره 1"/>
                                    <option value="مجوز شماره 2"/>
                                    <option value="مجوز شماره 3"/>
                                </datalist>
                            </div>
                            <div className="col-12 col-md-6 col-lg-8">
                                <span className="chips_elem">
                                    <i className="fas fa-times text-danger"></i>
                                    مجوز 1
                                </span>
                                <span className="chips_elem">
                                    <i className="fas fa-times text-danger"></i>
                                    مجوز 2
                                </span>
                            </div>
                        </div> 
                        <div className="col-12 my-2">
                            <div className="form-check form-switch col-5 col-md-4">
                                <input className="form-check-input pointer" type="checkbox" id="flexSwitchCheckDefault" checked/>
                                <label className="form-check-label pointer" for="flexSwitchCheckDefault">وضعیت : فعال</label>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalsContainer>
        </>
    );
}

export default AddRole;
