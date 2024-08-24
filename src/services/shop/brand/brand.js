import httpService from "../../httpService"

export const getBrandsService = ()=>{
    return httpService('/admin/brands' , 'get');
}

export const createBrandService = (data)=>{
    if (data.logo) {
        let formData = new FormData();
        formData.append('original_name',data.original_name)
        formData.append('persian_name',data.persian_name)
        formData.append('descriptions',data.descriptions)
        formData.append('logo',data.logo);

        data = formData;
    }

    return httpService('/admin/brands' , 'post' , data , null , 'multipart/form-data');
}

export const getOneBrandService = (id)=>{
    return httpService(`/admin/brands/${id}` , 'get');
}

export const editBrandsService = (id , data)=>{
    if (data.logo) {
        let formData = new FormData();
        formData.append('original_name',data.original_name)
        formData.append('persian_name',data.persian_name)
        formData.append('descriptions',data.descriptions)
        formData.append('logo',data.logo);

        data = formData;
    }

    return httpService(`/admin/brands/${id}` , 'post' , data ,
    null , 'multipart/form-data');
}

export const deleteBrandService = (id)=>{
    return httpService(`/admin/brands/${id}` , 'delete');
}