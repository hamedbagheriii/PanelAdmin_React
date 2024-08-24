import httpService from "../../httpService"

export const getGuarantiesService = ()=>{
    return httpService('/admin/guarantees' , 'get');
}

export const addGuaranteeService = (data)=>{
    return httpService('/admin/guarantees' , 'post' , data);
}

export const editGuaranteeService = (id , data)=>{
    return httpService(`/admin/guarantees/${id}` , 'put' , data);
}

export const deleteGuaranteeService = (id)=>{
    return httpService(`/admin/guarantees/${id}` , 'delete');
}