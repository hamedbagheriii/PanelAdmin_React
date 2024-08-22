import httpService from "../httpService"

export const getCategoriesAtrrsService = (cateogryId)=>{
    return httpService(`/admin/categories/${cateogryId}/attributes`,'get')
}