import React from 'react';
import Chart, { Legend } from 'chart.js/auto';
import {Line } from 'react-chartjs-2'


const HandleLoadChart = ()=>{
    const labels = ['فروردین' , 'اردیبهشت', 'خرداد' , 'تیر' , 'مرداد' , 'شهریور' ,
    'مهر' , 'آبان' , 'آذر' , 'دی' , 'بهمن' , 'اسفند'];
    const datapoints = [0, 20, 20, 60, 60, 120, 180, 120, 125, 105, 110, 170];
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'فروش ماه',
                data: datapoints,
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
        <Line  data={config.data} width={200} style={{maxWidth:100+'%',maxHeight:400}}  options={config.options}  />
    )
}

export default HandleLoadChart;