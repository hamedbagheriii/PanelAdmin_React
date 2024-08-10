import React, { useContext } from 'react';
import Shop from './Shop';
import Orders from './Orders';
import Users from './Users';
import Communication from './Communication';
import Dashbord from './dashbord';
import { adminContext } from '../../../context/adminLayoutContext';

const IndexSidebar = () => {
    const {showSlidebar} = useContext(adminContext)

    return (
        <section id="sidebar_section">
            <div className={`mini_sidebar collapsedd bg-dark h-100 ${showSlidebar ? 'expanded' : null}`}>
                <ul className="p-0 m-0 mx-auto">
                    <li className="pt-1 pb-2 d-flex flex-column avatar_li position-relative">
                        <span className="avatar_box">
                            <img className="w-100 rounded-circle" src="/assets/images/avatar/hamed.jpg" />
                        </span>
                        <div className="sidebar_avatar_name text-center hiddenable">قاسم بساکی</div>
                    </li>
                    
                        <Dashbord/>

                    {/* <!-- ================ Shop ================= --> */}
                    
                        <Shop/>

                    {/* <!-- ================ Orders ================= --> */}

                        <Orders/>

                    {/* <!-- ================ Users ================= --> */}

                        <Users/>

                    {/* <!-- ================ Communication ================= --> */}
                    
                        <Communication/>

                </ul>
            </div>
        </section>
    );
}

export default IndexSidebar;
