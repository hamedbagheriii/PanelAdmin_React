import React, { useContext } from 'react';
import { adminContext } from '../../../context/adminLayoutContext';
import Avatar from './Avatar';
import DashbordSidebar from './DashbordSidebar';
import OrdersSidebar from './OrdersSidebar';
import ShopSidebar from './ShopSidebar';
import UsersSidebar from './UsersSidebar';
import CommunicationSidebar from './CommunicationSidebar';
import avatarIMG from '../../../assets/img/hamedb.jpg'
import { useSelector } from 'react-redux';
import PermComponent from '../../../components/permComponent';
import { useHasPermission } from '../../../hook/permissionHook';

const IndexSidebar = () => {
    const {showSlidebar , showSlidebarSM} = useContext(adminContext);
    const {user  , error} = useSelector((state)=>state.userReducer)

    const hasShopPerm = useHasPermission([
        'read_categories',
        'read_products',
        'read_brands',
        'read_guarantees',
        'read_colors',
        'read_discounts'
    ])
    const hasOrderPerm = useHasPermission([
        'read_carts',
        'read_orders',
        'read_deliveries'
    ])
    const hasUserPerm = useHasPermission([
        'read_users',
        'read_roles',
        'read_permissions'
    ])

    return (
        <section id="sidebar_section" className={` ${showSlidebarSM ? 'activeSM' : null}`}>
            <div className={`mini_sidebar pb-4  collapsedd bg-dark h-100 ${showSlidebar ?  'expanded' : null}`}>
                <ul className="p-0 m-0 mx-auto">

                        <Avatar userName={`${user.first_name || ''} ${user.last_name || user.user_name
                        || user.phone}`} 
                        img={user.image || avatarIMG} />

                    {/* <!-- ================ Dashbord ================= --> */}
                    
                        <DashbordSidebar/>

                    {/* <!-- ================ Shop ================= --> */}
                    
                        {hasShopPerm && (
                            <ShopSidebar/>
                        )}

                    {/* <!-- ================ Orders ================= --> */}

                        {hasOrderPerm && (
                            <OrdersSidebar/>
                        )}
                        
                    {/* <!-- ================ Users ================= --> */}

                        {hasUserPerm && (
                            <UsersSidebar/>
                        )}

                    {/* <!-- ================ Communication ================= --> */}
                    
                        <CommunicationSidebar/>

                </ul>
            </div>
        </section>
    );
}

export default IndexSidebar;
