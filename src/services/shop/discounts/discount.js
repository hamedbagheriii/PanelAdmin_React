import httpService from "../../httpService"

export const getAllDiscountService = ()=>{
    return httpService('/admin/discounts' , 'get')
}

export const DeleteDiscountService = (discountID)=>{
    return httpService(`/admin/discounts/${discountID}` , 'delete')
}

export const createDiscountService = (data)=>{
    return httpService('/admin/discounts' , 'post', data)
}