import { useSelector } from "react-redux";


// برای برسی مجوز ورود به صفحه 
export const useHasPermission = (permissionTitle)=>{
    const {user} = useSelector((state)=>state.userReducer)
    const roles = user.roles;

    let permissions = [];
    for (const role of roles) {
        permissions = [...permissions , ...role.permissions]
    }  

    if (roles.findIndex(r=>r.title == 'admin') !== -1) {
        return true;
    } 
    else if (typeof(permissionTitle) === 'object') {
        for (const ptitle of permissionTitle) {
            if (permissions.findIndex(p=>p.title.includes(ptitle)) !== -1 ) return true
        }
        return false;
    }
    else{
        return permissions.findIndex(p=>p.title.includes(permissionTitle)) !== -1 ;
    }
}