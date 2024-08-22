import React, { useContext } from 'react';
import { adminContext } from '../../../context/adminLayoutContext';
import Avatar from './Avatar';
import DashbordSidebar from './DashbordSidebar';
import OrdersSidebar from './OrdersSidebar';
import ShopSidebar from './ShopSidebar';
import UsersSidebar from './UsersSidebar';
import CommunicationSidebar from './CommunicationSidebar';

const IndexSidebar = () => {
    const {showSlidebar , showSlidebarSM} = useContext(adminContext)
    return (
        <section id="sidebar_section" className={` ${showSlidebarSM ? 'activeSM' : null}`}>
            <div className={`mini_sidebar pb-4  collapsedd bg-dark h-100 ${showSlidebar ?  'expanded' : null}`}>
                <ul className="p-0 m-0 mx-auto">

                        <Avatar userName={'قاسم بساکی'} 
                        img={'./assets/images/avatar/hamed.jpg'} />

                    {/* <!-- ================ Dashbord ================= --> */}
                    
                        <DashbordSidebar/>

                    {/* <!-- ================ Shop ================= --> */}
                    
                        <ShopSidebar/>

                    {/* <!-- ================ Orders ================= --> */}

                        <OrdersSidebar/>

                    {/* <!-- ================ Users ================= --> */}

                        <UsersSidebar/>

                    {/* <!-- ================ Communication ================= --> */}
                    
                        <CommunicationSidebar/>

                </ul>
            </div>
        </section>
    );
}

export default IndexSidebar;
