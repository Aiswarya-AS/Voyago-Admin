import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts';
const UserGuideChart = (props) => {
    const [chartData, setChartData] = useState({
        options: {
          chart: {
            id: 'basic-bar'
          },
          xaxis: {
            categories: ['Guides', 'Users']
          }
        },
        series: [
          {
            name: 'Total',
            data: [0, 0]
          }
        ]
      });
 useEffect(()=>{
    setChartData({
        options: {
          chart: {
            id: 'basic-bar'
          },
          xaxis: {
            categories: ['Guides', 'Users']
          }
        },
        series: [
          {
            name: 'Total',
            data: [props.guide_count, props.user_count]
          }
        ]
      });
      
 },[props.user_count,props.guide_count])
  return (
    <div>
      <Chart options={chartData.options} series={chartData.series} type="bar" height={370}  width={330}/>
    </div>
  )
}

export default UserGuideChart
