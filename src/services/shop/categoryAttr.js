import httpService from "../httpService"

export const getCategoriesAtrrsService = (cateogryId)=>{
    return httpService(`/admin/categories/${cateogryId}/attributes`,'get')
}

export const addCategoryAtrrsService = (cateogryId , data)=>{
    return httpService(`/admin/categories/${cateogryId}/attributes`,'post' , data)
}