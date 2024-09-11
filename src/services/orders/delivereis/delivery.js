import httpService from "../../httpService";

export const getAllDeliveriesService = ()=>{
    return httpService('/admin/deliveries', 'get')
};

export const createNewDeliveryService = (data)=>{
    return httpService('/admin/deliveries', 'post' , data)
};

export const deleteDeliveryService = (deliID)=>{
    return httpService(`/admin/deliveries/${deliID}`, 'delete')
};

export const editDeliveyService = (deliID,data)=>{
    return httpService(`/admin/deliveries/${deliID}`, 'put' , data)
};

