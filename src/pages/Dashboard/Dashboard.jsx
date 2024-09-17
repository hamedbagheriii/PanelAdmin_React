import React, { useEffect } from 'react';
import Cards from './Cards';
import DashbordTable from './DashbordTable';
import { useHasPermission } from '../../hook/permissionHook';

const Dashboard = () => {
    const hasCardsPermission = useHasPermission('read_order_statistics');
    const hasFerwerProductsPermission = useHasPermission('read_fewer_products');
  

    return (
        <div id="dashboard_section" className="dashboard_section main_section">
            {hasCardsPermission &&
                <Cards/>
            }

            {hasFerwerProductsPermission &&
                <DashbordTable/>
            }

        </div>
    );
}

export default Dashboard;

