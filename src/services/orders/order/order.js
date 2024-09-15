import httpService from "../../httpService";

export const getAllOrdersService = (page,countOnPage,searchChar)=>{
    return httpService(`/admin/orders?page=${page}&count=${countOnPage}&searchChar=${searchChar}` , 'get');
}

export const getOneOrderService = (orderID)=>{
    return httpService(`/admin/orders/${orderID}`, 'get')
};

export const createNewOrderService = (data)=>{
    return httpService('/admin/orders', 'post' , data)
};

export const deleteOrderService = (orderID)=>{
    return httpService(`/admin/orders/${orderID}`, 'delete')
};

export const editOrderService = (orderID,data)=>{
    return httpService(`/admin/orders/${orderID}`, 'put' , data)
};

