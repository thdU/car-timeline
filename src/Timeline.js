import React from 'react';
import Chart from "react-apexcharts";

const Timeline = () => {

  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        dataLabels: {
          hideOverflowingLabels: false
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return 'test days';
      },
      style: {
        colors: ['#f3f4f5', '#fff']
      }
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      show: true
    },
    grid: {
      row: {
        colors: ['#f3f4f5', '#fff'],
        opacity: 1
      }
    }
  };

  const series = [
    {
      data: [
        {
          x: 'Analysis',
          y: [
            new Date('2019-02-27').getTime(),
            new Date('2019-03-04').getTime()
          ],
          fillColor: '#008FFB'
        },
        {
          x: 'Design',
          y: [
            new Date('2019-03-04').getTime(),
            new Date('2019-03-08').getTime()
          ],
          fillColor: '#00E396'
        },
        {
          x: 'Coding',
          y: [
            new Date('2019-03-07').getTime(),
            new Date('2019-03-10').getTime()
          ],
          fillColor: '#775DD0'
        },
        {
          x: 'Testing',
          y: [
            new Date('2019-03-08').getTime(),
            new Date('2019-03-12').getTime()
          ],
          fillColor: '#FEB019'
        },
        {
          x: 'Deployment',
          y: [
            new Date('2019-03-12').getTime(),
            new Date('2019-03-17').getTime()
          ],
          fillColor: '#FF4560'
        }
      ]
    }
  ];


  return (
    <div id="chart">
      <Chart
        options={options}
        series={series}
        type="rangeBar"
        width={800}
      />
    </div>
  )

}

export default Timeline;