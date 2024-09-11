import React from 'react';
import { useHasPermission } from '../../hook/permissionHook';

const ActionIcon = ({icon , title , ptitle , action , toggle='tooltip' , target}) => {
    const hasPermission = useHasPermission(ptitle)

    return hasPermission && (
        <i className={`${icon} mx-1 hoverable_text pointer has_tooltip`}
        title={title}
        data-bs-placement="top"
        data-bs-toggle={toggle}
        data-bs-target={`#${target}`}
        onClick={action}>
        </i>
    );
}

export default ActionIcon;
