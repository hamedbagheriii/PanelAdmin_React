import React, { useEffect, useState } from 'react';
import ModalsContainer from '../../../components/ModalsContainer';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import FormikControl from '../../../components/form/FormikControl';
import { getAllDeliveriesService } from '../../../services/orders/delivereis/delivery';
import { initialValues, onSubmit, validationSchema } from './core';
import SubmitBTN from '../../../components/form/SubmitBTN';
import PersonalError from '../../../components/form/personalComponenet/personalError';
import { getOneCartService } from '../../../services/orders/carts/cart';
import { numberWithCommas } from '../../../utils/numberWithCommas';
import { getOneOrderService } from '../../../services/orders/order/order';
import { convertDate } from '../../../utils/convertDate';
import PaginatedTable from '../../../components/tableComponent/PaginatedTable';
import LoadingAlert from '../../../UI/All/LoadingAlert';
import { Alert } from '../../../utils/alert';
import { getOneDiscountService } from '../../../services/shop/discounts/discount';
import PrevPageBTN from '../../../UI/All/PrevPageBTN';

const AddOrder = () => {
    const navigate = useNavigate();
    const [delivereis , setDeliveris] = useState([]);
    const {handleGetOrders} = useOutletContext()
    const [price , setPrice] = useState(null);
    const [showData , setShowData] = useState([]);
    const [discount , setDiscount] = useState(null);
    const location = useLocation();
    const orderID = location.state?.orderID;
    const [isLoading, setLoading] = useState(true);
    const [reinitalValues , setReinitalValues] = useState(null);
    

    const hadleGetDeliveres = async ()=>{
        try {
            const res = await getAllDeliveriesService();
            if (res.status == 200) {
                setDeliveris(res.data.data
                .map(d=>{return{id : d.id , value : d.title}}));
            }
        }
        catch (error) {
        }
    }

    const handleSetCartID = async (e,formik)=>{
        formik.setFieldValue('cart_id',e);
        if (e > 0) {
            try {
                const res = await getOneCartService(e);
                let price = [];
                if (res.status == 200 && res.data.data && !res.data.data.is_ordered) {
                    for (const item of res.data.data.items) {
                        price.push(item.product.price)
                    }
                    price = price.reduce((a,b)=>a+b);
                    setPrice(numberWithCommas(price))
                    setShowData(res.data.data?.items || [] )
                    setLoading(false)
                }
                else{
                    setPrice(null)
                    setShowData([])
                    setTimeout(() => {
                        if(res.data.data?.is_ordered ){
                            Alert('خطا','این سبد در سفارش دیگری قرار دارد .'
                            ,'warning')
                        }
                        else if(!showData.length > 0 ){
                            Alert('خطا','این سبد وجود ندارد ! یک سبد دیگر انتخاب کنید .'
                            ,'warning')
                        }
                    }, 1000);
                }
            }
            catch (error) {
            }
        }
    }

    const handleSetDiscountID = async (e,formik)=>{
        formik.setFieldValue('discount_id',e);
        if (e > 0) {
            try {
                const res = await getOneDiscountService(e);
                if (res.status == 200) {
                    setDiscount(res.data.data.percent+'%')
                    setLoading(false)
                }
                    
            }
            catch (error) {
            }
        }
    }

    const handleShowDitailes = async ()=>{
        try {
            const res = await getOneOrderService(orderID)
            if (res.status == 200) {
                const order = res.data.data;
                setShowData(order.cart?.items || [])
                setLoading(false)
                setReinitalValues({
                    cart_id : order.cart.id  ,
                    discount_id : order.discount_id || '' ,
                    delivery_id : order.delivery_id || '' ,
                    address : order.address || '' ,
                    phone : order.phone || '' ,
                    pay_at : convertDate(order.pay_at) || '' ,
                    pay_bank : order.pay_bank || '' ,
                    pay_card_number : order.pay_card_number || '' ,
                    email : order.email || '' ,
                })
            }    
        }
        catch (error) {
        }
    }


    useEffect(() => {
        hadleGetDeliveres();
        orderID && handleShowDitailes()
    }, []);

    // This is for inital props <<<<=
    const dataInfo = [
            { field: 'id', title: '#' },
            {
                field: null,
                title: 'نام محصول',
                element: (rowData) => rowData.product.title || '-'
            },
            {
                field: null,
                title: 'قیمت',
                element: (rowData) => numberWithCommas(rowData.unit_price) || '-'
            },
            {
                field: null,
                title: 'گارانتی',
                element: (rowData) => rowData.gaurantee?.title || '-'
            },
            {
                field: null,
                title: 'رنگ',
                element: (rowData) => rowData.color?.title || '-'
            },
            { field: 'count', title: 'مقدار' },
    ];

    const searchParams = {
        title: 'جستجو',
        placeholder: 'قسمتی از آیدی محصول را وارد کنید .',
        searchField: 'id'
    };
    // This is for inital props <<<<=

    return (
        <>
            <ModalsContainer
            id={'add_order_modal'}
            fullscreen={true}
            title={!orderID ? 'افزودن سفارش' : 'جزییات سفارش'}
            closeFunction={() =>navigate(-1)}
            className='show d-block animate__animated animate__fadeInDown animate__fast'
            >
                <Formik
                initialValues={reinitalValues || initialValues}
                onSubmit={(values,submitProps)=>onSubmit(values,submitProps,
                navigate,handleGetOrders)}
                validationSchema={validationSchema}
                enableReinitialize
                >
                    {(formik)=>{
                        // console.log(formik);
                        return (
                            <Form className="container modal_maxWidth">
                                <div className="row my-1 justify-content-center">
                                    <div className={`col-12 mb-2`}>
                                        <div className={`input-group mb-2 dir_ltr`}>
                                            <span className="input-group-text input_required
                                             text-danger w_1rem  text_wrap justify-content-center">اجباری</span>
                                            <Field name={'cart_id'} type='number'
                                            className='form-control' id={'cart_id'+`-id`}
                                            placeholder={"فقط عدد بنویسید ."}
                                            disabled={orderID ? true : false}
                                            onChange={(e)=>handleSetCartID(e.target.value,formik)} />
                                            <span className="input-group-text w_7rem h-100 
                                            text_wrap justify-content-center">{'آیدی سبد'}</span>
                                        </div>
                                        <ErrorMessage className='border'
                                        name={'cart_id'} component={PersonalError} /> 
                                    </div>
                                    
                                    {price ? (
                                        <div className={`col-12 mb-2`}>
                                            <div className={`input-group mb-2 dir_ltr`}>
                                                <input type="text" disabled placeholder="لطفا سبد را انتخاب کنید ." 
                                                className='form-control' value={price} />
                                                <span className="input-group-text w_7rem h-100 
                                                text_wrap justify-content-center">مبلغ پرداختی</span>
                                            </div>
                                        </div>
                                    ) : null}

                                    <div className={`col-12 mb-2`}>
                                        <div className={`input-group mb-2 dir_ltr`}>
                                            <span className="input-group-text input_required
                                             text-danger w_1rem  text_wrap justify-content-center">اجباری</span>
                                            <Field name={'discount_id'} type='text'
                                            className='form-control' id={'discount'+`-id`}
                                            placeholder={"فقط حروف و عدد بنویسید ."}
                                            disabled={orderID ? true : false}
                                            onChange={(e)=>handleSetDiscountID(e.target.value,formik)} />
                                            <span className="input-group-text w_7rem h-100 
                                            text_wrap justify-content-center">{'کد تخفیف'}</span>
                                        </div>
                                        <ErrorMessage className='border'
                                        name={'discount_id'} component={PersonalError} /> 
                                    </div>

                                    {discount ? (
                                        <div className={`col-12 mb-2`}>
                                            <div className={`input-group mb-2 dir_ltr`}>
                                                <input type="text" disabled placeholder="لطفا تخفیف را انتخاب کنید ." 
                                                className='form-control' value={discount} />
                                                <span className="input-group-text w_7rem h-100 
                                                text_wrap justify-content-center">درصد تخفیف</span>
                                            </div>
                                        </div>
                                    ) : null}

                                    <FormikControl
                                     name='address'
                                     type='text'
                                     label='آدرس کامل'
                                     control='textarea'
                                     placeholder="فقط حروف و عدد بنویسید ."
                                     required={true}
                                     disabled={orderID ? true : false}
                                    /> 

                                    <FormikControl
                                     name='delivery_id'
                                     type='text'
                                     label='نوع ارسال'
                                     control='select'
                                     placeholder="فقط حروف و عدد بنویسید ."
                                     options={delivereis}
                                     firstItem='نوع ارسال را انتخاب کنید .'
                                     required={true}
                                     disabled={orderID ? true : false}
                                    /> 

                                    <FormikControl 
                                     name='pay_at'
                                     label='تاریخ پرداخت'
                                     control='date'
                                     required={true}
                                     formik={formik}
                                     yearsLimit={{from:10,to:10}}
                                     disabled={orderID ? true : false}
                                    />

                                    <FormikControl
                                     name='phone'
                                     type='number'
                                     label='شماره موبایل'
                                     control='input'
                                     placeholder="فقط عدد بنویسید ."
                                     required={true}
                                     disabled={orderID ? true : false}
                                    /> 

                                    <FormikControl
                                     name='email'
                                     type='text'
                                     label='ایمیل'
                                     control='input'
                                     placeholder="فقط قالب ایمیل بنویسید ."
                                     required={true}
                                     disabled={orderID ? true : false}
                                    /> 

                                    <FormikControl
                                     name='pay_card_number'
                                     type='text'
                                     label='شماره کارت'
                                     control='input'
                                     placeholder="فقط عدد بنویسید ."
                                     required={true}
                                     disabled={orderID ? true : false}
                                    /> 

                                    <FormikControl
                                     name='pay_bank'
                                     type='text'
                                     label='نام بانک'
                                     control='input'
                                     placeholder="فقط حروف بنویسید ."
                                     required={true}
                                     disabled={orderID ? true : false}
                                    /> 

                                    
                                    {!orderID ? (
                                        <div className='col-12 w-100 my-2'>
                                            <SubmitBTN formik={formik} isModal={false} isValid={false} /> 
                                        </div>
                                    ) : null}
                                    <hr className="mt-3 pt-1 bg-white rounded-3 w-100"/>
                                </div>

                                {formik.values.cart_id && showData.length > 0 ? (
                                    <PaginatedTable data={showData} dataInfo={dataInfo}
                                        searchParams={searchParams} numOfPage={4} isLoading={isLoading}>
                                    </PaginatedTable>
                                ) : (
                                    <LoadingAlert spinner={false} bgColor='warning' title={'هیچ آیتمی یافت نشد .'} />
                                )}
                            </Form>
                        )
                    }}
                </Formik>

                {orderID ? (
                    <PrevPageBTN />
                ) : null}
            </ModalsContainer>
        </>
    );
}

export default AddOrder;
