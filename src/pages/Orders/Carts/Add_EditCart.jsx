import React, { useEffect, useState } from 'react';
import ModalsContainer from '../../../components/ModalsContainer';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { ErrorMessage, Form, Formik } from 'formik';
import { initialValues, onSubmit, validationSchema } from './core';
import { getAllProductsTitlesService, getOneProductService } from '../../../services/shop/product/product';
import FormikControl from '../../../components/form/FormikControl';
import SelectSearch from 'react-select-search';
import PersonalError from '../../../components/form/personalComponenet/personalError';
import PaginatedTable from '../../../components/tableComponent/PaginatedTable';
import { numberWithCommas } from '../../../utils/numberWithCommas';
import SpinnerLoad from '../../../UI/All/SpinnerLoad';
import { createNewCartService } from '../../../services/orders/carts/cart';
import { Alert } from '../../../utils/alert';
import { Confirm } from '../../../utils/confirm';
import 'react-select-search/style.css';


const Add_EditCart = () => {
    const [isLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { handleGetCarts } = useOutletContext();
    const location = useLocation();
    const cartData = location.state?.cartData;
    const [allProducts, setAllProducts] = useState([]); // همه محصولات
    const [currentProducts, setCurrentProducts] = useState(null); // محصول انتخاب شده
    const [colors, setColors] = useState([]);
    const [guarantees, setGuarantees] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]); // ارایه محصولات انتخاب شده
    const [selectedProductsInfo, setSelectedProductsInfo] = useState([]);
    // const [reinitalValues , setReinitalValues] = useState(null);

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
                setCurrentProducts(product);
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
        const res = await createNewCartService({
            user_id: formik.values.user_id,
            products: selectedProducts
        });
        if (res.status == 201) {
            Alert('عملیات با موفقیت انجام شد .',
                `سبد خرید با موفقیت ایجاد شد .`,
                'success');
            handleGetCarts();
            navigate(-1);
        }
    };

    // this is for delete selected Product
    const handleDeleteProduct = async (product) => {
        if (await Confirm(`آیا از حذف محصول ${product.productName} اطمینان دارید ؟`)) {
            // با استفاده از ایندکس حذف میکنیم چون ایدی ها برابر نیستند اما ایندکس ها برابر هستند .
            const index = selectedProductsInfo.findIndex(p => p.id == product.id);
            setSelectedProducts(old => old.splice(index, 1));
            setSelectedProductsInfo(old => old.filter(o => o.id !== product.id));
            Alert('عملیات با موفقیت انجام شد .',
                `محصول ${product.productName} با موفقیت حذف شد .`,
                'success');
        }
    };








    useEffect(() => {
        handleGetAllProductsTitles();
        setLoading(true);
    }, []);


    // This is for inital props <<<<=
    const dataInfo = [
        { field: 'id', title: '#' },
        { field: 'productName', title: 'نام محصول' },
        { field: 'price', title: 'قیمت' },
        {
            field: null,
            title: 'گارانتی',
            element: (rowData) => rowData.gaurantee || '-'
        },
        {
            field: null,
            title: 'رنگ',
            element: (rowData) => rowData.color || '-'
        },
        { field: 'count', title: 'مقدار' },
        {
            field: null,
            title: 'عملیات',
            element: (rowData) => <i className='fas fa-times text-danger pointer'
                onClick={() => handleDeleteProduct(rowData)}></i>
        },
    ];

    const searchParams = {
        title: 'جستجو',
        placeholder: 'قسمتی از نام محصول را وارد کنید .',
        searchField: 'productName'
    };
    // This is for inital props <<<<=
    return (
        <>
            <ModalsContainer
                id={'edit_add_cart_modal'}
                fullscreen={true}
                className='show d-block animate__animated animate__fadeInDown animate__fast'
                title={cartData ? 'ویرایش سبد خرید' : 'افزودن سبد خرید'}
                closeFunction={() => navigate(-1)}
            >
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, submitProps) => onSubmit(values, submitProps, handleGetCarts,
                        setSelectedProducts, setSelectedProductsInfo, currentProducts)}
                    validationSchema={validationSchema}
                    validateOnMount
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
                                         disabled={selectedProducts.length > 0} 
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
                                    <>
                                        <div className='col-12 alert alert-success d-flex justify-content-around
                                        align-items-center fs-6 fw-bold w-100'
                                            style={{ height: 50 }}>
                                            <span>مبلغ کل :</span>
                                            {/* reduce : همه ی اعداد یک ارایه را باهم جمع میکند */}
                                            <span className='text-center'>{numberWithCommas(selectedProductsInfo.map(p => p.count * p.price).reduce((a, b) => a + b))} تومان</span>
                                        </div>

                                        <hr className='my-4 ' />
                                        <div className={`w-100 d-flex justify-content-around `}>
                                            <button type="button" className="btn btn-danger modal-btn w-25"
                                                onClick={() => (navigate(-1))} data-bs-dismiss="modal">انصراف</button>
                                            <button type='submit'
                                                onClick={() => handleConfirmAddCart(formik)}
                                                className="btn btn-primary modal-btn w-25"
                                                disabled={formik.isSubmitting || (!formik.dirty || (!formik.isValid))}>
                                                {formik.isSubmitting ?
                                                    <SpinnerLoad colorClass={'text-white'} inline={true} isSmall />
                                                    : 'ذخیره'}
                                            </button>
                                        </div>
                                    </>
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