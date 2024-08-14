import React, { useContext } from 'react';
import Shop from './Shop';
import Orders from './Orders';
import Users from './Users';
import Communication from './Communication';
import { adminContext } from '../../../context/adminLayoutContext';
import Avatar from './Avatar';
import DashbordSidebar from './Dashbord';

const IndexSidebar = () => {
    const {showSlidebar} = useContext(adminContext)

    return (
        <section id="sidebar_section">
            <div className={`mini_sidebar collapsedd bg-dark h-100 ${showSlidebar ? 'expanded' : null}`}>
                <ul className="p-0 m-0 mx-auto">

                        <Avatar userName={'قاسم بساکی'} 
                        img={'/assets/images/avatar/hamed.jpg'} />

                    {/* <!-- ================ Dashbord ================= --> */}
                    
                        <DashbordSidebar/>

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
