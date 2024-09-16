import { convertDataToFormData } from "../../../utils/convertDataToFormData";
import httpService from "../../httpService"

export const getProductsService = (page,countOnPage,searchChar)=>{
    return httpService(`/admin/products?page=${page}&count=${countOnPage}&searchChar=${searchChar}` , 'get');
}


export const createNewProductService = (data)=>{
    return httpService(`/admin/products` , 'post' , data.image ? convertDataToFormData(data) : data , null , 
    'multipart/form-data' );
}

export const getOneProductService = (id)=>{
    return httpService(`/admin/products/${id}` , 'get');
}

export const editProductService = (id,data)=>{
    return httpService(`/admin/products/${id}` , 'put' , data );
}

export const deleteProductService = (productID)=>{
    return httpService(`/admin/products/${productID}` , 'delete');
}

export const getAllProductsTitlesService = ()=>{
    return httpService(`/admin/products/all_titles` , 'get');
}

// ---======== product attr ========---

export const createProductAttrService = (productId,data)=>{
    return httpService(`/admin/products/${productId}/add_attr` , 'post' , data);
}

// ---======== product image ========---
export const getProductImageService = (productId)=>{
    return httpService(`/admin/products/${productId}/add_image` , 'get');
}

export const addProductImageService = (productId,data)=>{
    return httpService(`/admin/products/${productId}/add_image` , 'post' , data , null , 
    'multipart/form-data' );
}

export const deleteProductImageService = (imageID)=>{
    return httpService(`/admin/products/gallery/${imageID}` , 'delete');
}

export const addMainProductImageService = (imageID)=>{
    return httpService(`/admin/products/gallery/set_main/${imageID}` , 'get');
}

// ---======== product fewer ========---
export const getFerwerProductsService = ()=>{
    return httpService(`/admin/products/fewer_products` , 'get');
}

export const toggleNotifcationService = (id)=>{
    return httpService(`/admin/products/toggle_notification/${id}` , 'get');
}