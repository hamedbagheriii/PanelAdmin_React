import httpService from "../../httpService"

export const getCategoriesAtrrsService = (cateogryId)=>{
    return httpService(`/admin/categories/${cateogryId}/attributes`,'get')
}

export const addCategoryAtrrsService = (cateogryId , data)=>{
    return httpService(`/admin/categories/${cateogryId}/attributes`,'post' , data)
}

export const getOneCategoryAtrrService = (cateogryId)=>{
    return httpService(`/admin/categories/attributes/${cateogryId}`,'get')
}

export const editCategoryAtrrService = (cateogryId , data)=>{
    return httpService(`/admin/categories/attributes/${cateogryId}`,'put', data)
}

export const deleteCategoryAtrrService = (attrID)=>{
    return httpService(`/admin/categories/attributes/${attrID}`,'delete')
}