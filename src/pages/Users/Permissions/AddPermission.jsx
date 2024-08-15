import React from 'react';
import ModalsContainer from '../../../components/ModalsContainer';
import BtnModal from '../../../UI/pages/btnModal';

const AddPermission = () => {
    return (
        <>
            <BtnModal id={`add_Permission_modal`} />

            <ModalsContainer
            id={'add_Permission_modal'}
            fullscreen={false}
            title={'افزودن مجوز'}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="input-group my-3 dir_ltr">
                                <input type="text" className="form-control" placeholder=""/>
                                <span className="input-group-text w_8rem justify-content-center">عنوان مجوز</span>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group my-3 dir_ltr">
                                <input type="text" className="form-control" placeholder=""/>
                                <span className="input-group-text w_8rem justify-content-center">توضیحات مجوز</span>
                            </div>
                        </div>                        
                        <div className="col-12 my-2">
                            <div className="form-check form-switch col-5 col-md-4">
                                <input className="form-check-input pointer" type="checkbox" id="flexSwitchCheckDefault" defaultChecked={true} />
                                <label className="form-check-label pointer" htmlFor="flexSwitchCheckDefault">وضعیت : فعال</label>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalsContainer>
        </>
    );
}

export default AddPermission;
