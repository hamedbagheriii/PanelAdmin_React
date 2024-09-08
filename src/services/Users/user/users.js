import httpService from "../../httpService";

export const getAllUsersService = (page,countOnPage,searchChar)=>{
    return httpService(`/admin/users?page=${page}&count=${countOnPage}&searchChar=${searchChar}` , 'get');
}

export const getOneUserService = (userID)=>{
    return httpService(`/admin/users/${userID}`, 'get')
};

export const createNewUserService = (data)=>{
    return httpService('/admin/users', 'post' , data)
};

export const deleteUserService = (userID)=>{
    return httpService(`/admin/users/${userID}`, 'delete')
};

export const editUserService = (userID,data)=>{
    return httpService(`/admin/users/${userID}`, 'put' , data)
};

