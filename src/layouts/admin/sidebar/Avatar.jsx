import React from 'react';

const Avatar = ({userName , img}) => {
    return (
        <li className="pt-1 pb-2 d-flex flex-column">
            <span className="avatar_box mt-2 mb-3">
                <img className="w-100 rounded-circle" src={img} />
            </span>
            <div className=" mb-1 text-center hiddenable">{userName}</div>
        </li>
    );
}

export default Avatar;
