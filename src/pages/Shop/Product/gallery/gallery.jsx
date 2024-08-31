import React, { useEffect, useState } from 'react';
import PageContainer from '../../../../components/PageContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiPath } from '../../../../services/httpService';
import { addMainProductImageService, addProductImageService, deleteProductImageService } from '../../../../services/shop/product/product';
import LoadingAlert from '../../../../UI/All/LoadingAlert';
import { Alert } from '../../../../utils/alert';
import { Confirm } from '../../../../utils/confirm';

const Gallery = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {productData} = location.state;
    const [gallery , setGallery] = useState(null);
    const [error , setError] = useState(null);
    const [isLoading , setIsLoading] = useState(true);

    const handleGetProductGallery = async ()=>{
        setGallery(productData.gallery)
        setIsLoading(false)
    }
    console.log(productData);
    useEffect(() => {
        handleGetProductGallery();   
    }, []);

    const handleAddImage = async (e)=>{
        try {
            const image = e;

            if ((image.type == ('image/jpeg' || 'image/png' || 'image/png'))) setError('لطفا فایل با فرمت png یا jpg یا jpeg وارد کنید .')
            if ((image.size > 512000 )) setError('لطفا فایل با فرمت png یا jpg یا jpeg وارد کنید .')

            if (!error) {
                setIsLoading(true);
                const formData = new FormData();
                formData.append('image' , e);
    
                const res = await addProductImageService(productData.id,formData)  
                if (res.status == 201) {
                    Alert('عملیات با موفقیت انجام شد .' ,
                    'عکس مورد نظر ایجاد شد .' , 'success');
                    navigate('/Product');
                }     
            }
            else{
                Alert('عملیات با مشکل مواجه شد .',error,'error')
            }
        }
        catch (error) {
        }
        finally{
            setIsLoading(false);
        }
    }

    const handleDeleteImage = async (data,index)=>{
        if (await Confirm(`آیا از حذف عکس شماره ${index} اطمینان دارید ؟ `)) {
            try {
                const res = await deleteProductImageService(data.id)  
                setIsLoading(true);
                if (res.status == 200) {
                    Alert('عملیات با موفقیت انجام شد .' ,
                    'عکس مورد نظر حذف شد .' , 'success');
                    navigate('/Product');
                } 
            }
            catch (error) {
            }
            finally{
                setIsLoading(false);
            }
        }
    }

    const handleSetMainImage = async (data,index)=>{
        if (await Confirm(`آیا از تاییم عکس شماره ${index} به عنوان عکس اصلی اطمینان دارید ؟ `)) {
            try {
                const res = await addMainProductImageService(data.id)  
                setIsLoading(true);
                if (res.status == 200) {
                    Alert('عملیات با موفقیت انجام شد .' ,
                    'عکس مورد نظر به عنوان عکس اصلی تایین شد .' , 'success');
                    navigate('/Product');
                } 
            }
            catch (error) {
            }
            finally{
                setIsLoading(false);
            }
        }
    }


    return (
        <div className='w-100'>
            <PageContainer title={`گالری محصول ${productData.title}`} />
            <div className='w-100 d-flex justify-content-center flex-column'>
                <span className='w-100 text-white text-center fw-bold fs-6'>نکته : </span>
                <span className='text-primary w-auto mx-auto px-3 py-1 mt-2 bg-white fw-bold text-center' style={{borderRadius:5}}>
                {`بهتر است از تصاویر مربع (600 * 600)
                و با حداکثر حجم 500 کیلوبایت استفاده کنید .`}</span>
            </div>
            <hr  className='w-100 mx-auto bg-white pt-1 rounded-3'/>
            {   
                isLoading ? (
                    <LoadingAlert />
                ) : gallery ? (
                    <div className='w-100 h-100 row gap-1 gap-3 mx-auto'>
                        {gallery.map((i,index)=>
                            <div key={i.id+'-galley'} className='image_box  p-0 text-primary  col-12 col-md-4 mx-auto'>
                                <img src={apiPath+'/'+i.image} alt="" className='' />
                                <span className={`circle_ID rounded-circle ${i.is_main == 1 ? 'bg-primary text-white' : ' bg-white'}`}>{index+1}</span>
                                <div className='optins_box w-100 h-100'>
                                    <div className={`w-100 d-flex align-items-center justify-content-center  h-100 ${i.is_main == 1 ? 'flex-column' : 'flex-row'}`}>
                                        {i.is_main == 1 ?
                                            <>
                                                <div className='fs-5 fw-bold'>عکس اصلی محصول</div>
                                                <hr  className='w-75 mx-auto bg-dark pt-1 rounded-3'/>
                                            </>
                                        : null }
                                        <i className="fas fa-times text-danger mx-2 fs-4 hoverable_text pointer has_tooltip"
                                        title="حذف عکس" data-bs-toggle="tooltip" data-bs-placement="top"
                                        onClick={()=>handleDeleteImage(i,index+1)} />
                                        {!i.is_main == 1 ?
                                            <i className="fas fa-images text-success mx-2 fs-4 hoverable_text pointer has_tooltip"
                                            title="تایین عکس اصلی" data-bs-toggle="tooltip" data-bs-placement="top"
                                            onClick={()=>handleSetMainImage(i,index+1)}/> 
                                        : null}
                                    </div>
                                </div>
                            </div>  
                        )}
                        <div className='image_box bg-white text-primary pointer col-12 col-md-4 p-0 mx-auto'>
                                <input type="File" name="" id="input_Gallery" className='bg-danger w-100 h-100'
                                onChange={(e)=>handleAddImage(e.target.files[0])} />
                                <i className='fa fa-plus p-3 border-dark border border-2 add_image rounded-circle'></i>
                        </div>            
                    </div>
                ) : null 
            }
            <div className='d-flex alignitems-center justify-content-center
            prevPageBTN'>
                <button className="btn btn-danger" onClick={()=>navigate(-1)}>
                    بازگشت
                </button>
            </div>
        </div>
    );
}

export default Gallery;
