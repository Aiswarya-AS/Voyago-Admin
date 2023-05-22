import React from 'react'
import Chart from 'react-apexcharts';

const SalesChart = ({completed,started,cancelled,dates}) => {
  console.log(completed,'completed');
  console.log(dates,'dates');
  console.log(cancelled,'cancelled');
  console.log(started,'started');
  const chartOptions = {
    chart: {
      id: 'line-chart',
    },
    xaxis: {
      categories: dates.map((d)=>d.is_created__date)
    },
  };

  const chartSeries = [
    {
      name: 'Trips Completed',
      data: completed.map((c)=>c.completed)
    },
    {
      name: 'Started Trips',
      data: started.map((s)=>s.started)
    },
    {
      name: 'Cancelled Trips',
      data: cancelled.map((c)=>c.cancelled)
    },
  ];
  return (
    <div>
      <Chart
      options={chartOptions}
      series={chartSeries}
      type="line"
      height={400}
    />
    </div>
  )
}

export default SalesChart
