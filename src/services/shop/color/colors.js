import httpService from "../../httpService"

export const getColorsService = ()=>{
    return httpService('/admin/colors' , 'get');
}

export const createColorService = (data)=>{
    return httpService('/admin/colors' , 'post' , data);
}


export const editColorsService = (id , data)=>{
    return httpService(`/admin/colors/${id}` , 'put' , data);
}

export const deleteColorService = (id)=>{
    return httpService(`/admin/colors/${id}` , 'delete');
}