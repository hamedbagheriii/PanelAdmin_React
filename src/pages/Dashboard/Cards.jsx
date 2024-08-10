import React from 'react';
import DashboardCard from '../../UI/Dashbord/Card';

const Cards = () => {
    return (
        <div className="row">
            
            <DashboardCard
             title={'سبد خرید امروز'} 
             countTitle={7}
             caption={'سبد های خرید مانده امروز'}
             icon={'fas fa-shopping-basket'} 
             countMonth={13}
             countWeek={18}
            />
            
            <DashboardCard
             title={'سفارشات مانده امروز'} 
             countTitle={5}
             caption={'سفارشات معلق و فاقد پرداختی '}
             icon={'fas fa-dolly'} 
             countMonth={9}
             countWeek={16}
            />

            <DashboardCard
             title={'سفارشات امروز'} 
             countTitle={45}
             caption={'سفارشات کامل و دارای پرداختی'}
             icon={'fas fa-luggage-cart'} 
             countMonth={263}
             countWeek={1038}
            />
            <DashboardCard
             title={'درآمد امروز'} 
             countTitle={`1,500,000`}
             caption={'جمع مبالغ پرداختی (تومان)'}
             icon={'fas fa-money-check-alt'} 
             countMonth={`6,380,000`}
             countWeek={`22,480,000`}
            />

        </div>
    );
}

export default Cards;
