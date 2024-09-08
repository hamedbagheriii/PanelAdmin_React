import httpService from "../../httpService";

export const getAllRolesService = ()=>{
    return httpService('/admin/roles', 'get')
};

export const getOneRoleService = (roleID)=>{
    return httpService(`/admin/roles/${roleID}`, 'get')
};

export const createNewRoleService = (data)=>{
    return httpService('/admin/roles', 'post' , data)
};

export const deleteRoleService = (roleID)=>{
    return httpService(`/admin/roles/${roleID}`, 'delete')
};

export const editRoleService = (roleID,data)=>{
    return httpService(`/admin/roles/${roleID}`, 'put' , data)
};

export const editRolePermissionService = (roleID,data)=>{
    return httpService(`/admin/roles/${roleID}/permissions`, 'put' , data)
};

