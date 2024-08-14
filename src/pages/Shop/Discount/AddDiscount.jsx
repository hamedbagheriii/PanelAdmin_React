import React from 'react';
import { createPortal } from 'react-dom';
import ModalsContainer from '../../../components/ModalsContainer';
import BtnModal from '../../../UI/pages/btnModal';

const AddDiscount = () => {
    return (
        <>
            <BtnModal id={`add_discount_modal`} />

            <ModalsContainer
            id={'add_discount_modal'}
            fullscreen={true}
            title={'افزودن کد تخفیف'}
            >
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-12 col-md-6 col-lg-8">
                            <div class="input-group my-3 dir_ltr">
                                <input type="text" class="form-control" placeholder="کیبرد را در حالت فارسی قرار دهید" />
                                <span class="input-group-text w_8rem justify-content-center">عنوان کد</span>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-8">
                            <div class="input-group my-3 dir_ltr">
                                <input type="text" class="form-control" placeholder="کیبرد را در حالت لاتین قرار دهید" />
                                <span class="input-group-text w_8rem justify-content-center">کد تخفیف</span>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-8">
                            <div class="input-group my-3 dir_ltr">
                                <input type="number" class="form-control" placeholder="فقط عدد " />
                                <span class="input-group-text w_8rem justify-content-center">درصد تخفیف </span>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-8">
                            <div class="input-group my-3 dir_ltr">
                                <input type="text" class="form-control" placeholder="مثلا 1400/10/10 " />
                                <span class="input-group-text w_8rem justify-content-center">تاریخ اعتبار </span>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-8 col-md-6 col-lg-8">
                            <div class="input-group my-3 dir_ltr">
                                <input type="text" class="form-control" placeholder="قسمتی از نام محصول را وارد کنید" list="brandLists" />
                                <span class="input-group-text w_8rem justify-content-center">برای</span>
                                <datalist id="brandLists">
                                    <option value="محصول شماره 1" />
                                    <option value="محصول شماره 2" />
                                    <option value="محصول شماره 3" />
                                </datalist>
                            </div>
                            <div class="col-12 col-md-6 col-lg-8">
                                <span class="chips_elem">
                                    <i class="fas fa-times text-danger"></i>
                                    محصول 1
                                </span>
                                <span class="chips_elem">
                                    <i class="fas fa-times text-danger"></i>
                                    محصول 2
                                </span>
                            </div>
                        </div>                                             
                    </div>
                </div>
            </ModalsContainer>
        </>
    );
}

export default AddDiscount;
