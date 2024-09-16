import React, { useEffect, useState } from 'react';
import DashboardCard from '../../UI/Dashbord/Card';
import { getCardsDataOrder } from '../../services/orders/order/order';
import { numberWithCommas } from '../../utils/numberWithCommas';

const Cards = () => {
    const [data , setData] = useState([]);
    const [isLoading , setIsLoading] = useState(true);

    const handleGetDataCards = async ()=>{
        try {
            const res = await getCardsDataOrder()    
            if (res.status == 200) {
                setData(res.data.data);
            }
        } 
        catch (error) {
        }
        finally{
            setTimeout(() => {
                setIsLoading(false)
            }, 500);
        }
    }




    useEffect(() => {
        setIsLoading(true)
        handleGetDataCards();  
    }, []);

    return (
        <div className="row">
            
            {!isLoading ? (
                <>
                     <DashboardCard
                     title={'سبد خرید امروز'} 
                     countTitle={data.carts?.today || 0}
                     caption={'سبد های خرید مانده امروز'}
                     icon={'fas fa-shopping-basket'} 
                     countMonth={data.carts?.thisMonth || 0}
                     countWeek={data.carts?.thisWeek || 0}
                    />

                    <DashboardCard
                     title={'سفارشات مانده امروز'} 
                     countTitle={data.pendingOrders?.today || 0}
                     caption={'سفارشات معلق و فاقد پرداختی '}
                     icon={'fas fa-dolly'} 
                     countMonth={data.pendingOrders?.thisMonth || 0}
                     countWeek={data.pendingOrders?.thisWeek || 0}
                    />

                    <DashboardCard
                     title={'سفارشات امروز'} 
                     countTitle={data.successOrders?.today || 0}
                     caption={'سفارشات کامل و دارای پرداختی'}
                     icon={'fas fa-luggage-cart'} 
                     countMonth={data.successOrders?.thisMonth || 0}
                     countWeek={data.successOrders?.thisWeek || 0}
                    />
                    <DashboardCard
                     title={'درآمد امروز'} 
                     countTitle={numberWithCommas(data.successOrdersAmount?.today || 0)}
                     caption={'جمع مبالغ پرداختی (تومان)'}
                     icon={'fas fa-money-check-alt'} 
                     countMonth={numberWithCommas(data.successOrdersAmount?.thisMonth || 0)}
                     countWeek={numberWithCommas(data.successOrdersAmount?.thisWeek || 0)}
                    />
                </>
            ) : (
               null
            )}

        </div>
    );
}

export default Cards;
