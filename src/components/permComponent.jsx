import React from 'react';
import { useHasPermission } from '../hook/permissionHook';
import { Navigate } from 'react-router-dom';

// برای برسی انکه اگر مجوز وجود داشت کامپوننت را برگرداند در غیر این صورت برگردد صفحه قبل
// و دلیل اینکه به صورت یک کامپوننت دیگر این را اراِعه میدهیم اینع که در متود ROUTES نمیشود
// یک کامپوننت بجز (ROUTE) قرار داد
const PermComponent = ({component , permTitle}) => {
    const hasPermission = useHasPermission(permTitle);

    return (hasPermission ? component : <Navigate to={'/'} />)
}

export default PermComponent;
