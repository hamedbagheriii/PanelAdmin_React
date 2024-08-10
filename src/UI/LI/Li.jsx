import React from 'react';

const Li = ({id , icon , text}) => {
    return (
        <li className="py-1 text-start pe-4 sidebar_menu_item" data-section-id={`${id}`}>
            <i className={`ms-3 icon pe-2 ${icon}  text-light`}></i>
            <span className="hiddenable no_wrap font_08">{text}</span>
        </li>
    );
}

export default Li;
