import React, { useEffect } from 'react';
import Cards from './Cards';
import Table from './ProductTable';

const Dashboard = () => {

  
    useEffect(() => {
        require('../../assets/js/Chart') 
    }, []);

    return (
        <div id="dashboard_section" className="dashboard_section main_section">

            <Cards/>

            <Table/>


        </div>
    );
}

export default Dashboard;
