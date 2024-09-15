import httpService from "../../httpService";

export const getAllCartsService = (page,countOnPage,searchChar)=>{
    return httpService(`/admin/carts?page=${page}&count=${countOnPage}&searchChar=${searchChar}` , 'get');
}

export const getOneCartService = (cartID)=>{
    return httpService(`/admin/carts/${cartID}`, 'get')
};

export const createNewCartService = (data)=>{
    return httpService('/admin/carts', 'post' , data)
};

export const deleteCartService = (cartID)=>{
    return httpService(`/admin/carts/${cartID}`, 'delete')
};

export const editCartService = (cartID,data)=>{
    return httpService(`/admin/carts/${cartID}`, 'put' , data)
};

