import React, { useEffect } from 'react';
import Cards from './Cards';
import DashbordTable from './DashbordTable';
// import {handleLoadChart} from '../../assets/js/Chart.js'

const Dashboard = () => {

  

    return (
        <div id="dashboard_section" className="dashboard_section main_section">

            <Cards/>

            <DashbordTable/>

        </div>
    );
}

export default Dashboard;

