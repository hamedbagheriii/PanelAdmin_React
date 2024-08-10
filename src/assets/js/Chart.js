import Chart from 'chart.js/auto';



// export const handleLoadChart = ()=>{
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
                color:'#ffff'

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
                    text: 'نمودار فروش یک سال گذشته',
                    color:'#ffff'
                },
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
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: ' میلیون تومان',
                        color:'#ffff'
                    },
                    // suggestedMin: -10,
                    // suggestedMax: 200
                }
            }
        },
    };

    const ctx = document.getElementById('myCharts').getContext('2d');
    new Chart(ctx , config)
// }
// handleLoadChart()