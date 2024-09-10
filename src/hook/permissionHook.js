import { useSelector } from "react-redux";


// برای برسی مجوز ورود به صفحه 
export const useHasPermission = (permissionTitle)=>{
    const {user} = useSelector((state)=>state.userReducer)
    const roles = user.roles;

    let permissions = [];
    for (const role of roles) {
        permissions = [...permissions , ...role.permissions]
    }  

    if (roles[0].title == 'admin') {
        return true;
    } 
    else {
        return permissions.findIndex(p=>p.title.includes(permissionTitle)) !== -1
    }

}