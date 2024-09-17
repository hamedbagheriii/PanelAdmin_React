import React, { useEffect, useState } from 'react';
import Chart, { Legend } from 'chart.js/auto';
import {Line } from 'react-chartjs-2'
import { getChartsDataOrder } from '../../services/orders/order/order';
import jMoment from 'moment-jalaali';
import LoadingAlert from '../../UI/All/LoadingAlert';

const HandleLoadChart = ()=>{
    const labels = ['فروردین' , 'اردیبهشت', 'خرداد' , 'تیر' , 'مرداد' , 'شهریور' ,
    'مهر' , 'آبان' , 'آذر' , 'دی' , 'بهمن' , 'اسفند'];
    const datapoints = [0, 20, 20, 60, 60, 120, 180, 120, 125, 105, 110, 170];





    const [showData , setData] = useState({});
    const [isLoading , setIsLoading] = useState(true);

    const handleGetDataCards = async ()=>{
        try {
            const res = await getChartsDataOrder()    
            if (res.status == 200) {
                const monthsOrdersArr = [];
                const now = jMoment()
                let thisMonth = now.jMonth();
                for (let i = 0; i < 12 ; i++) {
                    if (thisMonth == -1) thisMonth = 11;
                    monthsOrdersArr.push({month : thisMonth , amount : 0})
                    thisMonth --  
                }


                const orders = await res.data.data;
                for (const order of orders) {
                    const moment = jMoment(order.pay_at)
                    const monthIndex = moment.jMonth();
                    const index = monthsOrdersArr.findIndex(o=>o.month == monthIndex);
                    monthsOrdersArr[index].amount = monthsOrdersArr[index].amount + parseInt(order.pay_amount)
                }

                monthsOrdersArr.reverse();

                setData({labeles : monthsOrdersArr.map(o=>labels[o.month]) ,
                amounts : monthsOrdersArr.map(o=>o.amount/1000000)})
            }
        } 
        catch (error) {
        }
        finally{
            setTimeout(() => {
                setIsLoading(false)
            }, 0);
        }
    }


    useEffect(() => {
        setIsLoading(true)
        handleGetDataCards();  
    }, []);



   




    const data = {
        labels: showData.labeles,
        datasets: [
            {
                label: 'فروش ماه',
                data: showData.amounts,
                borderColor: "#0062ff",
                fill: true,
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
                color:'#ffff',

            }
        ]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'نمودار فروش یک سال گذشته :',
                    color:'#ffff' ,
                    font : {
                        size : 16,
                        family : 'vazir', 
                    }
                },
                legend:{
                    labels:{
                        font : {
                            size : 13,
                            family : 'vazir', 
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'زمان',
                        color:'#ffff',
                        font : {
                            size : 15,
                            family : 'vazir',
                             
                        }
                    },
                    legend:{
                        labels:{
                            font : {
                                size : 13,
                                family : 'vazir', 
                            }
                        }
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: ' میلیون تومان',
                        color:'#ffff',
                        font : {
                            size : 14,
                            family : 'vazir',
                             
                        }
                    },
                    legend:{
                        labels:{
                            font : {
                                size : 12,
                                family : 'vazir', 
                            }
                        }
                    }
                    // suggestedMin: -10,
                    // suggestedMax: 200
                }
            }
        },
    };
    Chart.defaults.borderColor = '#fff00';
    Chart.defaults.color = '#ffff';
    Chart.defaults.font = {
        family : 'vazir' ,
        size : 12,
    };

    
    return(
        <>
            {!isLoading ? (
                <Line  data={config.data} width={200} style={{maxWidth:100+'%',maxHeight:400}}  options={config.options}  />
            ) : (
                <LoadingAlert />
            )}
        </>
    )
}

export default HandleLoadChart;