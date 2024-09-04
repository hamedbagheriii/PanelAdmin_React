import httpService from "../../httpService";

export const getAllRolesService = ()=>{
    return httpService('/admin/roles', 'get')
};

export const createNewRoleService = (data)=>{
    return httpService('/admin/roles', 'post' , data)
};

export const deleteRoleService = (roleID)=>{
    return httpService(`/admin/roles/${roleID}`, 'delete')
};