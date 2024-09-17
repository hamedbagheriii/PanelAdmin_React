import React, { useEffect, useState } from 'react';
import ModalsContainer from '../../../components/ModalsContainer';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import { initialValues, onSubmit, validationSchema } from './core';
import { getAllProductsTitlesService, getOneProductService } from '../../../services/shop/product/product';
import FormikControl from '../../../components/form/FormikControl';
import PaginatedTable from '../../../components/tableComponent/PaginatedTable';
import { numberWithCommas } from '../../../utils/numberWithCommas';
import SpinnerLoad from '../../../UI/All/SpinnerLoad';
import { createNewCartService, editCartService, getOneCartService } from '../../../services/orders/carts/cart';
import { Alert } from '../../../utils/alert';
import { Confirm } from '../../../utils/confirm';
import 'react-select-search/style.css';
import { getAllDiscountService } from '../../../services/shop/discounts/discount';


const Add_EditCart = () => {
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { handleGetCarts } = useOutletContext();
    const location = useLocation();
    const cartDataId = location.state?.cartDataId;
    const [allProducts, setAllProducts] = useState([]); // همه محصولات
    const [currentProduct, setCurrentProduct] = useState(null); // محصول انتخاب شده
    const [colors, setColors] = useState([]);
    const [guarantees, setGuarantees] = useState([]);
    const [selectedProductsInfo, setSelectedProductsInfo] = useState([]);
    const [reinitalValues , setReinitalValues] = useState(null);
    const [discountPrice , setDiscountPrice] = useState(null);

    // this is for get All Product
    const handleGetAllProductsTitles = async () => {
        try {
            const res = await getAllProductsTitlesService();
            if (res.status == 200) {
                setAllProducts(res.data.data.map(p => { return { name: p.title, value: p.id }; }));
                setLoading(false);
            }
        }
        catch (error) {
        }
    };

    // get one product
    const handleChangeSelectedProduct = async (e, formik) => {
        formik.setFieldValue('product_id', e);
        try {
            const res = await getOneProductService(e);
            if (res.status == 200) {
                const product = res.data.data;
                setCurrentProduct(product);
                // {name : g.title , value : g.id} : مقادیر دریافتی کامپوننت سبد خرید
                setGuarantees(product.guarantees.map(g => { return { name: g.title, value: g.id }; }));
                setColors(product.colors.map(c => { return { name: c.title, value: c.id }; }));
            }
        }
        catch (error) {
        }
    };

    // this is for post data
    const handleConfirmAddCart = async (formik) => {
        const sendAlert = (title)=>{
            Alert('عملیات با موفقیت انجام شد .',
            `سبد خرید با موفقیت ${title} شد .`,
            'success');
            handleGetCarts();
            navigate(-1);
        }


        let products = [];
        for (const item of selectedProductsInfo) {
            products.push({
                product_id : item.product.id ,
                color_id : item.color?.id || '',
                guarantee_id : item.gaurantee?.id || '',
                count : item.count ,
            })
        }

        // ارسال دیتا
        if (cartDataId) {
            const res = await editCartService(cartDataId,{
                user_id: formik.values.user_id,
                products
            });
            if (res.status == 200) {
                sendAlert('ویرایش')
            }
        }
        else{
            const res = await createNewCartService({
                user_id: formik.values.user_id,
                products
            });
            if (res.status == 201) {
                sendAlert('ایجاد')
            }
        }
    };

    // this is for delete selected Product
    const handleDeleteProduct = async (product) => {
        if (await Confirm(`آیا از حذف محصول ${product.product.title} اطمینان دارید ؟`)) {
            setSelectedProductsInfo(old => old.filter(o => o.id !== product.id));
            Alert('عملیات با موفقیت انجام شد .',
                `محصول ${product.product.title} با موفقیت حذف شد .`,
            'success');
        }
    };

    // this is for set data when edit cart
    const getCardToEditInfo = async ()=>{
        try {
            const res = await getOneCartService(cartDataId) 
            if (res.status == 200) {
                let products = [];
                let cart =  res.data.data;
                setReinitalValues({...initialValues , user_id : cart.user_id})
                for (const item of cart.items) {
                    products.push({
                        id : item.id,
                        product : item.product,
                        gaurantee: item.gaurantee || null,
                        color: item.color || null,
                        count : item.count,
                        product_Search : item.product.title
                    })
                }
                setSelectedProductsInfo(products)
            }
        }
        catch (error) {
        }
    }

    const handleGetDiscount = async (target,price) =>{
        try {
            const res = await getAllDiscountService();            
            if (res.status == 200) {
                let discounts = res.data.data;
                let discountTarget = discounts.filter(d=>d.code == target)[0];
                let count = price - ((price/100)*discountTarget?.percent);
                if (discountTarget?.for_all) {
                    setDiscountPrice(count);
                }
                else if(discountTarget?.products){
                    for (const item of discountTarget?.products) {
                        for (const product of selectedProductsInfo) {
                            if(item.id == product?.id) setDiscountPrice(count);
                            else setDiscountPrice(old=>old)
                        }
                    }
                }
                else{
                    setDiscountPrice(null)
                }
            }
            else{
                setDiscountPrice(null)
            }
        } 
        catch (error) {
        }
    }









    useEffect(() => {
        handleGetAllProductsTitles();
        setLoading(true);

        // برای شرط ادیت
        cartDataId && getCardToEditInfo();
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
            element: (rowData) => rowData.product.price || '-'
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
        {
            field: null,
            title: 'عملیات',
            element: (rowData) => {
                return (
                    <>
                        <i className='fas mx-2 fa-times text-danger pointer'
                        onClick={() => handleDeleteProduct(rowData)}></i>
                    </>
                )
            }
        },
    ];

    const searchParams = {
        title: 'جستجو',
        placeholder: 'قسمتی از نام محصول را وارد کنید .',
        searchField: 'product_Search'
    };
    // This is for inital props <<<<=
    return (
        <>
            <ModalsContainer
                id={'edit_add_cart_modal'}
                fullscreen={true}
                className='show d-block animate__animated animate__fadeInDown animate__fast'
                title={cartDataId ? 'ویرایش سبد خرید' : 'افزودن سبد خرید'}
                closeFunction={() => navigate(-1)}
            >
                <Formik
                    initialValues={reinitalValues || initialValues}
                    onSubmit={(values, submitProps) => onSubmit(values, submitProps, handleGetCarts,
                        setSelectedProductsInfo, currentProduct)}
                    validationSchema={validationSchema}
                    validateOnMount
                    enableReinitialize
                >
                    {(formik) => {
                        // console.log(formik.values);
                        return (
                            <div className="container modal_maxWidth">
                                <Form>
                                    <div className="row my-3 justify-content-center">
                                        <FormikControl
                                         name='user_id'
                                         type='number'
                                         label='آیدی مشتری'
                                         control='input'
                                         placeholder="فقط عدد بنویسید ."
                                         required={true}
                                        />

                                        <FormikControl
                                         name='product_id'
                                         label='محصول'
                                         control='selectSearch'
                                         required={true}
                                         onChange={(e) => handleChangeSelectedProduct(e, formik)}
                                         isSearch={true}
                                         options={allProducts} 
                                        />

                                        <FormikControl
                                         name='color_id'
                                         label='رنگ'
                                         control='selectSearch'
                                         required={true}
                                         onChange={(e) => formik.setFieldValue('color_id', e)}
                                         isSearch={true}
                                         options={colors} 
                                         disabled={colors.length ? false : true}
                                        />

                                        <FormikControl
                                         name='guarantee_id'
                                         label='گارانتی'
                                         control='selectSearch'
                                         required={true}
                                         onChange={(e) => formik.setFieldValue('guarantee_id', e)}
                                         isSearch={true}
                                         options={guarantees} 
                                         disabled={guarantees.length ? false : true}
                                        />

                                        <FormikControl
                                        name='count'
                                        type='number'
                                        label='تعداد'
                                        control='input'
                                        placeholder="فقط عدد بنویسید ."
                                        required={true} 
                                        />

                                        <div className="col-4  d-flex justify-content-center align-items-center my-1">
                                            <button type='submit' className='btn btn-primary'>اضافه کردن</button>
                                        </div>
                                        <hr className="mt-3" />
                                    </div>
                                </Form>


                                <PaginatedTable data={selectedProductsInfo} dataInfo={dataInfo}
                                    searchParams={searchParams} numOfPage={4} isLoading={isLoading}>
                                </PaginatedTable>
                                {selectedProductsInfo.length > 0 ? (
                                    <div className='w-100 mt-2'>
                                        <div className={`col-12 mb-3`}>
                                            <div className={`input-group mb-2 dir_ltr`}>
                                                <Field name={'cart_id'} type='text'
                                                className='form-control' id={'cart_id'+`-id`}
                                                placeholder={"فقط حروف و عدد بنویسید ."}
                                                onChange={(e)=>{handleGetDiscount(e.target.value ,
                                                selectedProductsInfo.map(p => p.count * p.product.price)
                                                .reduce((a, b) => a + b))}} />
                                                <span className="input-group-text w_7rem h-100 
                                                text_wrap justify-content-center">{'کد تخفیف'}</span>
                                            </div>
                                        </div>
                                        <div className='col-12 alert alert-success d-flex justify-content-center flex-column
                                        align-items-center fs-6 fw-bold w-100'
                                            style={{ height: 60 }}>
                                            {/* reduce : همه ی اعداد یک ارایه را باهم جمع میکند */}
                                            {!discountPrice ? (
                                                <div className='d-flex justify-content-around col-12'>
                                                    <span>مبلغ کل :</span>
                                                    {numberWithCommas(selectedProductsInfo.map(p => p.count * p.product.price)
                                                    .reduce((a, b) => a + b))} تومان
                                                </div>
                                            ) : (
                                                <div className='col-12 text-center d-flex justify-content-around'>
                                                    <span className='h-100 d-flex align-items-center'>مبلغ کل با تخفیف :</span>
                                                    <div>
                                                        {numberWithCommas(discountPrice)} تومان
                                                        <div style={{fontSize:12}}>
                                                            <del className='text-right'>{
                                                                numberWithCommas(selectedProductsInfo.map(p => p.count * p.product.price)
                                                                .reduce((a, b) => a + b))
                                                            }</del> تومان
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <hr className='my-4 ' />
                                        <div className={`w-100 d-flex justify-content-around `}>
                                            <button type="button" className="btn btn-danger modal-btn w-25"
                                                onClick={() => (navigate(-1))} data-bs-dismiss="modal">انصراف</button>
                                            <button type='submit'
                                                onClick={() => handleConfirmAddCart(formik)}
                                                className="btn btn-primary modal-btn w-25"
                                                disabled={formik.isSubmitting}>
                                                {formik.isSubmitting ?
                                                    <SpinnerLoad colorClass={'text-white'} inline={true} isSmall />
                                                    : 'ذخیره'}
                                            </button>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        );
                    }}
                </Formik>
            </ModalsContainer>
        </>
    );
};


export default Add_EditCart;