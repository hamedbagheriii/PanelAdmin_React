import { convertDataToFormData } from "../../../utils/convertDataToFormData";
import httpService from "../../httpService"

export const getProductsService = (page,countOnPage,searchChar)=>{
    return httpService(`/admin/products?page=${page}&count=${countOnPage}&searchChar=${searchChar}` , 'get');
}


export const createNewProductService = (data)=>{
    return httpService(`/admin/products` , 'post' , data.image ? convertDataToFormData(data) : data , null , 
    'multipart/form-data' );
}

export const editProductService = (id,data)=>{
    return httpService(`/admin/products/${id}` , 'put' , data );
}

export const deleteProductService = (productID)=>{
    return httpService(`/admin/products/${productID}` , 'delete');
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