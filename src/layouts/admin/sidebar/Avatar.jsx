import React from 'react';

const Avatar = ({userName , img}) => {
    return (
        <li className="pt-1 pb-2 d-flex flex-column avatar_li position-relative">
            <span className="avatar_box">
                <img className="w-100 rounded-circle" src={img} />
            </span>
            <div className="sidebar_avatar_name text-center hiddenable">{userName}</div>
        </li>
    );
}

export default Avatar;
