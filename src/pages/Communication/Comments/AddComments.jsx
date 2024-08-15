import React from 'react';
import ModalsContainer from '../../../components/ModalsContainer';
import BtnModal from '../../../UI/pages/btnModal';

const AddComment = () => {
    return (
        <>
            <BtnModal id={`add_question_modal`} />

            <ModalsContainer
            id={'add_question_modal'}
            fullscreen={false}
            title={'افزودن نظر'}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="input-group my-3 dir_ltr">
                                <textarea rows="5" className="form-control"></textarea>
                                <span className="input-group-text w_8rem justify-content-center">متن نظر</span>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="input-group my-2 dir_ltr">
                                <input type="text" className="form-control" placeholder="قسمتی از نام محصول مورد نظر را وارد کنید" list="productList"/>
                                <span className="input-group-text w_8rem justify-content-center">برای</span>
                                <datalist id="productList">
                                    <option value="محصول شماره 1"/>
                                    <option value="محصول شماره 2"/>
                                    <option value="محصول شماره 3"/>
                                </datalist>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalsContainer>
        </>
    );
}

export default AddComment;
